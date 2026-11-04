/**
 * Simple in-memory rate limiter middleware
 * @param {Object} options
 * @param {number} options.windowMs Window size in ms (default: 15 min)
 * @param {number} options.max Max requests per window (default: 100)
 * @param {string} options.message Error message
 */
export function rateLimiter({ windowMs = 15 * 60 * 1000, max = 100, message = 'Too many requests, please try again later.' } = {}) {
  const requests = new Map()

  // Periodic cleanup
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of requests.entries()) {
      if (now > record.resetTime) {
        requests.delete(key)
      }
    }
  }, windowMs).unref?.()

  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown'
    const now = Date.now()

    let record = requests.get(ip)
    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime: now + windowMs }
      requests.set(ip, record)
    } else {
      record.count += 1
    }

    res.setHeader('X-RateLimit-Limit', max)
    res.setHeader('X-RateLimit-Remaining', Math.max(0, max - record.count))
    res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000))

    if (record.count > max) {
      return res.status(429).json({
        success: false,
        message,
        retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000),
      })
    }

    next()
  }
}

