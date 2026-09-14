import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { addProblemToPlayList, createPlayList, deletePlayList, getPlayAllListDetails, getPlayListDetails, removeProblemFromPlaylist } from '../controllers/playlist.controller.js';

const playlistRoutes = express.Router();

playlistRoutes.post("/create-playlist", authMiddleware, createPlayList)
playlistRoutes.get("/", authMiddleware, getPlayAllListDetails)
playlistRoutes.get("/:playlistId", authMiddleware, getPlayListDetails)

playlistRoutes.post("/:playlistId/add-problem", authMiddleware, addProblemToPlayList)
playlistRoutes.delete("/playlistId", authMiddleware, deletePlayList)
playlistRoutes.delete("/:playListId/remove-problem", authMiddleware, removeProblemFromPlaylist)

export default playlistRoutes;