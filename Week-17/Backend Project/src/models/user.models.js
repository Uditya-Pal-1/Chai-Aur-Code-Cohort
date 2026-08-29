import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { type } from 'os';

const UserSchema = new Schema({
id: {
    type: String,
    required: true,
    unique: true,
},
avatar: {
    type: {
        url: String,
        localPath: String,
    },
    default: {
        url: `https://via.placeholder.com/200x200.png`,
        localPath: '',
    },
},
username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
},
email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
},
fullName: {
    type: String,
    trim: true,
},
password: {
    type: String,
    required: [true, 'password is required'],
},
isEmailVerified: {
    type: Boolean,
    default: false,
},
refreshToken: {
    type: String,
},
forgotPasswordToken: {
    type: String,
},
forgotPasswordExpiry: {
    type: Date,
},
emailVerificationToken: {
    type: String,
},
emailVerificationExpiry: {
    type: Date,
},
}, { timestamps: true });

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
UserSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password);
};
UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {_id: this._id,
        email: this.email,
        username: this.username,  
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        },
    );
};

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id, 
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY},
    );
};

// @description - method resposible for generating tokens from email, verification, password reset etc.

UserSchema.methods.generateTemporaryToken = function(){
    const unHashedToken = crypto.randomBytes(20).toString('hex')
    const hashedToken  = crypto
    .createHash('sha256')
    .update(unHashedToken)
    .digest('hex')
    const tokenExpiry = Date.now()+ (20*60*1000) //20 min timer;
    return {unHashedToken, hashedToken, tokenExpiry};
};

export const User = mongoose.model('User', UserSchema);