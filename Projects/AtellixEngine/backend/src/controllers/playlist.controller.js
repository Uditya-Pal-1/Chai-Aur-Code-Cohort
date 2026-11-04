import { isValidObjectId } from "mongoose";
import Playlist from "../models/Playlist.js";
import Problem from "../models/Problem.js";
import ProblemInPlaylist from "../models/ProblemInPlaylist.js";

const entryFields = "playListId problemId createdAt updatedAt";
const problemFields = "title difficulty tags";
const validId = (id) => typeof id === "string" && isValidObjectId(id);

const attachProblems = async (playlists) => {
  const ids = playlists.map(({ _id }) => _id);
  const entries = await ProblemInPlaylist.find({ playListId: { $in: ids } })
    .select(entryFields)
    .populate("problemId", problemFields);
  const byPlaylist = new Map(ids.map((id) => [String(id), []]));

  for (const entry of entries) {
    byPlaylist.get(String(entry.playListId))?.push({
      id: entry.id,
      playListId: String(entry.playListId),
      problemId: entry.problemId?.id ?? String(entry.problemId),
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
      problem: entry.problemId,
    });
  }
  return playlists.map((playlist) => ({
    ...playlist.toJSON(),
    problems: byPlaylist.get(String(playlist._id)) ?? [],
  }));
};

const handleError = (res, error, message) => {
  if (error.code === 11000)
    return res
      .status(409)
      .json({ error: "A playlist with this name already exists" });
  if (error.name === "CastError")
    return res.status(400).json({ error: "Invalid resource ID" });
  if (error.name === "ValidationError")
    return res.status(400).json({ error: "Invalid playlist details" });
  console.error(message, error);
  return res.status(500).json({ error: message });
};

export const createPlayList = async (req, res) => {
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const description = req.body?.description;
  if (!name || (description != null && typeof description !== "string")) {
    return res
      .status(400)
      .json({ error: "A playlist name and valid description are required" });
  }
  try {
    const playList = await Playlist.create({
      name,
      description,
      userId: req.user.id,
    });
    return res.status(201).json({
      success: true,
      message: "Playlist created successfully",
      playList: { ...playList.toJSON(), problems: [] },
    });
  } catch (error) {
    return handleError(res, error, "Unable to create playlist");
  }
};

export const getPlayAllListDetails = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    return res.json({
      success: true,
      message: "Playlists fetched successfully",
      playLists: await attachProblems(playlists),
    });
  } catch (error) {
    return handleError(res, error, "Unable to fetch playlists");
  }
};

export const getPlayListDetails = async (req, res) => {
  const { playListId } = req.params;
  if (!validId(playListId))
    return res.status(400).json({ error: "Invalid playlist ID" });
  try {
    const playList = await Playlist.findOne({
      _id: playListId,
      userId: req.user.id,
    });
    if (!playList) return res.status(404).json({ error: "Playlist not found" });
    const [result] = await attachProblems([playList]);
    return res.json({
      success: true,
      message: "Playlist fetched successfully",
      playList: result,
    });
  } catch (error) {
    return handleError(res, error, "Unable to fetch playlist");
  }
};

export const addProblemToPlayList = async (req, res) => {
  const { playListId } = req.params;
  const submittedIds = req.body?.problemIds;
  if (
    !validId(playListId) ||
    !Array.isArray(submittedIds) ||
    !submittedIds.length ||
    submittedIds.some((id) => !validId(id))
  ) {
    return res
      .status(400)
      .json({ error: "A valid playlist ID and problem IDs are required" });
  }
  const problemIds = [...new Set(submittedIds)];
  try {
    const playlist = await Playlist.findOne({
      _id: playListId,
      userId: req.user.id,
    }).select("_id");
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    const problemCount = await Problem.countDocuments({
      _id: { $in: problemIds },
    });
    if (problemCount !== problemIds.length)
      return res
        .status(404)
        .json({ error: "One or more problems were not found" });

    await ProblemInPlaylist.bulkWrite(
      problemIds.map((problemId) => ({
        updateOne: {
          filter: { playListId, problemId },
          update: { $setOnInsert: { playListId, problemId } },
          upsert: true,
        },
      })),
      { ordered: false },
    );
    return res.status(201).json({
      success: true,
      message: "Problems added to playlist successfully",
    });
  } catch (error) {
    if (
      error.code === 11000 ||
      error.writeErrors?.every(({ code }) => code === 11000)
    ) {
      return res.status(201).json({
        success: true,
        message: "Problems added to playlist successfully",
      });
    }
    return handleError(res, error, "Unable to add problems to playlist");
  }
};

export const deletePlayList = async (req, res) => {
  const { playListId } = req.params;
  if (!validId(playListId))
    return res.status(400).json({ error: "Invalid playlist ID" });
  try {
    const playlist = await Playlist.findOne({
      _id: playListId,
      userId: req.user.id,
    });
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    await ProblemInPlaylist.deleteMany({ playListId });
    await Playlist.deleteOne({ _id: playlist._id });
    return res.json({
      success: true,
      message: "Playlist deleted successfully",
    });
  } catch (error) {
    return handleError(res, error, "Unable to delete playlist");
  }
};

export const removeProblemFromPlayList = async (req, res) => {
  const { playListId } = req.params;
  const problemIds = req.body?.problemIds ?? [];
  if (
    !validId(playListId) ||
    !Array.isArray(problemIds) ||
    !problemIds.length ||
    problemIds.some((id) => !validId(id))
  ) {
    return res
      .status(400)
      .json({ error: "A valid playlist ID and problem IDs are required" });
  }
  try {
    const playlist = await Playlist.findOne({
      _id: playListId,
      userId: req.user.id,
    }).select("_id");
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    const result = await ProblemInPlaylist.deleteMany({
      playListId,
      problemId: { $in: problemIds },
    });
    return res.json({
      success: true,
      message: "Problems removed from playlist successfully",
      removedCount: result.deletedCount,
    });
  } catch (error) {
    return handleError(res, error, "Unable to remove problems from playlist");
  }
};
