import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './utils/db.js';
import userRoutes from './routes/user.routes.js'


dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

app.use(
    cors({
        origin: process.env.BASE_URL,
        credentials: true,
        methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// const port = 3000; // also we use ports are - 4000, 5000, 5173, 8080, 8000 etc
// not to use are - 443, 80, 23 etc.

// user routes
app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Cohort !')
    // console.log(req)
    // console.log(res)
})

console.log(process.env.PORT)

// connect to db
db();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
