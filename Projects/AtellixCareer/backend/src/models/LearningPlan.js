import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ["Docs", "Course", "Project", "Exercise"] },
  duration: String, // e.g. "2h"
  url: String,
});

const weekSchema = new mongoose.Schema({
  week: { type: Number, required: true },
  theme: String,
  focus: String,
  hours: Number,
  status: { type: String, enum: ["done", "current", "upcoming"], default: "upcoming" },
  milestones: [String],
  resources: [resourceSchema],
  resourcesCompleted: [{ type: Number }],
});

const planSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assessment" },
    roleKey: String,
    weeks: [weekSchema],
    status: { type: String, enum: ["active", "completed", "archived"], default: "active" },
  },
  { timestamps: true }
);

export const LearningPlan =
  mongoose.models.LearningPlan || mongoose.model("LearningPlan", planSchema);
