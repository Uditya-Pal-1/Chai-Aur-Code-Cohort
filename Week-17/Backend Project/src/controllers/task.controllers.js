import {asyncHandler} from "../utils/async-handler.js";
import {Project} from "../models/project.models.js";
import {subTask} from "../models/subtask.models.js";
import {apiError} from "../utils/api-error.js";
import {apiResponse} from "../utils/api-response.js";
import {Task} from "../models/task.models.js";
import mongoose from "mongoose";
import { UserRolesEnum } from "../constants/constants.js";
//get all tasks
const getTasks = asyncHandler( async(req, res) =>{
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if(!project){
        throw new apiError(404, "Project not found")
    }
    const tasks = await Task.find({
        project: new mongoose.Types.ObjectId(projectId),
    }).populate("assignedTo","username fullName avatar")
    return res.status(200).json(new apiResponse(200, tasks, "Tasks fetched successfully"))
});

//get task by id
const getTaskById = asyncHandler( async(req, res) =>{
    const {taskId} = req.params;
    const task = await Task.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(taskId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "assignedTo",
                foreignField: "_id",
                as: "assignedTo",
                pipeline: [
                    {
                        $project: {
                            _id: 1, 
                            username:1,
                            fullName:1,
                            avatar:1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: "subtasks",
                localField: "_id",
                foreignField: "task",
                as: "subtasks",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField:"createdBy",
                            foreignField:"_id",
                            as: "createdBy",
                            pipeline: [
                                {
                                    $project: {
                                        _id: 1,
                                        username: 1,
                                        fullName:1,
                                        avatar: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $addFields: {
                            createdBy: {
                                $arrayElemAt: ["$createdBy",0],
                            },
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                assignedTo: {
                    $arrayElemAt: ["$assignedTo",0],
                },
            },
        },
    ]);
    if(!task || task.length === 0) {
        throw new apiError(404, "task not found")
    }
    return res.status(200).json(new apiResponse(200, task[0],"task fetched successfully"))
});

//create Task
const createTask = asyncHandler( async(req, res) =>{
    const {title, description, assignedTo, status} = req.body;
    const {projectId} = req.params;
    const project = await Project.findById(projectId);
    if(!project){
        throw new apiError(404, "Project not found");
    }
    const files = req.files || [];
    const attachments = files.map((file)=>{
        return{
            url:`${process.env.SERVER_URL}/images/${file.originalname}`,
            mimeType: file.mimeType,
            size: file.size,
        };
    });
    const task = await Task.create({
        title,
        description,
        project: new mongoose.Types.ObjectId(projectId),
        assignedTo: assignedTo
        ? new mongoose.Types.ObjectId(assignedTo)
        : undefined,
        status,
        assignedBy: new mongoose.Types.ObjectId(req.user._id),
        attachments,
    });
    return res.status(201).json(new apiResponse(201, task, "Task created successfully"))
});

//update Task
const updateTask = asyncHandler( async(req, res) =>{
    const {taskId} = req.params;
    const {title, description, status, assignedTo} = req.body;
    console.log("update task request body:", req.body);
    const existingTask = await Task.findById(taskId);
    if(!existingTask){
        throw new apiError(404,"Task not found")
    }
    const existingAttachments = existingTask.attachments || [];
    const files = req.file || [];
    const newAttachments = files.map((file)=>{
        return {
            url: `${process.env.SERVER_URL}/images/${file.originalname}`,
            mimetype: file.mimetype,
            size: file.size,
        };
    });
    const allAttachments = [...existingAttachments, ...newAttachments];
    const updateFields = {
        attachments: allAttachments,
        assignedBy: new mongoose.Types.ObjectId(req.user._id),
    };
    if(title !== undefined) updateFields.title = title;
    if(description !== undefined) updateFields.description = description;
    if(status !== undefined) updateFields.status = status;
    if(assignedTo !== undefined){updateFields.assignedTo = assignedTo ? new mongoose.Types.ObjectId(assignedTo) : undefined}
    else if(existingTask.assignedTo){
        updateFields.assignedTo = existingTask.assignedTo;
    }
    console.log("update fields:", updateFields);
    const task = await Task.findByIdAndUpdate(taskId, updateFields,{
        new: true,
    }).populate("assignedTo", "username fullname avatar");
    console.log("updated task:", task);
    return res.status(200).json(new apiResponse(200, task,'task updated successfully'));
})

//delete Task from Project
const deleteTask = asyncHandler( async(req, res) =>{
    const {taskId} = req.params;
    const task = await Task.findByIdAndDelete(taskId)
})

//create Subtask in Tasks
const createSubTask = asyncHandler( async(req, res) =>{
    const {taskId} = req.params;
    const {title} = req.body;
    if(!title){
        throw new apiError(400,"Title is required")
    }
    const task = await Task.findById(taskId);
    if(!task){
        throw new apiError(404, "Task not found")
    }
    const SubTask = await subTask.create({
        title, task: new mongoose.Types.ObjectId(taskId),
        createdBy: new mongoose.Types.ObjectId(req.user._id),
    });
    return res.status(200).json(new apiResponse(201, SubTask,"sub task created successfully"));
});

//update the SubTasks
const updateSubTask = asyncHandler( async(req, res) =>{
    const {subTaskId} = req.params;
    const {title, isCompleted} = req.body;
    let SubTask = await subTask.findById(subTaskId);
    if(!SubTask){
        throw new apiError(404, "sub task not found")
    }
    SubTask = await subTask.findByIdAndUpdate(subTaskId,{
        title: [UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN].includes(req?.user?.role,
   )? title
   :undefined, 
   isCompleted,
    },{new: true}
);
return res.status(200).json(new apiResponse(200, SubTask, "subtask updated successfully"))
});

//delete SubTasks
const deleteSubTask = asyncHandler( async(req, res) =>{
    const {subTaskId} = req.params;
    const SubTask = await subTask.findByIdAndDelete(subTaskId);
    if(!SubTask){
        throw new apiError(404, "subtask not found")
    }
    return res.status(200).json(new apiResponse(200, SubTask, "subtask deleted successfully"))
})

export {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    createSubTask,
    updateSubTask,
    deleteSubTask,
}