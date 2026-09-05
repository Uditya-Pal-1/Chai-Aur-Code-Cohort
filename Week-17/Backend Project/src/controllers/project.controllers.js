import { asyncHandler } from "../utils/async-handler"

//get all Project
const getProjects = asyncHandler( async(req, res) =>{

})

//get project by Id
const getProjectById = asyncHandler( async(req, res) =>{
})

//create project
const createProject = asyncHandler( async(req, res) =>{
})

//update project
const updateProject = asyncHandler( async(req, res) =>{
})

//delete project
const deleteProject = asyncHandler( async(req, res) =>{
})

//get project members
const getProjectMembers = asyncHandler( async(req, res) =>{
})

//add members to project
const addMemberToProject = asyncHandler( async(req, res) =>{
})

//delete members from project
const deleteMember = asyncHandler( async(req, res) =>{
})

//update member role
const updateMemberRole = asyncHandler( async(req, res) =>{
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