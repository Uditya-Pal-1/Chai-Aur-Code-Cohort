import mongoose from "mongoose";
import { schemaOptions } from "./schemaOptions.js";

const testCaseSchema = new mongoose.Schema(
  {
    input: { type: String, required: true },
    output: { type: String, required: true },
  },
  { _id: false },
);

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      required: true,
    },
    tags: { type: [String], default: [] },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    examples: { type: [mongoose.Schema.Types.Mixed], default: [] },
    constraints: { type: String, default: "" },
    hints: { type: String, default: null },
    editorial: { type: String, default: null },
    testcases: { type: [testCaseSchema], default: [] },
    codeSnippets: { type: mongoose.Schema.Types.Mixed, default: {} },
    referenceSolutions: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  schemaOptions,
);

export default mongoose.models.Problem ||
  mongoose.model("Problem", problemSchema);
