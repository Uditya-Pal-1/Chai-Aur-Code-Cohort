import { Review } from '../models/Review.js'
import { getDbStatus } from '../utils/db.js'

export async function listReviews(req, res, next) {
  if (!getDbStatus().connected) return res.status(503).json({ success: false, message: 'Review service is offline until the API connects to MongoDB.' })
  try {
    const productId = typeof req.query.product === 'string' ? req.query.product.slice(0, 80) : 'atellixui'
    const data = await Review.find({ productId }).populate('author', 'name avatarUrl').sort({ createdAt: -1 }).limit(40).lean()
    return res.json({ success: true, data: data.map(({ author, rating, message, createdAt, _id }) => ({
      id: _id,
      name: author?.name ?? 'AtellixUI member',
      avatarUrl: author?.avatarUrl ?? '',
      rating,
      message,
      createdAt,
    })) })
  } catch (error) {
    return next(error)
  }
}

export async function createReview(req, res, next) {
  if (!getDbStatus().connected) return res.status(503).json({ success: false, message: 'Review service is offline until the API connects to MongoDB.' })
  try {
    const rating = Number(req.body.rating)
    const message = typeof req.body.message === 'string' ? req.body.message.trim() : ''
    const productId = typeof req.body.productId === 'string' ? req.body.productId.trim() : 'atellixui'
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return res.status(400).json({ success: false, message: 'Choose a rating from 1 to 5.' })
    if (message.length < 12 || message.length > 600) return res.status(400).json({ success: false, message: 'Review must be 12–600 characters.' })
    if (!productId || productId.length > 80) return res.status(400).json({ success: false, message: 'Choose a valid product.' })
    const review = await Review.create({ author: req.user._id, productId, rating, message })
    return res.status(201).json({ success: true, data: {
      id: review._id,
      name: req.user.name,
      avatarUrl: req.user.avatarUrl,
      rating,
      message,
      createdAt: review.createdAt,
    } })
  } catch (error) {
    return next(error)
  }
}
