// Entry point for backend

require('dotenv').config();
const connectDB = require('./src/db/connectDB');
const app = require('./src/app');

const PORT = process.env.PORT || 8500;

const start = async () => {
  // SKIP_DB=true useful for frontend-only development — skip DB connect and start server.
  if (process.env.SKIP_DB === 'true') {
    app.listen(PORT, () => console.log(`Server (no DB) listening on ${PORT}`));
    return;
  }

  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();