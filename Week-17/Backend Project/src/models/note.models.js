import mongoose, { Schema } from "mongoose";
const noteSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'project',
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const projectNote = mongoose.model('projectNote', noteSchema);