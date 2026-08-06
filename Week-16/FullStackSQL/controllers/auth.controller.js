import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body

    if (!name || !email || !password || !phone) {
        console.log("Data is missing")
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        })
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exist with this email '
            })
        }
        //password hashing
        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = crypto.randomBytes(32).toString('hex')
        // create database
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                verificationToken

            }
        })
        //send mail by nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            }
        })

        const verificationURL = `${process.env.BASE_URL}/api/v1/users/verify/${verificationToken}`

       const mailOptions = {
            from: process.env.MAILTRAP_SENDEMAIL,
            to: user.email,
            subject: 'Verify your email address',
            text: `Welcome ${user.name}! Please click on the following link to verify your email account: \n\n${verificationUrl}`,
        };

        // Send mail
        await transporter.sendMail(mailOptions);

        // Final success response
        return res.status(201).json({
            success: true,
            message: 'User registered successfully. Please check your email to verify your account.',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'user unable to register.'
        })
    }
};

