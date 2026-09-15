import dotenv from 'dotenv'
import express from 'express'
import authRoutes from './routes/auth.routes.js'
import CookieParser from 'cookie-parser'
import problemRoutes from './routes/problem.routes.js';
import executionRoute from "./routes/executeCode.routes.js"
import submissionRoutes from './routes/submission.routes.js'
import playlistRoutes from './routes/playlist.routes.js'
dotenv.config();

const app = express();

app.use(express.json());
app.use(CookieParser());

app.get("/",(req,res)=>{
    res.send("Hello guys welcome to leetLab 🔥")
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/execute-code', executionRoute)
app.use('/api/v1/playlist', playlistRoutes)
app.use('/api/v1/problems', problemRoutes);
app.use('/api/v1/submission', submissionRoutes)

app.listen(process.env.PORT, ()=>{
    console.log('Server is running on Port 8080')
})