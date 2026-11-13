import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  current: { type: Number, min: 0, max: 100 },
  target: { type: Number, min: 0, max: 100 },
  status: { type: String, enum: ["strong", "developing", "gap"] },
  confidence: { type: Number, min: 0, max: 1 },
  evidence: String,
});

const assessmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
    roleKey: { type: String, required: true },
    frameworkVersion: String,
    matchScore: Number,
    skills: [skillSchema],
    model: String, // which LLM/model produced it, for auditability
  },
  { timestamps: true }
);

export const Assessment =
  mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);
