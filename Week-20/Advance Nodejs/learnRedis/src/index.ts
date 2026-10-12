import express from 'express'
import axios from 'axios'
import { Redis } from 'ioredis'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()

const httpServer = createServer(app)
const io = new Server(httpServer)

io.on('connection', (socket) => {
  console.log('Socket Connected', socket.id)
  socket.emit('hello')
  socket.emit('hello ji')
  socket.emit('hello bro')
})
const PORT = process.env.PORT ?? 8000

// interface CacheStore {
//   totalPageCount: Number
// }
// const cacheStore: CacheStore = {
//   totalPageCount: 0,
// }

const redis = new Redis({ host: 'localhost', port: Number(6379) })

app.use(express.static('./public'))

app.get('/', (req, res) => {
  return res.json({ status: 'success' })
})

app.get('/books', async (req, res) => {
  const response = await axios.get('https://api.freeapi.app/api/v1/public/books')
  return res.json(response.data)
})

app.get('/books/total', async (req, res) => {
  const cachedValue = await redis.get('totalPageValue')

  if (cachedValue) {
    console.log(`Cache Hit`)
    return res.json({ totalPageCount: Number(cachedValue) })
  }

  const response = await axios.get('https://api.freeapi.app/api/v1/public/books')

  const totalPageCount = response?.data?.data?.data?.reduce(
    (acc: number, curr: { volumeInfo?: { pageCount?: number } }) =>
      !curr.volumeInfo?.pageCount ? 0 : curr.volumeInfo?.pageCount + acc,
    0,
  )
  // cacheStore.totalPageCount = Number(totalPageCount)

  await redis.set('totalPageValue', totalPageCount)

  console.log('Cache Miss')
  return res.json({ totalPageCount })
})

httpServer.listen(PORT, () => console.log(`Server is running at port: ${PORT}`))
