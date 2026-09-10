import bcrypt from 'bcryptjs'
import { db } from '../libs/db.js'
import { UserRole } from '../generated/prisma/index.js'
import jwt from 'jsonwebtoken'

const register = async(req, res)=>{
    console.log("Incoming Request Body:", req.body);
    const {email, password, name} = req.body || {};
    try{
        if(!email || !password){
            return res.status(400).json({
                error: "Email and password are required"
            });
        }
        const existingUser = await db.user.findUnique({
            where:{
                email
            }
        })
        if(existingUser){
            return res.status(400).json({
                error: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: UserRole.USER,
            }
        })
        const token = jwt.sign({id: newUser.id},
            process.env.JWT_SECRET, {expiresIn: "7d"}
        )
        res.cookie('jwt',token,{
            httpOnly:true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 1000*60*60*24*7
        })
        res.status(201).json({
            success: true,
            message: "user created successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                image: newUser.image,
            }
        })
    }catch(error){
        console.error("Error Creating User:", error);
        res.status(500).json({
            error: "Error Creating User"
        })
    }
};

const login = async(req, res)=>{
   const {email, password} = req.body;
   try{
    const user = await db.user.findUnique({
        where: {
            email
        }
    })
    if(!user){
        return res.status(401).json({
            error:"User not Found"
        })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({
            error:"Invalid Credentials"
        })
    }
    const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.cookie('jwt',token,{
        httpOnly: true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== 'development',
        maxAge: 1000*60*60*24*7
    })
    res.status(200).json({
        success: true,
        message:"User loggedIn Successfully",
        user:{
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image
        }
    })
   }catch(error){
    console.error("Error LoggingIn User:",error);
    res.status(500).json({
        error: "Error Logging in User"
    })
   }
};

const logout = async(req, res)=>{
    try{
        res.clearCookie("jwt",{
            httpOnly: true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== 'development',
        })
        res.status(200).json({
            success: true,
            message: "User Logged Out"
        })
    }catch(error){
        console.error("Error logging out user:",error);
        res.status(500).json({
            error:"error in logging out user."
        })
    }
};

const check = async(req, res)=>{
    try{
        res.status(200).json({
            success: true,
            message: "User Authenticated Successfully",
            user: req.user
        });
    }catch(error){
        console.error("Error Checking User:", error);
        res.status(500).json({
            error:"Error Checking User"
        })
    }
};

export {register, login, logout, check};