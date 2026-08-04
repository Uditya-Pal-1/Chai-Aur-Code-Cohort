import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role:{
            type: String,
            enum:  ['user','admin'],
            default: 'user'
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationToken: {
            type: String,
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpire: {
            type: Date,
        }
    },
    { timestamps: true}
);

userSchema.pre('save', async function () {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const User = mongoose.model('User', userSchema);

export default User;