import express from 'express'
import { submitContact, listInquiries } from '../controllers/contactController.js'
import { rateLimiter } from '../middlewares/rateLimiter.js'

const router = express.Router()

// Stricter rate limit on contact submission (15 requests per 15 minutes per IP)
const contactLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: 'Too many contact inquiries submitted. Please try again later.',
})

router.post('/', contactLimiter, submitContact)
router.get('/', listInquiries)

export default router

