import { prismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs';
import crypto from 'crypto'
const prisma = new prismaClient();

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
                message: 'All fields are required'
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
        //mail by nodemailer


    } catch (error) {

    }
};

