import { isValidObjectId } from "mongoose";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";
import { toPublicProblem } from "../libs/problem.utils.js";
import Playlist from "../models/Playlist.js";
import Problem from "../models/Problem.js";
import ProblemInPlaylist from "../models/ProblemInPlaylist.js";
import ProblemSolved from "../models/ProblemSolved.js";
import Submission from "../models/Submission.js";

const validateReferenceSolutions = async (testcases, solutions) => {
  if (
    !Array.isArray(testcases) ||
    !testcases.length ||
    testcases.some(
      (test) =>
        !test ||
        typeof test.input !== "string" ||
        typeof test.output !== "string",
    )
  ) {
    return {
      status: 400,
      body: { error: "At least one valid test case is required" },
    };
  }
  if (
    !solutions ||
    typeof solutions !== "object" ||
    Array.isArray(solutions) ||
    !Object.keys(solutions).length
  ) {
    return {
      status: 400,
      body: { error: "At least one reference solution is required" },
    };
  }

  for (const [language, sourceCode] of Object.entries(solutions)) {
    const languageId = getJudge0LanguageId(language);
    if (!languageId)
      return {
        status: 400,
        body: { error: `Language ${language} is not supported` },
      };
    if (typeof sourceCode !== "string")
      return {
        status: 400,
        body: { error: `Reference solution for ${language} must be text` },
      };

    const submitted = await submitBatch(
      testcases.map(({ input, output }) => ({
        source_code: sourceCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      })),
    );
    const results = await pollBatchResults(submitted.map(({ token }) => token));
    const failedIndex = results.findIndex((result) => result.status?.id !== 3);
    if (failedIndex !== -1) {
      const result = results[failedIndex];
      return {
        status: 400,
        body: {
          error: `Test case ${failedIndex + 1} failed for ${language}`,
          details: {
            status: result.status?.description,
            stdout: result.stdout,
            stderr: result.stderr,
            compile_output: result.compile_output,
            expected_output: testcases[failedIndex].output,
          },
        },
      };
    }
  }
  return null;
};

const handleError = (res, error, message) => {
  if (error.name === "CastError")
    return res.status(400).json({ error: "Invalid resource ID" });
  if (error.name === "ValidationError")
    return res.status(400).json({ error: "Invalid problem details" });
  console.error(message, error);
  const status = error.statusCode ?? 500;
  return res.status(status).json({
    error: status === 502 ? "Code execution service unavailable" : message,
  });
};

export const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    hints,
    editorial,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body ?? {};
  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof description !== "string" ||
    !description.trim() ||
    !difficulty
  ) {
    return res.status(400).json({
      error: "Complete problem details and valid test cases are required",
    });
  }

  try {
    const validation = await validateReferenceSolutions(
      testcases,
      referenceSolutions,
    );
    if (validation) return res.status(validation.status).json(validation.body);
    const problem = await Problem.create({
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      hints,
      editorial,
      testcases,
      codeSnippets,
      referenceSolutions,
      userId: req.user.id,
    });
    return res.status(201).json({
      success: true,
      message: "Problem created successfully",
      problem,
    });
  } catch (error) {
    return handleError(res, error, "Unable to create problem");
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const [problems, solvedIds] = await Promise.all([
      Problem.find().sort({ createdAt: -1 }),
      ProblemSolved.distinct("problemId", { userId: req.user.id }),
    ]);
    const solved = new Set(solvedIds.map(String));
    const result = problems.map((problem) => {
      if (req.user.role === "ADMIN") return problem;
      return { ...toPublicProblem(problem), isSolved: solved.has(problem.id) };
    });
    return res.json({
      success: true,
      message: "Problems fetched successfully",
      problems: result,
    });
  } catch (error) {
    return handleError(res, error, "Unable to fetch problems");
  }
};

export const getProblemById = async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).json({ error: "Invalid problem ID" });
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: "Problem not found" });
    const result =
      req.user.role === "ADMIN" ? problem : toPublicProblem(problem);
    return res.json({
      success: true,
      message: "Problem fetched successfully",
      problem: result,
    });
  } catch (error) {
    return handleError(res, error, "Unable to fetch problem");
  }
};

export const updateProblem = async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).json({ error: "Invalid problem ID" });
  if (
    !req.body ||
    typeof req.body !== "object" ||
    Array.isArray(req.body) ||
    !Object.keys(req.body).length
  ) {
    return res
      .status(400)
      .json({ error: "At least one problem field is required" });
  }
  const { referenceSolutions, testcases } = req.body;
  const hasReferenceSolutions = Object.hasOwn(req.body, "referenceSolutions");
  const hasTestCases = Object.hasOwn(req.body, "testcases");
  const allowedFields = [
    "title",
    "description",
    "difficulty",
    "tags",
    "examples",
    "constraints",
    "hints",
    "editorial",
    "testcases",
    "codeSnippets",
    "referenceSolutions",
  ];
  if (!allowedFields.some((field) => Object.hasOwn(req.body, field))) {
    return res
      .status(400)
      .json({ error: "No supported problem fields were provided" });
  }
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const nextCases = hasTestCases ? testcases : problem.testcases;
    const nextSolutions = hasReferenceSolutions
      ? referenceSolutions
      : problem.referenceSolutions;
    if (hasTestCases || hasReferenceSolutions) {
      const validation = await validateReferenceSolutions(
        nextCases,
        nextSolutions,
      );
      if (validation)
        return res.status(validation.status).json(validation.body);
    }

    for (const field of allowedFields) {
      if (Object.hasOwn(req.body, field)) problem[field] = req.body[field];
    }
    await problem.save();
    return res.json({
      success: true,
      message: "Problem updated successfully",
      problem,
    });
  } catch (error) {
    return handleError(res, error, "Unable to update problem");
  }
};

export const deleteProblem = async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).json({ error: "Invalid problem ID" });
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: "Problem not found" });
    await Promise.all([
      Submission.deleteMany({ problemId: problem._id }),
      ProblemSolved.deleteMany({ problemId: problem._id }),
      ProblemInPlaylist.deleteMany({ problemId: problem._id }),
    ]);
    await Problem.deleteOne({ _id: problem._id });
    return res.json({ success: true, message: "Problem deleted successfully" });
  } catch (error) {
    return handleError(res, error, "Unable to delete problem");
  }
};

export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    const solved = await ProblemSolved.find({ userId: req.user.id }).select(
      "problemId",
    );
    const problems = await Problem.find({
      _id: { $in: solved.map(({ problemId }) => problemId) },
    }).select("title difficulty tags");
    return res.json({
      success: true,
      message: "Solved problems fetched successfully",
      solvedProblems: problems,
    });
  } catch (error) {
    return handleError(res, error, "Unable to fetch solved problems");
  }
};
