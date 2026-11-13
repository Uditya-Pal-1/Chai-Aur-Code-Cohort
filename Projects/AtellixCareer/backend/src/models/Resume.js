import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    fileName: { type: String, required: true },
    mimeType: String,
    sizeBytes: Number,
    extractedText: String,
    skillsFound: [{ name: String, evidence: String }],
    parseStatus: { type: String, enum: ["pending", "parsed", "failed"], default: "pending" },
  },
  { timestamps: true }
);

export const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
