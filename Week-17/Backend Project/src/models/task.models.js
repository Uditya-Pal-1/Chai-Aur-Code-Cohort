import mongoose, { Schema } from "mongoose";
const taskSchema = new Schema({});
export const Task = mongoose.model('Task',taskSchema);
