# Backend Maintainability Guide

This document explains the main connection points of the backend and practical best practices for maintenance, onboarding, and production readiness.

## Overview

This backend provides two primary features used by the frontend:

- Contact form endpoint: saves messages (optionally) and sends notification emails.
- Mini-AI chat endpoint: a keyword-based fallback chat API.

Key technologies:

- Node.js + Express
- Mongoose (MongoDB) — optional (can be bypassed with `SKIP_DB=true`)
- Nodemailer + Gmail OAuth2 (or SMTP) for sending email
- Helmet and rate-limiter for basic hardening

## Environment variables

Keep secrets out of the repo. Add them to your hosting provider or `.env` (never commit real secrets).

Recommended `.env` variables (see `./.env.example`):

- PORT=8500
- NODE_ENV=development|production
- MONGODB_URI=mongodb+srv://user:pass@cluster/dbname
- SKIP_DB=true # dev convenience to run without DB

Email / mailer

- EMAIL_FROM=sender@example.com
- EMAIL_TO=owner@example.com # optional; falls back to sender
- SMTP_HOST=smtp.example.com
- SMTP_PORT=587
- SMTP_USER=smtp-user
- SMTP_PASS=smtp-pass
- GMAIL_CLIENT_ID=... (optional, for Gmail OAuth2)
- GMAIL_CLIENT_SECRET=...
- GMAIL_REFRESH_TOKEN=...

Security & CORS

- CLIENT_ORIGIN=https://example.com # allowed origin for CORS

Other

- RATE_LIMIT_WINDOW_MS=60000
- RATE_LIMIT_MAX=5

## Main connection points and best practices

### 1) Database (Mongoose)

What it does:

- Connects to MongoDB using `MONGODB_URI` and registers models (e.g., `Message`).

Best practices:

- Keep connection code in one module (e.g., `src/db.js`) and export the `connect()` function.
- Use `useNewUrlParser`, `useUnifiedTopology` and proper timeouts when connecting.
- Fail fast in production: if DB connection fails, exit process after logging the error.
- For development use `SKIP_DB=true` to run backend without DB when appropriate.
- Add retry/backoff logic for transient connection errors (or rely on your platform's managed DB with built-in retries).
- Close DB connection gracefully on SIGINT/SIGTERM during shutdown.

Suggested improvements:

- Centralize DB connect options and add a small retry loop (3 attempts with exponential backoff).
- Add DB connection metrics (connection time, errors) to your app logs or APM.

### 2) Email transporter (Nodemailer)

What it does:

- Sends email notifications for contact form submissions.
- Supports Gmail OAuth2 (preferred) and SMTP fallback.

Best practices:

- Store credentials in environment variables and never commit them.
- Prefer OAuth2 for Gmail to avoid storing app passwords; if using SMTP, use app-specific password when possible.
- Reuse transporter instance across requests (create it at startup) to avoid repeated auth overhead.
- Handle send failures: log and surface meaningful errors to the caller, but do not expose secrets.
- Add rate-limiting around the contact endpoint to prevent abuse (already included).

Suggested improvements:

- Add monitoring/alerting for mail-sending errors (so you know when email fails).
- Add retries for failed sends with exponential backoff for transient errors.

### 3) Routes & Controllers

What it does:

- Routes map to controller methods which implement business logic (contact, chat, etc.).

Best practices:

- Keep controller methods small and synchronous where possible. Handler should extract inputs, validate them, call service functions, and return results.
- Validate inputs early using a schema library (Joi/Zod) to avoid runtime errors.
- Keep controllers free of side-effects: delegate DB and mail logic to services.
- Export controller functions (not classes) or bind `this` correctly if using classes.

Suggested improvements:

- Add request validation middleware with explicit error messages.
- Move mail composition and DB saving into a `services/mailService.js` and `services/messageService.js` to improve testability.

### 4) Mini-AI chat controller

What it does:

- Simple keyword-based reply engine for offline/cheap responses.

Best practices:

- Keep the keyword engine small and deterministic.
- If you later wire up a real AI API, create a façade service that switches between the local engine and remote provider based on config.
- Throttle this endpoint to prevent abusive automated requests.

Suggested improvements:

- Create a `services/aiService.js` that exposes `generateReply(message)` and hides local vs remote provider logic.

### 5) Security, rate-limiting, and headers

- Helmet is included — keep it configured with strict CSP only if you fully understand inline scripts/styles.
- Rate-limiter around contact endpoints is important; monitor and tune limits as needed.
- Enable CORS only for trusted origins (`CLIENT_ORIGIN`) in production.

### 6) Logging, metrics & monitoring

- Use a structured logger (pino/winston) with different log levels.
- Emit events for critical errors (email failures, DB down) and integrate with an alerting system.
- Add a simple health check endpoint (`/healthz`) that returns OK when app is up and, optionally, DB connected.

Health check example (Express):

```js
app.get("/healthz", (req, res) => {
  const healthy = { uptime: process.uptime() };
  // optionally include DB status
  res.status(200).json(healthy);
});
```

### 7) Graceful shutdown

- Handle SIGINT and SIGTERM to close server and DB connections.

Example:

```js
process.on("SIGTERM", async () => {
  console.log("SIGTERM received: closing HTTP server");
  server.close(() => process.exit(0));
  await mongoose.connection.close(false);
});
```

### 8) Tests

- Add unit tests for controllers and services (mock DB and mail transports).
- Add a small e2e test that posts to `/api/contact` against a test server with `SKIP_DB=true` and a mocked transporter.

### 9) Deployment notes

- In production, set `NODE_ENV=production` and provide real `MONGODB_URI` and email creds.
- Consider running the server in a process manager (systemd, pm2) or a container (Docker). If in Docker, ensure health checks and graceful shutdown are configured.

## Quick checklist (pre-deploy)

- [ ] Remove any hardcoded secrets from code
- [ ] Ensure `EMAIL_TO` and mail credentials are set in environment
- [ ] Set `SKIP_DB=false` in production and verify DB connectivity
- [ ] Add monitoring/alerts for mail and DB errors
- [ ] Add health-check route and configure platform health checks

## Where to go next

If you'd like, I can:

- Add `server/.env.example` (I will add it now),
- Add a `/healthz` route and graceful shutdown logic,
- Refactor mail & DB into `services/` modules and add JSDoc comments for all controller functions.

Tell me which of those you'd like me to implement next and I'll apply the change(s).
