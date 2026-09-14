import { db } from '../libs/db.js'

const getAllSubmission = async(req, res)=>{
    try {
        const userId = req.user.id;
        const submissions = await db.submission.findMany({
            where:{
                userId: userId
            }
        })
        res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            submissions
        })
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
        res.status(500).json({error: "Failed to fetch submissions"});
    }
}

const getSubmissionForProblem = async(req, res)=>{}
const getAllTheSubmissionsForProblem = async(req, res)=>{}

export { getAllSubmission, getSubmissionForProblem, getAllTheSubmissionsForProblem }