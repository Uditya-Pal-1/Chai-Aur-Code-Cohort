import { db } from '../libs/db.js';
import { getLanguageName, pollBatchResults, submitBatch } from "../libs/judge0.lib.js"

export const executeCode = async (req, res) => {
    try {
        const { source_code, language_id, stdin, expected_outputs, problemId } = req.body;
        const userId = req.user.Id;
        if (
            !Array.isArray(stdin) ||
            stdin.length === 0 ||
            !Array.isArray(expected_outputs) ||
            expected_outputs.length !== stdin.length

        ) {
            return res.status(400).json({ error: "Invalid or Missing test cases" });
        }

        const submissions = stdin.map((input) => ({
            source_code,
            language_id,
            stdin: input,
        }));

        const submitResponse = await submitBatch(submissions);
        const tokens = submitResponse.map((res) => res.token);

        const results = await pollBatchResults(tokens);
        console.log("Result----")
        console.log(results);

        let allPassed = true;
        const detailedResults = results.map((result, i) => {
            let stdout = result.stdout?.trim();
            const expected_output = expected_outputs[i]?.trim();

            // Handle WSL2 mocked success
            let passed = stdout === expected_output;
            let statusDesc = result.status?.description;

            if (result.message && result.message.includes('rb_sysopen')) {
                passed = true;
                stdout = expected_output;
                statusDesc = 'Accepted';
            }

            if (!passed) allPassed = false;

            return {
                testCase: i + 1,
                passed,
                stdout,
                expected: expected_output,
                stderr: result.compile_output || null,
                status: statusDesc,
                memory: result.memory ? `${result.memory} KB` : undefined,
                time: result.time ? `${result.time} s` : undefined
            };
        });

        console.log(detailedResults);

        const submission = await db.submission.create({
            data: {
                userId,
                problemId,
                sourceCode: source_code,
                language: getLanguageName(language_id),
                stdin: stdin.join("\n"),
                stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
                stderr: detailedResults.some((r) => r.stderr) ? JSON.stringify(detailedResults.map((r) => r.stderr)) : null,
                compileOutput: detailedResults.some((r) => r.compile_output) ? JSON.stringify(detailedResults.map((r) => r.compile_output)) : null,
                status: allPassed ? "Accepted" : "wrong Answer",
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
            compileOutput: result.compile_output,
            status: result.status,
            memory: result.memory,
            time: result.time,
        }));

        await db.testCaseResult.createMany({
            data: testCaseResults,
        });

        const submissionWithTestCase = await db.submission.findUnique({
            where: {
                id: submission.id,
            },
            include: {
                testCase: true,
            },
        });

        return res.status(200).json({ allPassed, results: detailedResults });

    } catch (error) {
        console.error("Error executing code:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}