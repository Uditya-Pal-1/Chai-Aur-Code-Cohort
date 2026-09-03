import {apiError} from '../utils/api-error.js'
import {asyncHandler} from '../utils/async-handler.js'
import jwt from 'jsonwebtoken'
import {User} from '../models/user.models.js'
import {projectMember} from '../models/projectmember.models.js'
import mongoose from 'mongoose'

export const verifyJwt = asyncHandler(async(req, res, next)=>{
   const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
    if(!token){
        throw new apiError(401, "Unauthorized request");
    }
    try{
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-avatar -password -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry")
        if(!user){
            throw new apiError(402, "Invalid AccessToken")
        }
        req.user = user;
        next();
    }catch(error){
        throw new apiError(403, error?.message || "Invalid access Token.")
    }
});

export const getLoggedInUserOrIgnore = asyncHandler(async (req, res, next) =>{
    const token = req.cookies?.accessToken || req.head("Authorization")?.replace("Bearer", "")
     try{
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-avatar -password -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry")
        req.user = user;
        next();
     }catch(error){
        next();
     }
})

export const validateProjectPermission = (role=[])=>{
    asyncHandler(async(req, res, next)=>{
        const {projectId} = req.params;
        if(!projectId){
            throw new apiError(400, "project id is missing")
        }
        const project = await projectMember.findById({
            project:new mongoose.Types.ObjectId(projectId), 
            user: new mongoose.Types.ObjectId(req.user._id),
        });
        if(!project){
            throw new apiError(401, "Project not found")
        }
        const givenRoles = project?.role;
        req.user.role = givenRoles;
        if(!role.includes(givenRoles)){
            throw new apiError(402, "You do not have permission to this action.")
        }
        next();
    })
}