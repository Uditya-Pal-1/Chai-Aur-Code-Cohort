import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware";
import { getAllSubmission, getSubmissionForProblem, getAllTheSubmissionsForProblem } from "../controllers/submission.controller.js"

const submissionRoutes = express.Router();

submissionRoutes.get("/get-all-submissions", authMiddleware, getAllSubmission);
submissionRoutes.get("/get-submission/:problemId", authMiddleware, getSubmissionForProblem)
submissionRoutes.get("/get-submissions-count/:problemId", authMiddleware, getAllTheSubmissionsForProblem)

export default submissionRoutes;