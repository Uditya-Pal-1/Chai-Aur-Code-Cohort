import mongoose from "mongoose";
import { schemaOptions } from "./schemaOptions.js";

const problemSolvedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
  },
  schemaOptions,
);

problemSolvedSchema.index({ userId: 1, problemId: 1 }, { unique: true });

export default mongoose.models.ProblemSolved ||
  mongoose.model("ProblemSolved", problemSolvedSchema);
