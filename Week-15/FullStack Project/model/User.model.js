//                                         this is boiler plate .

// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema()

// const User = mongoose.model('User', userSchema)

// export default User;

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
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
    resetPasswordExpires: {
        type: Date,
    },

},
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});


const User = mongoose.model('User', userSchema);

export default User;