import { MongoClient } from 'mongodb'

const globalMongo = globalThis

export async function getDatabase() {
  const uri = process.env.MONGODB_URI
  const databaseName = process.env.MONGODB_DB

  if (!uri || !databaseName) {
    throw new Error('MONGODB_URI and MONGODB_DB must be configured.')
  }

  if (!globalMongo.mongoClientPromise) {
    globalMongo.mongoClientPromise = new MongoClient(uri).connect()
  }

  try {
    return (await globalMongo.mongoClientPromise).db(databaseName)
  } catch (error) {
    globalMongo.mongoClientPromise = undefined
    throw error
  }
}
