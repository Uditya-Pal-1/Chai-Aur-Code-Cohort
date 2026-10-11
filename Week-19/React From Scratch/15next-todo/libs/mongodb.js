import mongoose from 'mongoose'

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = {conn: null, promise: null };
}

async function connectToDatabase() {
    const mongoUrl = process.env.MONGODB_URL;
    if(!mongoUrl) {
        throw new Error("Please define the MONGODB_URL environment variable inside .env file")
    }

    if(cached.conn) {
        return cached.conn;
    }
    
    if(!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(mongoUrl, opts).then((mongoose) => {
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    }catch(e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}

export default connectToDatabase;