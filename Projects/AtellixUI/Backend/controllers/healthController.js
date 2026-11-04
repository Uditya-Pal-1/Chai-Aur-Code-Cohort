import { getDbStatus } from '../utils/db.js'

export function getHealth(req, res) {
  const memory = process.memoryUsage()
  const uptime = process.uptime()

  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(uptime),
    memory: {
      rssMb: (memory.rss / (1024 * 1024)).toFixed(2),
      heapUsedMb: (memory.heapUsed / (1024 * 1024)).toFixed(2),
    },
    database: getDbStatus(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
  })
}

