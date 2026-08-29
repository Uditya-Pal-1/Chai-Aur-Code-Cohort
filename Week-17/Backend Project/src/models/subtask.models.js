import mongoose from "mongoose";
const subTaskSchema = new Schema({});
export const subTask = mongoose.model('subTask',subTaskSchema);
