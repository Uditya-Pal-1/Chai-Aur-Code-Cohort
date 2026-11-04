import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import axios from 'axios';
import { getLanguageName, pollBatchResults, submitBatch } from '../src/libs/judge0.lib.js';
import { getExecutionTestCases, toPublicExecutionResults, toPublicProblem } from '../src/libs/problem.utils.js';

const previousJudge0Url = process.env.JUDGE0_API_URL;
process.env.JUDGE0_API_URL = 'http://judge0.test';

after(() => {
    if (previousJudge0Url === undefined) {
        delete process.env.JUDGE0_API_URL;
    } else {
        process.env.JUDGE0_API_URL = previousJudge0Url;
    }
});

test('submitBatch accepts Judge0 batch response objects', async (context) => {
    const response = [{ token: 'token-1' }];
    context.mock.method(axios, 'post', async () => ({ data: { submissions: response } }));

    assert.deepEqual(await submitBatch([{ source_code: '1', language_id: 63 }]), response);
});

test('submitBatch reports service failures instead of fabricating tokens', async (context) => {
    context.mock.method(axios, 'post', async () => {
        throw new Error('ECONNREFUSED');
    });

    await assert.rejects(
        submitBatch([{ source_code: '1', language_id: 63 }]),
        { statusCode: 502 },
    );
});

test('pollBatchResults returns actual terminal results', async (context) => {
    const results = [{ status: { id: 3, description: 'Accepted' }, stdout: '1' }];
    context.mock.method(axios, 'get', async () => ({ data: { submissions: results } }));

    assert.deepEqual(await pollBatchResults(['token-1']), results);
});

test('pollBatchResults does not convert Judge0 errors into accepted results', async (context) => {
    const results = [{
        status: { id: 13, description: 'Internal Error' },
        message: 'rb_sysopen /box',
    }];
    context.mock.method(axios, 'get', async () => ({ data: { submissions: results } }));

    assert.deepEqual(await pollBatchResults(['token-1']), results);
    assert.equal(results[0].status.id, 13);
});

test('language names are returned synchronously for persistence', () => {
    assert.equal(getLanguageName(63), 'JavaScript');
});

test('execution test cases are read from the stored problem record', () => {
    assert.deepEqual(
        getExecutionTestCases({ testcases: [{ input: '1', output: '1' }] }),
        [{ input: '1', output: '1' }],
    );
    assert.equal(getExecutionTestCases({ testcases: [{ input: 1, output: '1' }] }), null);
});

test('public problem and execution responses omit private solutions and expected outputs', () => {
    const problem = {
        id: 'problem-1',
        title: 'Example',
        testcases: [{ input: 'secret input', output: 'secret output' }],
        referenceSolutions: { JAVASCRIPT: 'secret solution' },
        editorial: 'private editorial',
    };
    const executionResults = [{ testCase: 1, passed: false, expected: 'secret output' }];

    assert.deepEqual(toPublicProblem(problem), { id: 'problem-1', title: 'Example' });
    assert.deepEqual(toPublicExecutionResults(executionResults), [{ testCase: 1, passed: false }]);
});