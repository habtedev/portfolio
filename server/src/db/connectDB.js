const mongoose = require('mongoose');

const connectDB = async () => {
    if (process.env.SKIP_DB === 'true') {
        console.log('SKIP_DB=true, skipping MongoDB connection');
        return;
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI is not set');
    }

    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        throw error; // let the app crash so Render knows something failed
    }
};

module.exports = connectDB;
