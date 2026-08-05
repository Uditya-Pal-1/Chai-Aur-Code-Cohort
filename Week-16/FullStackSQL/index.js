import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'

// custom route
import userRouter from './routes/auth.router.js';

dotenv.config();
const port = process.env.PORT || 4000
const app = express();

app.use(cookieParser)
app.use(cors({
    origin: process.env.BASE_URL,
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) =>{
    res.status(200).json({
        success: true, 
        message: 'test checked'
    })
})

app.use('/api/v1/users', userRouter)

const app = express();
app.listen(port,()=>{
    console.log(`Backend listning at port:,${port}`)
})