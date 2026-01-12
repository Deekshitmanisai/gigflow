import mongoose from "mongoose";

/**
 * Connects to MongoDB using Mongoose
 * @param {string} mongoURI - MongoDB connection string
 * @returns {Promise<void>}
 */
export async function connectDB(mongoURI) {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
}
