import mongoose from "mongoose";
import { schemaOptions } from "./schemaOptions.js";

const resultSchema = new mongoose.Schema(
  {
    testCase: Number,
    passed: Boolean,
    stdout: String,
    expected: String,
    stderr: String,
    compileOutput: String,
    status: String,
    memory: String,
    time: String,
  },
  { _id: false },
);

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
      index: true,
    },
    sourceCode: { type: mongoose.Schema.Types.Mixed, required: true },
    language: { type: String, required: true },
    stdin: String,
    stdout: String,
    stderr: String,
    compileOutput: String,
    status: { type: String, required: true },
    memory: String,
    time: String,
    testCases: { type: [resultSchema], default: [] },
  },
  schemaOptions,
);

export default mongoose.models.Submission ||
  mongoose.model("Submission", submissionSchema);
