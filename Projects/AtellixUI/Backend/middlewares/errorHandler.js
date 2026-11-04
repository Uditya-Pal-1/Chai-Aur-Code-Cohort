export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500)
  const isProd = process.env.NODE_ENV === 'production'

  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message)
  if (!isProd && err.stack) {
    console.error(err.stack)
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(isProd ? {} : { stack: err.stack }),
  })
}

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  })
}

