import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { connectDB } from './utils/db.js'
import { securityHeaders } from './middlewares/security.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'
import healthRoutes from './routes/healthRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import registryRoutes from './routes/registryRoutes.js'
import accountRoutes from './routes/accountRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import { getComponent } from './controllers/registryController.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Allowed CORS origins
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true)
      }
      return callback(new Error('Blocked by CORS policy.'))
    },
    credentials: true,
  })
)

// Standard Middlewares
app.use(securityHeaders)
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))
app.use(cookieParser())

// Root Info Route
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'AtellixUI API Server',
    status: 'online',
    version: '1.0.0',
    documentation: 'https://github.com/Uditya-Pal-1/AtellixUI',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      registry: '/api/registry',
      accounts: '/api/account',
      reviews: '/api/reviews',
      cliRegistry: '/r/:component.json',
    },
  })
})

// PRD v2.1 CLI Distribution route: npx atellix add <component> -> GET /r/:name.json
app.get('/r/:name', getComponent)

// API Routes
app.use('/api/health', healthRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/registry', registryRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/reviews', reviewRoutes)

// 404 & Global Error Handlers
app.use(notFoundHandler)
app.use(errorHandler)

// Connect DB asynchronously without blocking server start
let server = app.listen(PORT, () => {
  console.log(`[AtellixUI API] Running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`)
})

connectDB().catch((err) => {
  console.warn('[DB Error]', err.message)
})

// Graceful Shutdown
function gracefulShutdown(signal) {
  console.log(`\n[Server] Received ${signal}. Closing HTTP server and connections gracefully...`)
  if (server) {
    server.close(() => {
      console.log('[Server] HTTP server closed.')
      process.exit(0)
    })
  } else {
    process.exit(0)
  }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

export default app
