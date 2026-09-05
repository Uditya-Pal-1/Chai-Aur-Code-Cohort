import {project} from '../models/project.models.js';
import { asyncHandler } from '../utils/async-handler.js';
import {apiError} from '../utils/api-error.js'
import {projectNote} from '../models/note.models.js'
import { apiResponse } from '../utils/api-response.js';

//get all notes
const getNotes = asyncHandler(async(req, res)=>{
const {projectId} = req.params;
const project = await Project.findById(projectId);
if(!project){
    throw new apiError(404, "project not found")
}
const notes = await projectNote.find({
    project: new mongoose.Types.ObjectId(projectId),
}).populate("createBy","username fullname avatar");
return res.status(200).json(new apiResponse(200, notes, "Notes fetched successfully"))
});

//get Notes by Id.
const getNotesById =asyncHandler( async(req, res)=>{
    const {noteId}= req.params;
    const note = await projectNote.findById(noteId).populate("createdBy","username fullname avatar",);
    if(!note){
        throw new apiError(404, "note not found")
    }
    return res.status(200).json(
        new apiResponse(200, note, "note fetched successfully")
    )
})

//create Notes
const createNotes =asyncHandler( async(req, res)=>{
    const {projectId} = req.params;
    const {content} = req.body;
    const project = await project.findById(projectId)
    if(!project){
        throw new apiError(404, "Project not found")
    }
    const note = await projectNote.create({
        project: new mongoose.Types.ObjectId(projectId),
        content,
        createdBy: new mongoose.Types.ObjectId(req.user._id),
    });
    const populatedNote = await projectNote.findById(note._id).populate("createdBy","username fullName avatar",);
    return res.status(201).json(new apiResponse(201, populatedNote, "created successfully"))
})

//update Notes
const updateNotes =asyncHandler( async(req, res)=>{
    const {noteId} = req.params;
    const {content} = req.body;
    const existingNote = await projectNote.findById(noteId);
    if(!existingNote){throw new apiError(404,"note not found")}
    const note = await projectNote.findByIdAndUpdate(
        noteId, {content}, {new: true},
    ).populate("createdBy", "username fullName avatar")
    return res.status(200).json(new apiError(200, note, "note update successfully"))
})

//delete Notes
const deleteNotes =asyncHandler( async(req, res)=>{
    const {noteId} = req.params;
    const note = await projectNote.findByIdAndDelete(noteId)
    if(!note){
        throw new apiError(404, 'note not found');
    }
    return res.status(200).json(new apiResponse(200, note, 'note deleted successfully'))
})

export {getNotes, getNotesById, createNotes, updateNotes, deleteNotes,};