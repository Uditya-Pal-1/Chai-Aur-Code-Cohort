import mongoose from "mongoose";
const noteSchema = new Schema({});
export const projectNote = mongoose.model('projectNote',noteSchema);