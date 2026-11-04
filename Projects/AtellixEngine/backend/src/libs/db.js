import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.info(`MongoDB connected: ${mongoose.connection.name}`);
};
