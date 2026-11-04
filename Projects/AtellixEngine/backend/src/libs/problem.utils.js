export const getExecutionTestCases = (problem) => {
  const testCases = problem?.testcases;
  if (!Array.isArray(testCases) || testCases.length === 0) return null;

  if (
    testCases.some(
      (testCase) =>
        !testCase ||
        typeof testCase.input !== "string" ||
        typeof testCase.output !== "string",
    )
  ) {
    return null;
  }

  return testCases.map(({ input, output }) => ({ input, output }));
};

export const toPublicProblem = (problem) => {
  const value =
    typeof problem?.toJSON === "function" ? problem.toJSON() : problem;
  const { testcases, referenceSolutions, editorial, ...publicProblem } = value;
  return publicProblem;
};

export const toPublicExecutionResults = (results) =>
  results.map(({ expected, ...result }) => result);
