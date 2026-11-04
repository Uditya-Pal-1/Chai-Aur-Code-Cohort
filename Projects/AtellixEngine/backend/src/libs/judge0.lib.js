import axios from 'axios';

const POLL_INTERVAL_MS = 1000;
const POLL_TIMEOUT_MS = 60000;
const REQUEST_TIMEOUT_MS = 15000;

const createJudge0Error = (message, cause) => {
    const error = new Error(message, { cause });
    error.statusCode = 502;
    return error;
};

const getJudge0Url = () => {
    if (!process.env.JUDGE0_API_URL) {
        throw createJudge0Error('Judge0 is not configured.');
    }

    return process.env.JUDGE0_API_URL.replace(/\/+$/, '');
};

const getJudge0LanguageId = (language) => {
    const languageMap = {
        "PYTHON": 71,
        "JAVA": 62,
        "JAVASCRIPT": 63,
        "TYPESCRIPT": 74,
    }
    return languageMap[language.toUpperCase()];
}


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const pollBatchResults = async (tokens) => {
    try {
        if (!Array.isArray(tokens) || tokens.length === 0 || tokens.some((token) => !token)) {
            throw new Error('Judge0 submission tokens are required.');
        }

        const deadline = Date.now() + POLL_TIMEOUT_MS;
        while (Date.now() < deadline) {
            const { data } = await axios.get(`${getJudge0Url()}/submissions/batch`, {
                params: {
                    tokens: tokens.join(","),
                    base64_encoded: false,
                },
                timeout: REQUEST_TIMEOUT_MS,
            });
            const results = data.submissions;

            if (!Array.isArray(results) || results.length !== tokens.length) {
                throw new Error('Judge0 returned an invalid batch response.');
            }

            const isAllDone = results.every((result) => ![1, 2].includes(result.status?.id));
            if (isAllDone) {
                return results;
            }

            await sleep(Math.min(POLL_INTERVAL_MS, deadline - Date.now()));
        }

        throw new Error('Judge0 execution timed out.');
    } catch (error) {
        if (error.statusCode) throw error;
        throw createJudge0Error('Unable to retrieve Judge0 execution results.', error);
    }
}

const submitBatch = async (submissions) => {
    try {
        if (!Array.isArray(submissions) || submissions.length === 0) {
            throw new Error('At least one Judge0 submission is required.');
        }

        const { data } = await axios.post(
            `${getJudge0Url()}/submissions/batch?base64_encoded=false`,
            { submissions },
            { timeout: REQUEST_TIMEOUT_MS },
        );
        const batch = Array.isArray(data) ? data : data?.submissions;

        if (!Array.isArray(batch) || batch.length !== submissions.length || batch.some((item) => !item.token)) {
            throw new Error('Judge0 returned an invalid submission response.');
        }

        return batch;
    } catch (error) {
        if (error.statusCode) throw error;
        throw createJudge0Error('Unable to submit code to Judge0.', error);
    }
}

const getLanguageName = (languageId) => {
    const LANGUAGE_NAMES = {
        74: "TypeScript",
        63: "JavaScript",
        71: "Python",
        62: "Java",
    }
    return LANGUAGE_NAMES[languageId] || 'Unknown'

}

export { getJudge0LanguageId, submitBatch, pollBatchResults, getLanguageName }