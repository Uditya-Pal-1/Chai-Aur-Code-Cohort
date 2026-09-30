import { db } from '../libs/db.js';
import { getLanguageName, pollBatchResults, submitBatch } from "../libs/judge0.lib.js"
import { getExecutionTestCases, toPublicExecutionResults } from '../libs/problem.utils.js';

export const executeCode = async (req, res) => {
    try {
        const { source_code, language_id, problemId } = req.body || {};
        const userId = req.user.id;
        const languageId = Number(language_id);
        if (
            typeof source_code !== 'string' ||
            source_code.length === 0 ||
            !Number.isInteger(languageId) ||
            getLanguageName(languageId) === 'Unknown' ||
            typeof problemId !== 'string' ||
            problemId.length === 0

        ) {
            return res.status(400).json({ error: "Invalid or missing execution details" });
        }

        const problem = await db.problem.findUnique({
            where: { id: problemId },
            select: { testcases: true },
        });

        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        const testCases = getExecutionTestCases(problem);
        if (!testCases) {
            return res.status(500).json({ error: 'Problem test cases are not configured correctly' });
        }

        const stdin = testCases.map((testCase) => testCase.input);
        const expectedOutputs = testCases.map((testCase) => testCase.output);
        const submissions = stdin.map((input) => ({
            source_code,
            language_id: languageId,
            stdin: input,
        }));

        const submitResponse = await submitBatch(submissions);
        const tokens = submitResponse.map((res) => res.token);

        const results = await pollBatchResults(tokens);
        let allPassed = results.length === stdin.length;

        const detailedResults = results.map((result, i) => {
            const stdout = result.stdout?.trim() ?? '';
            const expectedOutput = expectedOutputs[i].trim();
            const passed = result.status?.id === 3 && stdout === expectedOutput;

            if (!passed) allPassed = false;

            return {
                testCase: i + 1,
                passed,
                stdout,
                expected: expectedOutput,
                stderr: result.stderr || null,
                compileOutput: result.compile_output || null,
                status: result.status?.description ?? 'Execution Error',
                memory: result.memory ? `${result.memory} KB` : undefined,
                time: result.time ? `${result.time} s` : undefined
            };
        });

        const submission = await db.submission.create({
            data: {
                userId,
                problemId,
                sourceCode: source_code,
                language: getLanguageName(languageId),
                stdin: stdin.join("\n"),
                stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
                stderr: detailedResults.some((r) => r.stderr) ? JSON.stringify(detailedResults.map((r) => r.stderr)) : null,
                compileOutput: detailedResults.some((result) => result.compileOutput) ? JSON.stringify(detailedResults.map((result) => result.compileOutput)) : null,
                status: allPassed ? "Accepted" : "Wrong Answer",
                memory: detailedResults.some((r) => r.memory) ? JSON.stringify(detailedResults.map((r) => r.memory)) : null,
                time: detailedResults.some((r) => r.time) ? JSON.stringify(detailedResults.map((r) => r.time)) : null,
            },
        });

        if (allPassed) {
            await db.problemSolved.upsert({
                where: {
                    userId_problemId: {
                        userId,
                        problemId,
                    },
                },
                update: {},
                create: {
                    userId,
                    problemId,
                },
            });
        }
        const testCaseResults = detailedResults.map((result) => ({
            submissionId: submission.id,
            testCase: result.testCase,
            passed: result.passed,
            stdout: result.stdout,
            expected: result.expected,
            stderr: result.stderr,
            compileOutput: result.compileOutput,
            status: result.status,
            memory: result.memory,
            time: result.time,
        }));

        await db.testCaseResult.createMany({
            data: testCaseResults,
        });

        const publicResults = toPublicExecutionResults(detailedResults);
        return res.status(200).json({ allPassed, results: publicResults });

    } catch (error) {
        console.error("Error executing code:", error);
        const statusCode = error.statusCode ?? 500;
        const message = statusCode === 502 ? 'Code execution service unavailable' : 'Internal Server Error';
        return res.status(statusCode).json({ error: message });
    }
}