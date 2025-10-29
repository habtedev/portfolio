
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const Message = require("../models/Message");

// Basic validation
const validatePayload = (body = {}) => {
  const { email, subject, message } = body;
  return !!(email && subject && message);
};

//created email transporter
const createTransporter = async () => {
  const {
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_SERVICE,
    EMAIL_HOST,
    EMAIL_PORT,
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    GMAIL_REFRESH_TOKEN,
  } = process.env;

  // primary gmail
  if (GMAIL_CLIENT_ID && GMAIL_CLIENT_SECRET && GMAIL_REFRESH_TOKEN && EMAIL_USER) {
    try {
      const oAuth2Client = new google.auth.OAuth2(GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET);
      oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });
      const accessTokenObj = await oAuth2Client.getAccessToken();
      const accessToken = accessTokenObj?.token;

      if (!accessToken) {
        console.warn(" OAuth2: Access token not received. Falling back to SMTP.");
      } else {
        console.log(" Using Gmail OAuth2 authentication.");
        return nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: EMAIL_USER,
            clientId: GMAIL_CLIENT_ID,
            clientSecret: GMAIL_CLIENT_SECRET,
            refreshToken: GMAIL_REFRESH_TOKEN,
            accessToken,
          },
        });
      }
    } catch (err) {
      console.error("❌ Failed to initialize Gmail OAuth2 transporter:", err.message);
    }
  }

 // falback app password
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn("⚠️ Email credentials missing — email notifications disabled.");
    return null;
  }

     // standard STM transport
  const transportOptions = EMAIL_SERVICE
    ? { service: EMAIL_SERVICE, auth: { user: EMAIL_USER, pass: EMAIL_PASS } }
    : {
        host: EMAIL_HOST,
        port: EMAIL_PORT ? Number(EMAIL_PORT) : 587,
        secure: Number(EMAIL_PORT) === 465, // true for 465, false otherwise
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      };

  console.log("📨 Using SMTP transporter for emails.");
  return nodemailer.createTransport(transportOptions);
};

/**
 *  Controller: Handle Contact Form Submission
 */
exports.submitContact = async (req, res) => {
  try {
    // 1️ Validate request
    if (!validatePayload(req.body)) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const { firstName, lastName, email, subject, message } = req.body;

    // 2️ Save message in MongoDB
    const newMessage = new Message({ firstName, lastName, email, subject, message });
    await newMessage.save();
    console.info(`📩 Message stored from ${email} (${subject})`);

    // 3️ Send notification email
    try {
      const transporter = await createTransporter();
      if (!transporter) {
        console.warn(" No transporter available — skipping email notification.");
        return res.json({ ok: true, message: "Message saved without email notification." });
      }

      const owner = process.env.EMAIL_TO || process.env.EMAIL_USER;
      const mailOptions = {
        from: `"${firstName || "Visitor"} ${lastName || ""}" <${process.env.EMAIL_USER}>`,
        to: owner,
        replyTo: email,
        subject: `[Portfolio Contact] ${subject}`,
        text: `${message}\n\nFrom: ${firstName || ""} ${lastName || ""} <${email}>`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h3>📨 New message received</h3>
            <p>${message.replace(/\n/g, "<br/>")}</p>
            <hr/>
            <p><strong>From:</strong> ${firstName || ""} ${lastName || ""} &lt;${email}&gt;</p>
            <p><small>Sent from Habtamu.dev contact form</small></p>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.info(`✅ Email sent successfully (ID: ${info.messageId || "unknown"})`);
    } catch (mailErr) {
      console.error("❌ Email notification failed:", mailErr.message);
      // Continue; message already saved in DB
    }

    // 4️Respond success
    return res.status(200).json({
      ok: true,
      message: "Message submitted successfully. Thank you for reaching out!",
    });
  } catch (err) {
    console.error("Contact form error:", err.message);
    return res.status(500).json({ error: "Internal server error. Please try again later." });
  }
};
