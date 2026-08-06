import User from "../models/User.model.js";
import crypto from 'crypto'
import mongoose from "mongoose";
import nodemailer from "nodemailer"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: 'User already existed! '
            })
        }

        const token = crypto.randomBytes(20).toString('hex');

        const newUser = new User({ name, email, password });
        newUser.verificationToken = token

        await newUser.save();

        if (!newUser) {
            return res.status(400).json({
                message: "User not registered"
            })
        }
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        })
        const mailOption = {
            from: process.env.MAILTRAP_SENDEMAIL,
            to: newUser.email,
            subject: 'verify your email',
            text: `please click on the following link: ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
        }

        await transporter.sendMail(mailOption)
        res.status(201).json({
            message: "User registered successfully",
            success: true,
        })
    }
    catch (error) {
        res.status(400).json({
            message: "Error creating user", error: error.message
        });
    }
};

const verifyUser = async (req, res) => {
    const { token } = req.params;
    console.log(token)
    if (!token) {
        return res.status(400).json({
            message: 'Invalid Token'
        })
    }
    const newUser = await User.findOne({ verificationToken: token })
    if (!newUser) {
        return res.status(400).json({
            message: "Invalid token"
        })
    }
    newUser.isVerified = true;
    newUser.verificationToken = undefined;
    await newUser.save();
    return res.status(200).json({
        success: true,
        message: 'Email successfully verified. Your can now log in.'
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: " All Fields are Required"
        })

    }
    try {
        const user = await User.findOne({ email })
        console.log("Database user found:", user);
        if (!user) {
            return res.status(400).json({
                message: 'Invalid Email or Password'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        if (!user.isVerified) {
            return res.status(401).json({
                message: "Please verify your email befor logging in."
            })
        }
        const token = jwt.sign({ id: user._id, role: user.role },
            process.env.JWT_SECRET, {
            expiresIn: '24h'
        }
        )
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'Production',
            maxAge: 24 * 60 * 60 * 1000
        }
        res.cookie('token', token, cookieOptions)
        res.status(200).json({
            success: true,
            message: 'login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        })
    }
    catch (error) {
        res.status(400).json({
            message: 'Error during login',
            error: error.message
        })
    }
}

const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'user not found'
            })
        }
        console.log('reached at profile level')
        res.status(201).json({
            success: true,
            message: "Welcome to your protected profile ",
            user,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Server Error",
        })
    }
}
const logOutUser = async (req, res) => {
    try {
        res.cookie('token', "", {
            httpOnly: true,
            expiresIn: new Date(0)
        });
        return res.status(201).json({
            success: true, message: "Logged out successfully "
        })

    } catch (error) {
        return res.status(400).json({
            message: 'error found in sever to logOut.'
        })
    }
}
const forgotPassword = async (req, res) => {
    try {
        // get email // req.body se lena hai
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }
        // find user based on email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found with this email." })
        }
        //generate token
        const resetToken = crypto.randomBytes(20).toString('hex')
        // reset token + reset expiry => Date.now() + 10 * 60 * 1000
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
        await user.save();
        // save mail => url designing
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD
            }

        })
        // generate token then send to database and user then verify it.

        const resetUrl = `${process.env.BASE_URL}/api/v1/users/reset/${resetToken}`;
        const mailOption = {
            from: process.env.MAILTRAP_SENDEMAIL,
            to: user.email,
            subject: 'password reset request',
            text: `you requested to reset password. please click on the following links`
        }
        await transporter.sendMail({ mailOption })
        return res.status(200).json({
            message: 'password reset link sent successfully.',
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "error send reset email",
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        // collect token from params
        // password from request body
        // find user
        const { token } = req.params
        const { password } = req.body

        if (!password) {
            return res.status(400).json({ error: 'new password required' })
        }


        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }

        })

        if(!user){
            return res.status(400).json({
                message: "Password reset token is invalid or has expired."
            })
        }

        // hash new password
        const salt = await bcrypt.getSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // set password in user
        user.password = hashedPassword;

        // reset token , reset expiry => reset
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        // save
        await user.save();
        return res.status(200).json({
            message: 'password has been successfully reset.'
        })

    } catch (error) {
        return res.status(400).json({
            message: "error resetting password",
            error: error.message
        })
    }
}

export { registerUser, verifyUser, login, profile, logOutUser, forgotPassword, resetPassword };