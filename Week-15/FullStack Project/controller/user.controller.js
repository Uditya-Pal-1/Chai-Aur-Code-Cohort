import User from '../model/User.model.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

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
            error,
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
    const newUser = User.findOne({ verificationToken: token })

    if (!newUser) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }
}


export { registerUser, verifyUser }