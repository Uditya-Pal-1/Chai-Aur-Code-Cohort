import dotenv from 'dotenv'
import express from 'express'
import authRoutes from './routes/auth.routes.js'
import CookieParser from 'cookie-parser'
import problemRoutes from './routes/problem.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(CookieParser());

app.get("/",(req,res)=>{
    res.send("Hello guys welcome to leetLab 🔥")
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/problems', problemRoutes);

app.listen(process.env.PORT, ()=>{
    console.log('Server is running on Port 8080')
})