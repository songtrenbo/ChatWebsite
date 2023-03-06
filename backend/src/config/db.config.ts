import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (err: any) {
    console.log(err);
    process.exit(1);
  }
};
