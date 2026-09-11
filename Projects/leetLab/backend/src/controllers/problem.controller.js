import {db} from "../libs/db.js"
import { pollBatchResults } from "../libs/judge0.lib.js";

const createProblem = async(req, res)=>{
    const {title, description, difficulty, tag, examples, constraints, testcases, codeSnippets, referencesSolutions} = req.body;
    if(req.user.role !== "ADMIN"){
        return res.status(403).json({error:"you are not allowed to create a problem"})
    }
    try{
        for(const [language, solutionCode] of Object.entries(referencesSolutions)){
            const languageId = getJudge0LanguageId(language);
            if(!languageId){
                return res.status(400).json({error: `language ${language} is not supported`})
            }
        }
        const submissions = testcases.map(({ input, output }) => ({
           source_code: solutionCode,
           language_id: languageId,
            stdin: input,
           expected_output: output
        }))
        const submissionResults = await submitBatch(submissions);

        const tokens = submissionResults.map((res)=>res.token);

        const results = await pollBatchResults(tokens);

        for (let i = 0; i < results.length; i++){
            const result = results[i];

            if(result.status.id !== 3){
                return res.status(400).json({
                    error:`Testcase ${i + 1} failed for language ${language}`
                })
            }
        }
        const newProblem = await db.problem.create({
            data: {
            title, description, difficulty, tags, examples, constraints,testcases, codeSnippets, referencesSolutions, userId:req.user.id,
            }
        })
        return res.status(201).json({
            success: true,
            message: "Message Created Successfully",
            problem: newProblem,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            error:"Error while Creating Problem",
        });
    }
};

const getAllProblems = async(req, res)=>{}
const getProblemById = async(req, res)=>{}
const updateProblem = async(req, res)=>{}
const deleteProblem = async(req,res)=>{}
const getAllProblemsSolvedByUser = async(req, res)=>{}

export {createProblem, getAllProblems, getProblemById, updateProblem, deleteProblem, getAllProblemsSolvedByUser}