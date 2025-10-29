const mongoose = require('mongoose');

const connectDB = async () => {
    if (process.env.SKIP_DB === 'true') {
        console.log('SKIP_DB=true, skipping MongoDB connection');
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not set');
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // recommended options
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // rethrow so callers can decide whether to exit
        throw error;
    }
};

module.exports = connectDB;