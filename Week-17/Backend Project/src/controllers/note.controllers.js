import {Project} from '../models/project.models.js';

//get all notes
const getNotes = async(req, res)=>{
const {projectId} = req.params;
const project = await Project.findById(projectId)
}

//get Notes by Id.
const getNotesById = async(req, res)=>{
}

//create Notes
const createNotes = async(req, res)=>{
}

//update Notes
const updateNotes = async(req, res)=>{
}

//delete Notes
const deleteNotes = async(req, res)=>{
}

export {getNotes, getNotesById, createNotes, updateNotes, deleteNotes,};