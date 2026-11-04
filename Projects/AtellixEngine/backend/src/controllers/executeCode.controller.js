import { isValidObjectId } from "mongoose";
import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";
import {
  getExecutionTestCases,
  toPublicExecutionResults,
} from "../libs/problem.utils.js";
import Problem from "../models/Problem.js";
import ProblemSolved from "../models/ProblemSolved.js";
import Submission from "../models/Submission.js";

export const executeCode = async (req, res) => {
  const { source_code, language_id, problemId } = req.body ?? {};
  const languageId = Number(language_id);
  if (
    typeof source_code !== "string" ||
    !source_code.trim() ||
    !Number.isInteger(languageId) ||
    getLanguageName(languageId) === "Unknown" ||
    typeof problemId !== "string" ||
    !isValidObjectId(problemId)
  ) {
    return res.status(400).json({
      error: "Valid source code, language, and problem ID are required",
    });
  }

  try {
    const problem = await Problem.findById(problemId).select("testcases");
    if (!problem) return res.status(404).json({ error: "Problem not found" });
    const testCases = getExecutionTestCases(problem);
    if (!testCases)
      return res
        .status(500)
        .json({ error: "Problem test cases are not configured correctly" });

    const submitted = await submitBatch(
      testCases.map(({ input }) => ({
        source_code,
        language_id: languageId,
        stdin: input,
      })),
    );
    const results = await pollBatchResults(submitted.map(({ token }) => token));
    if (results.length !== testCases.length)
      throw Object.assign(new Error("Incomplete execution results"), {
        statusCode: 502,
      });

    const detailedResults = results.map((result, index) => {
      const stdout = result.stdout?.trim() ?? "";
      const expected = testCases[index].output.trim();
      return {
        testCase: index + 1,
        passed: result.status?.id === 3 && stdout === expected,
        stdout,
        expected,
        stderr: result.stderr || null,
        compileOutput: result.compile_output || null,
        status: result.status?.description ?? "Execution Error",
        memory: result.memory ? `${result.memory} KB` : null,
        time: result.time ? `${result.time} s` : null,
      };
    });
    const allPassed = detailedResults.every(({ passed }) => passed);

    await Submission.create({
      userId: req.user.id,
      problemId,
      sourceCode: source_code,
      language: getLanguageName(languageId),
      stdin: testCases.map(({ input }) => input).join("\n"),
      stdout: JSON.stringify(detailedResults.map(({ stdout }) => stdout)),
      stderr: JSON.stringify(detailedResults.map(({ stderr }) => stderr)),
      compileOutput: JSON.stringify(
        detailedResults.map(({ compileOutput }) => compileOutput),
      ),
      status: allPassed ? "Accepted" : "Wrong Answer",
      memory: JSON.stringify(detailedResults.map(({ memory }) => memory)),
      time: JSON.stringify(detailedResults.map(({ time }) => time)),
      testCases: detailedResults,
    });

    if (allPassed)
      await ProblemSolved.updateOne(
        { userId: req.user.id, problemId },
        { $setOnInsert: { userId: req.user.id, problemId } },
        { upsert: true },
      );
    return res.json({
      allPassed,
      results: toPublicExecutionResults(detailedResults),
    });
  } catch (error) {
    console.error("Code execution failed:", error);
    const status = error.statusCode ?? 500;
    return res.status(status).json({
      error:
        status === 502
          ? "Code execution service unavailable"
          : "Internal server error",
    });
  }
};
