import mongoose from "mongoose"
import { Project } from "../models/project.models.js"
import { projectMember } from "../models/projectmember.models.js"
import { User } from '../models/user.models.js'
import { apiError } from "../utils/api-error.js"
import { apiResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler"
import {AvailableUserRoles, UserRolesEnum} from "../constants/constants.js"

//get all Project
const getProjects = asyncHandler(async (req, res) => {
    const project = await projectMember.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user._id),
            },
        },
        {
            $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "project",
                pipeline: [
                    {
                        $lookup: {
                            from: "projectmembers",
                            localField: "_id",
                            foreignField: "project",
                            as: "projectmembers",
                        },
                    },
                    {
                        $addFields: {
                            members: {
                                $size: "$projectmembers",
                            },
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$project",
        },
        {
            $project: {
                project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    members: 1,
                    createdAt: 1,
                    createdBy: 1,
                },
                role: 1,
                _id: 0,
            },
        },
    ]);
    return res.status(200).json(
        new apiResponse(200, getProjects, "project fetched successfully"));
});

//get project by Id
const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const project = await Project.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(projectId),
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'createdBy',
                foreignField: '_id',
                as: "createdBy",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            fullName: 1,
                            avatar: 1,
                            email: 1,
                        },
                    },
                ],

            },
        },
        {
            $lookup: {
                from: 'projectmembers',
                locatField: "_id",
                foreignField: "project",
                as: "members",
            },
        },
        {
            $addFields: {
                createdBy: { $arrayElemAt: ["$createdBy", 0] },
                totalmembers: { $size: "members" },
            },
        },
        {
            $project: {
                members: 0,
            },
        },
    ]);
    if (!project || project.length === 0) {
        throw new apiError(404, "Project not found");
    }
    return res.status(200).json(new apiResponse(200, project[0], "project fetched successfully"))
})

//create project
const createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const project = await Project.create({
        name, description, createdBy: new mongoose.Types.ObjectId(req.user._id),
    });

    await projectMember.create({
        user: new mongoose.Types.ObjectId(req.user._id),
        project: new mongoose.Types.ObjectId(project._id),
        role: UserRolesEnum.ADMIN,
    });
    return res.status(200).json(new apiResponse(201, project, "project created successfully"));
});

//update project
const updateProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const { projectId } = req.params;
    const project = await Project.findByIdandUpdate(
        projectId,
        {
            name, description,
        },
        { new: true },
    );
    if (!project) {
        throw new apiError(404, "project not found")
    }
    return res.status(200)
        .json(new apiResponse(200, project, "project updated successfully"));
})

//delete project
const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const project = await Project.findByIdAndDelte(projectId);
    if (!project) {
        throw new apiError(404, "project not found")
    }
    await projectMember.deleteMany({ project: projectId })
    return res.status(200).json(new apiError(200, project, "project deleted successfully"))
})

//add members to project
const addMemberToProject = asyncHandler(async (req, res) => {
    const { email, username, role } = req.body;
    const { projectId } = req.params;
    const user = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (!user) {
        throw new apiError(404, "user does not exist")
    }
    await projectMember.findOneAndUpdate(
        {
            user: new mongoose.Types.ObjectId(user._id),
            project: new mongoose.Types.ObjectId(projectId)
        },{
            user: new mongoose.Types.ObjectId(user._id),
            project: new mongoose.Types.ObjectId(projectId),
            role: role,
        },{
            new: true,
            upsert: true,
        },
    )
    return res.status(200).json(new apiResponse(201, {}, "project member added successfully"))
})

//get project members
const getProjectMembers = asyncHandler(async (req, res) => {
    const {projectId} = req.params;
    const project = await Project.findById(projectId);
    if(!project){
        throw new apiError(404,"project not found")
    }
    const projectMembers = await projectMember.aggregate([
        {
            $match: {
                project: new mongoose.Types.ObjectId(projectId),
            },
        },
        {
            $lookup: {
                from: "users",
                localfield: "user",
                foreignField: "_id",
                as: 'user',
                pipeline:[{
                    $project: {
                        _id: 1,
                        username: 1,
                        fullName: 1,
                        avatar: 1,
                    },
                },
            ],
            },
        },
        {
            $addFields: {
                user: {
                    $arrayElemAt: ["$user",0],
                },
            },
        },{
            $project: {
                project: 1,
                user: 1,
                role: 1, 
                createdAt: 1,
                updatedAt: 1,
                _id: 0,

            },
        },
    ]);
    return res.status(200).json(new apiResponse(200, projectMembers, "project members fetched"))
})

//update member role
const updateMemberRole = asyncHandler(async (req, res) => {
    const { projectId, userId } = req.params;
    const {newRole} = req.body;
    if(!AvailableUserRoles.includes(newRole)){
        throw new apiError(400, "Invalid role")
    }
    let ProjectMember = await projectMember.findOne({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId),
    });
    if(!ProjectMember){
        throw new apiError(404,"project member not found");
    }
    ProjectMember = projectMember.findByIdandUpdate(
        ProjectMember._id,
        {
            role: newRole,
        },
        {new: true},
    );
    if(!ProjectMember){
        throw new apiError(404,"project member not found");
    }
    return res.status(200).json(
        new apiResponse(200, ProjectMember, "project member role updated successfully")
    )
});

//delete members from project
const deleteMember = asyncHandler(async (req, res) => {
    const {projectId, userId} = req.params;
    let ProjectMember = await projectMember.findOne({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId),
    });
    if(!ProjectMember) {
        throw new apiError(404,"project member not found")
    }
    ProjectMember = await projectMember.findByIdAndDelete(projectMember._id)
    if(!ProjectMember){
        throw new apiError(404, "project member not found")
    }
    return res.status(200).json(
        new apiResponse(200, ProjectMember, "project member deleted successfully")
    )
})

export {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjectMembers,
    addMemberToProject,
    deleteMember,
    updateMemberRole,
}