import app from './app.js';
import dotenv from 'dotenv'
import connectDB from './dbs/database.js'


dotenv.config({
    path:"./.env",
});
const PORT = process.env.PORT || 8000

connectDB()
.then(()=>{
    app.on('error',(err) =>{
        console.log('server encounted an error: ', err)
    })
    app.listen(PORT,()=>{console.log(`🚀 Server running successfully on PORT: ${PORT} `)})
})
.catch((err)=>{
    console.error("mongoDB connection error: ", err)
    process.exit(1);
})