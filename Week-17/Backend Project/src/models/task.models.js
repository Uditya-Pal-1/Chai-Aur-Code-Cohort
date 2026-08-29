import mongoose, { Schema } from "mongoose";
import { AvailableTaskStatuses, TaskStatusEnum } from '../constants/constants.js';
const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "AssignedTo ref is required"],
    },
    assignedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: AvailableTaskStatuses,
        default: TaskStatusEnum.TODO
    },
    attachments: {
        type: [
            {
                url: String,
                mimeType: String,
                size: Number,
                FileName: String,
            }
        ],
        default: []
    },
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);
