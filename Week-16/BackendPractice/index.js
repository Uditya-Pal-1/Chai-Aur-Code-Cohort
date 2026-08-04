import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
// import bcryptjs from 'bcryptjs'
// import jsonWebToken from 'jsonwebtoken';
// import nodemailer from 'nodemailer';


dotenv.config();

const app = express();
const port = process.env.PORT || 4000

app.use(cors());
app.use(express.json())
app.use(cookieParser());

app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) =>{
    res.send('Backend is running!')
})

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDB successfully")
    app.listen(port, ()=>{
        console.log(`Server is running on ${process.env.BASE_URL}`)
    })
}).catch((error)=>{
    console.error('MongoDB connection failed:',error.message)
})