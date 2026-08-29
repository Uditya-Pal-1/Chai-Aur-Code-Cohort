import mongoose, { Schema } from "mongoose";
const projectMemberSchema = new Schema({});
export const projectMember = mongoose.model('projectMember', projectMemberSchema);