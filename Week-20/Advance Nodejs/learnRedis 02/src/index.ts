import express from 'express'
import axios from 'axios'
import { Redis } from 'ioredis'
import http from 'http';
import { Server } from 'socket.io'

const app = express()
const REDIS_PORT = Number(process.env.REDIS_PORT ?? 6379)

const redis = new Redis({ host: 'localhost', port: REDIS_PORT })
const publisher = new Redis({ host: 'localhost', port: REDIS_PORT })
const subscriber = new Redis({ host: 'localhost', port: REDIS_PORT })

const httpServer = http.createServer(app);
const io = new Server()
io.attach(httpServer);

const stateKey = 'state1';

redis.setnx(stateKey, JSON.stringify(new Array(100).fill(false)));

subscriber.subscribe('server:broker');
subscriber.on('message', (channel, message) => {
  const {event, data} = JSON.parse(message);

  io.emit(event, data);
})

io.on('connection', (socket) => {
  console.log('Socket Connected', socket.id)
  socket.on('message', (msg) => {
    io.emit('server-message', msg);
  });
  socket.on('checkbox-update', async (data) => {
    const state = await redis.get(stateKey);

    if(state) {
      const parsedState = JSON.parse(state);
      parsedState[data.index] = data.value;
      await redis.set(stateKey, JSON.stringify(parsedState));
    }

    await publisher.publish(
      'server:broker',
      JSON.stringify({event:'checkbox-update', data })
    );
  });
});
const PORT = process.env.PORT ?? 8000

// interface CacheStore {
//   totalPageCount: Number
// }
// const cacheStore: CacheStore = {
//   totalPageCount: 0,
// }

app.use(express.static('./public'))

app.use(async function (req, res, next){
  const key = 'rate-limit';
  const value = await redis.get(key);

  if(value === null) {
    await redis.set(key, 0);
    await redis.expire(key, 60);
  }
  if(Number(value) > 100) {
    return res.status(429).json({message:"Too Many Requests"});
  }
  await redis.incr(key);
  next();
});

app.get('/state', async (req, res) => {
  const state = await redis.get(stateKey)

  if(state) {
    const parsedState = JSON.parse(state);
    console.log({parsedState})
    return res.json({state: parsedState})
  }
  return res.json({state: []})
})

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
