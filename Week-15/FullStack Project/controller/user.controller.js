import User from '../model/User.model.js';
import crypto from 'crypto';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const registerUser = async (req, res) => {

    // get data
    // validate
    // check if user already exists
    // create a user in database 
    // create verification token
    // save token in database
    // send token as email to user
    // send succcess status to user

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required",

        });
    }
    // return res.status(200).json({
    //     message: "Registration successful so far!",
    //     receivedData: { name, email, password }
    // })


    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        console.log(existingUser)

        const newUser = await User.create({
            name,
            email,
            password
        })
        console.log(newUser)

        if (!newUser) {
            return res.status(400).json({
                message: "User not registered"
            });
        }

        const token = crypto.randomBytes(32).toString('hex')
        console.log(token)
        newUser.verificationToken = token

        await newUser.save();

        // send email
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        const mailOption = {
            from: process.env.MAILTRAP_SENDEREMAIL,
            to: newUser.email,
            subject: 'Verify your email',
            text: `Please click on the following link : ${process.env.BASE_URL}/api/v1/users/verify/${token} `,
        }

        await transporter.sendMail(mailOption)
        res.status(201).json({
            message: "User registered successfully",
            success: true,
        });

    } catch (error) {
        res.status(400).json({
            message: "User not registered",
            error: error.message,
            success: false,
        })
    }
};

const verifyUser = async (req, res) => {
    // get token from url
    // validate token
    // find user based on token
    // if not
    // set isVerified field true
    // remove verification token
    // save
    // return response

    const { token } = req.params;
    console.log(token)
    if (!token) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }
    const newUser = await User.findOne({ verificationToken: token })

    if (!newUser) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }
    newUser.isVerified = true;
    newUser.verificationToken = undefined;
    await newUser.save();
}

const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    try{
        const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({
                    message: "Invalid Email or Password"
                })
            }
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(isMatch);

            if(!isMatch){
                return res.status(400).json({
                    message: "Invalid email or password"
                })
            }
            if(!user.isVerified){
                return res.status(401).json({
                    message: "Please verify your email before logging in."
                })
            }
            const token = jwt.sign({id: user._id, role: user.role},
                process.env.JWT_SECRET, {
                    expiresIn: '24h'
                }
            );
            const cookieOptions = {
                httpOnly: true,
                secure: true,
                maxAge: 24*60*60*1000
            }
            res.cookie('test', token, cookieOptions)
            res.status(200).json({
                success: true,
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    role: user.role
                }
            })
    } catch (error) {
        res.status(400).json({
            message: "Error during login",
            error: error.message
        })
    }
}

export { registerUser, verifyUser, login }