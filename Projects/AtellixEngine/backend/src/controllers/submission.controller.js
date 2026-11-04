import { isValidObjectId } from "mongoose";
import Submission from "../models/Submission.js";

const submissionFields = "-testCases";

export const getAllSubmission = async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user.id })
      .select(submissionFields)
      .sort({ createdAt: -1 })
      .limit(100);
    return res.json({
      success: true,
      message: "Submissions fetched successfully",
      submissions,
    });
  } catch (error) {
    console.error("Unable to fetch submissions:", error);
    return res.status(500).json({ error: "Unable to fetch submissions" });
  }
};

export const getSubmissionForProblem = async (req, res) => {
  const { problemId } = req.params;
  if (!isValidObjectId(problemId))
    return res.status(400).json({ error: "Invalid problem ID" });
  try {
    const submissions = await Submission.find({
      userId: req.user.id,
      problemId,
    })
      .select(submissionFields)
      .sort({ createdAt: -1 })
      .limit(100);
    return res.json({
      success: true,
      message: "Submissions fetched successfully",
      submissions,
    });
  } catch (error) {
    console.error("Unable to fetch problem submissions:", error);
    return res.status(500).json({ error: "Unable to fetch submissions" });
  }
};

export const getAllTheSubmissionsForProblem = async (req, res) => {
  const { problemId } = req.params;
  if (!isValidObjectId(problemId))
    return res.status(400).json({ error: "Invalid problem ID" });
  try {
    const count = await Submission.countDocuments({ problemId });
    return res.json({
      success: true,
      message: "Submission count fetched successfully",
      count,
    });
  } catch (error) {
    console.error("Unable to count problem submissions:", error);
    return res.status(500).json({ error: "Unable to fetch submission count" });
  }
};
