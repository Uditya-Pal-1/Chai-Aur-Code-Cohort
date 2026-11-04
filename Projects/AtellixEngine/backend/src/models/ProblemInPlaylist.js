import mongoose from "mongoose";
import { schemaOptions } from "./schemaOptions.js";

const problemInPlaylistSchema = new mongoose.Schema(
  {
    playListId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
  },
  schemaOptions,
);

problemInPlaylistSchema.index(
  { playListId: 1, problemId: 1 },
  { unique: true },
);

export default mongoose.models.ProblemInPlaylist ||
  mongoose.model("ProblemInPlaylist", problemInPlaylistSchema);
