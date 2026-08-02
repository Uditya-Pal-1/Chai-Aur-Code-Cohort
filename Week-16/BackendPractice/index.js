import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000

app.use(cors());
app.use(express.json())

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