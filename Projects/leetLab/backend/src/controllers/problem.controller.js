import { db } from "../libs/db.js"
import { getJudge0LanguageId, submitBatch, pollBatchResults } from "../libs/judge0.lib.js";

const createProblem = async (req, res) => {
    // checkAdmin middleware already ensures only ADMIN can reach here
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
    } = req.body;

    try {
        if (!testcases || !referenceSolutions) {
            return res.status(400).json({ error: "Testcases and ReferenceSolution are required" })
        }

        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getJudge0LanguageId(language);
            if (!languageId) {
                return res.status(400).json({ error: `Language ${language} is not supported` });
            }

            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }));

            const submissionResults = await submitBatch(submissions);
            const tokens = submissionResults.map((res) => res.token);
            const results = await pollBatchResults(tokens);

            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                console.log("Result --", result);
                if (result.status.id !== 3) {
                    return res.status(400).json({
                        error: `Testcase ${i + 1} failed for language ${language}`,
                        details: {
                            status: result.status?.description,
                            stdout: result.stdout,
                            stderr: result.stderr,
                            compile_output: result.compile_output,
                            expected_output: testcases[i].output
                        }
                    });
                }
            }
        }

        const newProblem = await db.problem.create({
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testcases,
                codeSnippets,
                referenceSolutions,
                userId: req.user.id,
            }
        });

        return res.status(201).json({
            success: true,
            message: "Problem Created Successfully",
            problem: newProblem,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error while Creating Problem",
        });
    }
};

const getAllProblems = async (req, res) => {
    try {
        const problems = await db.problem.findMany({
            select: {
                id: true,
                title: true,
                difficulty: true,
                tags: true,
                constraints: true,
                examples: true,
                createdAt: true,
            }
        });

        return res.status(200).json({
            success: true,
            message: "Problems fetched successfully",
            problems,
        });
    } catch (error) {
        console.error("Error fetching problems:", error);
        return res.status(500).json({
            error: "Error fetching problems",
        });
    }
};

const getProblemById = async (req, res) => {
    const { id } = req.params;
    try {
        const problem = await db.problem.findUnique({
            where: { id }
        });

        if (!problem) {
            return res.status(404).json({
                error: "Problem not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Problem fetched successfully",
            problem,
        });
    } catch (error) {
        console.error("Error fetching problem:", error);
        return res.status(500).json({
            error: "Error fetching problem",
        });
    }
};

const updateProblem = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
    } = req.body;

    try {
        const existingProblem = await db.problem.findUnique({ where: { id } });
        if (!existingProblem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        // Re-validate updated reference solutions against testcases if provided
        if (referenceSolutions || testcases) {
            const solutionsToTest = referenceSolutions || existingProblem.referenceSolutions;
            const testcasesToUse = testcases || existingProblem.testcases;
            
            for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
                const languageId = getJudge0LanguageId(language);
                if (!languageId) {
                    return res.status(400).json({ error: `Language ${language} is not supported` });
                }

                const submissions = testcases.map(({ input, output }) => ({
                    source_code: solutionCode,
                    language_id: languageId,
                    stdin: input,
                    expected_output: output
                }));

                const submissionResults = await submitBatch(submissions);
                const tokens = submissionResults.map((r) => r.token);
                const results = await pollBatchResults(tokens);

                for (let i = 0; i < results.length; i++) {
                    const result = results[i];
                    if (result.status.id !== 3) {
                        return res.status(400).json({
                            error: `Testcase ${i + 1} failed for language ${language}`,
                            details: {
                                status: result.status?.description,
                                stdout: result.stdout,
                                stderr: result.stderr,
                                compile_output: result.compile_output,
                                expected_output: testcases[i].output
                            }
                        });
                    }
                }
            }
        }

        const updatedProblem = await db.problem.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(description && { description }),
                ...(difficulty && { difficulty }),
                ...(tags && { tags }),
                ...(examples && { examples }),
                ...(constraints && { constraints }),
                ...(testcases && { testcases }),
                ...(codeSnippets && { codeSnippets }),
                ...(referenceSolutions && { referenceSolutions }),
            }
        });

        return res.status(200).json({
            success: true,
            message: "Problem updated successfully",
            problem: updatedProblem,
        });
    } catch (error) {
        console.error("Error updating problem:", error);
        return res.status(500).json({
            error: "Error updating problem",
        });
    }
};

const deleteProblem = async (req, res) => {
    const { id } = req.params;
    try {
        const existingProblem = await db.problem.findUnique({ where: { id } });
        if (!existingProblem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        await db.problem.delete({ where: { id } });

        return res.status(200).json({
            success: true,
            message: "Problem deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting problem:", error);
        return res.status(500).json({
            error: "Error deleting problem",
        });
    }
};

const getAllProblemsSolvedByUser = async (req, res) => {
    try {
        const solvedRecords = await db.problemSolved.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                problem: {
                    select: {
                        id: true,
                        title: true,
                        difficulty: true,
                        tags: true,
                    }
                }
            }
        })
        const solvedProblems = solvedRecords.map(record => record.problem);
        // TODO: Add a Submission model in schema.prisma to track solved problems
        // For now, returns a placeholder until Submission model is added
        return res.status(200).json({
            success: true,
            message: "Solved problems fetched successfully",
            solvedProblems
        });
    } catch (error) {
        console.error("Error fetching solved problems:", error);
        return res.status(500).json({
            error: "Error fetching solved problems",
        });
    }
};

export { createProblem, getAllProblems, getProblemById, updateProblem, deleteProblem, getAllProblemsSolvedByUser }