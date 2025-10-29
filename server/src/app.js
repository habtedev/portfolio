const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const contactRoutes = require('./routes/contactRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Initiallize express
const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic security headers
app.use(helmet());

// CORS: allow the frontend dev server by default
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:8080';
app.use(cors({ origin: clientOrigin }));

// Rate limiter for contact endpoint to reduce spam/abuse
const contactLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // limit each IP to 10 requests per windowMs
	standardHeaders: true,
	legacyHeaders: false,
	message: { error: 'Too many contact requests from this IP, please try again later.' },
});

// Mount routes (apply rate limiter to contact route)
app.use('/api/contact', contactLimiter, contactRoutes);

// Chat endpoint (lightweight keyword-based responses)
app.use('/api/chat', chatRoutes);

// Health check
app.get('/', (req, res) => {
	res.send('API is running');
});

// Lightweight health endpoint for platform checks (reports DB status)
const mongoose = require('mongoose');
app.get('/healthz', (req, res) => {
	const readyState = mongoose.connection && mongoose.connection.readyState;
	// readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
	res.json({ ok: true, dbState: readyState });
});

module.exports = app;