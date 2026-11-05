import express from 'express'
import { createReview, listReviews } from '../controllers/reviewController.js'
import { requireAuth } from '../middlewares/requireAuth.js'
import { rateLimiter } from '../middlewares/rateLimiter.js'

const router = express.Router()
const reviewLimiter = rateLimiter({ windowMs: 60 * 60 * 1000, max: 5, message: 'You have reached the review limit. Please try again later.' })

router.get('/', listReviews)
router.post('/', requireAuth, reviewLimiter, createReview)

export default router
