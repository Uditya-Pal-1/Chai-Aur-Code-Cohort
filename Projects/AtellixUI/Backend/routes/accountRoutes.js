import express from 'express'
import { currentUser, login, logout, register } from '../controllers/accountController.js'
import { requireAuth } from '../middlewares/requireAuth.js'
import { rateLimiter } from '../middlewares/rateLimiter.js'

const router = express.Router()
const authLimiter = rateLimiter({ windowMs: 15 * 60 * 1000, max: 10, message: 'Too many sign-in attempts. Try again later.' })

router.post('/register', authLimiter, register)
router.post('/login', authLimiter, login)
router.post('/logout', logout)
router.get('/me', requireAuth, currentUser)

export default router
