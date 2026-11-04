import mongoose from "mongoose";
import { schemaOptions } from "./schemaOptions.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    image: { type: String, default: null },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    password: { type: String, required: true, select: false },
  },
  schemaOptions,
);

export default mongoose.models.User || mongoose.model("User", userSchema);
