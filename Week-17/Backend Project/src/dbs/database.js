import mongoose from 'mongoose'
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ mongoDB connected');
    }catch (err){
        console.error('❌ mongoDB connection error', err)
        process.exit(1); // Exit if connection fails
    }
}

export default connectDB;