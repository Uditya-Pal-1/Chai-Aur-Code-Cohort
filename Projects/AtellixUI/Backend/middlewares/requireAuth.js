import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export async function requireAuth(req, res, next) {
  const token = req.cookies?.atellix_session
  const secret = process.env.JWT_SECRET
  if (!token || !secret) return res.status(401).json({ success: false, message: 'Sign in to continue.' })

  try {
    const { userId } = jwt.verify(token, secret)
    const user = await User.findById(userId).select('name email avatarUrl')
    if (!user) return res.status(401).json({ success: false, message: 'Your session has expired. Sign in again.' })
    req.user = user
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Your session has expired. Sign in again.' })
  }
}
