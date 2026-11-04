import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {
    addProblemToPlayList,
    createPlayList,
    deletePlayList,
    getPlayAllListDetails,
    getPlayListDetails,
    removeProblemFromPlayList
} from '../controllers/playlist.controller.js';

const playlistRoutes = express.Router();

playlistRoutes.post("/create-playlist", authMiddleware, createPlayList)
playlistRoutes.get("/", authMiddleware, getPlayAllListDetails)
playlistRoutes.get("/:playListId", authMiddleware, getPlayListDetails)

playlistRoutes.post("/:playListId/add-problem", authMiddleware, addProblemToPlayList)
playlistRoutes.delete("/:playListId", authMiddleware, deletePlayList)
playlistRoutes.delete("/:playListId/remove-problem", authMiddleware, removeProblemFromPlayList)

export default playlistRoutes;