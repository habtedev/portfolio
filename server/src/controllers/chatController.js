// Lightweight keyword-based chat controller.
// Uses simple pattern matching; swap in a real AI service later if needed.

const defaultResponses = {
  greeting:
    "👋 Hello there! I'm Habtamu’s AI Consultant. I can help you with projects, design, pricing, or anything tech-related. What would you like to discuss today?",
  pricing:
    "💰 Pricing depends on the project’s complexity. A simple portfolio starts around **$500–$2K**, while web apps or marketplaces vary. I can prepare an estimate once you share details.",
  project:
    "🚀 I help plan, design, and build projects using **React, Next.js, Node.js, and MongoDB**. I also focus on scalability, performance, and modern UI design.",
  contact:
    "📩 You can contact Habtamu via **the site’s contact form** or email at **habtadev@gmail.com**. I’ll respond within 24 hours.",
  timeline:
    "⏰ Timelines vary: small projects (1 week), medium (2–4 weeks), large/enterprise apps (6–8+ weeks). I’ll create a detailed roadmap after our first discussion.",
  stack:
    "💻 My favorite tech stack includes **Next.js, Tailwind CSS, TypeScript, Node.js**, and **MongoDB**. I also use **Framer Motion** for smooth animations.",
  ecommerce:
    "🛒 Absolutely! I can build **e-commerce stores** with secure payment gateways (PayPal/Stripe), dashboards, and fast product browsing.",
  portfolio:
    "🎨 I’ve designed modern portfolio websites focusing on smooth user experience, animations, and responsive layouts — perfect for professionals and freelancers.",
  ai:
    "🤖 I also integrate lightweight AI systems for chat or recommendations using open-source APIs — perfect for small businesses on a budget!",
  learning:
    "📘 I believe in continuous learning! Currently exploring advanced **React patterns**, **Next.js app router**, and **AI integrations**.",
  freelance:
    "💼 Freelancing gives me flexibility and creativity. I focus on delivering quality code and reliable communication.",
  default:
    "✨ I’m here to help! Ask me about **pricing, timelines, tech stack, e-commerce, or how to start your project**. You can also ask about Habtamu’s journey or freelancing work."
};

// Utility: match keywords to canned responses
const findResponse = (text) => {
  if (!text) return defaultResponses.default;
  const lower = text.toLowerCase();

  // Order of checks matters
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey"))
    return defaultResponses.greeting;
  if (lower.includes("price") || lower.includes("cost") || lower.includes("estimate"))
    return defaultResponses.pricing;
  if (lower.includes("timeline") || lower.includes("time") || lower.includes("duration") || lower.includes("deadline"))
    return defaultResponses.timeline;
  if (lower.includes("stack") || lower.includes("tech") || lower.includes("technology") || lower.includes("framework"))
    return defaultResponses.stack;
  if (lower.includes("ecom") || lower.includes("shop") || lower.includes("store"))
    return defaultResponses.ecommerce;
  if (lower.includes("project") || lower.includes("build") || lower.includes("develop") || lower.includes("app"))
    return defaultResponses.project;
  if (lower.includes("contact") || lower.includes("reach") || lower.includes("email"))
    return defaultResponses.contact;
  if (lower.includes("portfolio") || lower.includes("design") || lower.includes("website"))
    return defaultResponses.portfolio;
  if (lower.includes("ai") || lower.includes("artificial") || lower.includes("chatbot"))
    return defaultResponses.ai;
  if (lower.includes("learn") || lower.includes("study") || lower.includes("course"))
    return defaultResponses.learning;
  if (lower.includes("freelance") || lower.includes("upwork") || lower.includes("remote"))
    return defaultResponses.freelance;

  return defaultResponses.default;
};

// Chat handler: validate input, compute reply, return JSON
exports.chat = async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing `message` in request body" });
    }

    const reply = findResponse(message);

    // Simulate typing / thinking delay
    await new Promise((r) => setTimeout(r, 400));

    return res.json({ reply });
  } catch (err) {
    console.error("chatController.chat error", err);
    return res.status(500).json({ error: "Failed to generate reply" });
  }
};

module.exports = exports;
