import mongoose, { Schema } from "mongoose";
const projectMemberSchema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    role: {
        type: String,
        enum: AvailableUserRole,
        default: UserRolesEnum.MEMBER,
    },
}, { timestamps: true });

export const projectMember = mongoose.model('projectMember', projectMemberSchema);