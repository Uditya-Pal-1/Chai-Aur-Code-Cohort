import mongoose from 'mongoose'

let isConnected = false

export async function connectDB() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    console.warn('[DB] MONGODB_URI not configured. Operating in disconnected/offline mode.')
    return false
  }

  if (isConnected) {
    return true
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 5000,
    })

    isConnected = conn.connection.readyState === 1
    console.log(`[DB] Connected to MongoDB: ${conn.connection.host}`)

    mongoose.connection.on('error', (err) => {
      console.error('[DB] Connection error:', err.message)
      isConnected = false
    })

    mongoose.connection.on('disconnected', () => {
      console.warn('[DB] Disconnected from MongoDB')
      isConnected = false
    })

    return true
  } catch (error) {
    console.warn(`[DB] MongoDB connection failed (${error.message}). Continuing in fallback mode.`)
    isConnected = false
    return false
  }
}

export function getDbStatus() {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  }
  return {
    connected: isConnected,
    state: states[mongoose.connection.readyState] || 'unknown',
    host: mongoose.connection.host || null,
  }
}

