export const getExecutionTestCases = (problem) => {
    const testCases = problem?.testcases;
    if (!Array.isArray(testCases) || testCases.length === 0) return null;

    if (testCases.some((testCase) => (
        !testCase ||
        typeof testCase.input !== 'string' ||
        typeof testCase.output !== 'string'
    ))) {
        return null;
    }

    return testCases.map(({ input, output }) => ({ input, output }));
};

export const toPublicProblem = (problem) => {
    const { testcases, referenceSolutions, editorial, ...publicProblem } = problem;
    return publicProblem;
};

export const toPublicExecutionResults = (results) => results.map(({ expected, ...result }) => result);