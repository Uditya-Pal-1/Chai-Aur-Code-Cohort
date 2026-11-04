import mongoose from 'mongoose'
import { schemaOptions } from './schemaOptions.js'

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, schemaOptions)

playlistSchema.index({ userId: 1, name: 1 }, { unique: true })

export default mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema)
