import mongoose, { Schema } from 'mongoose'
const UserSchema = new Schema({});
export const User = mongoose.model('User',UserSchema);