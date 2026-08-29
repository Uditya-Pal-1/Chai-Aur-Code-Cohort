import mongoose from "mongoose";
const projectSchema = new Schema({});
export const project = mongoose.model('project',projectSchema);