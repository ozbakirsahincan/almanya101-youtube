import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * Uses connection string from MONGODB_URI environment variable
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/almanya101');

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Don't exit in development - allow server to start for testing
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.warn('Starting server without MongoDB connection (demo mode)');
    }
  }
};

export default connectDB;
