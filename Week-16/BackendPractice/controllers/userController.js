import User from "../models/User.model.js";
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: 'User already existed! '
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!'})
    }
        catch(error){
            res.status(500).json({
                message: "Error creating user", error: error.message
            });
        }
};
