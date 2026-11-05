import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import { getDbStatus } from '../utils/db.js'

const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, avatarUrl: user.avatarUrl })
const cookieOptions = () => ({
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
})

function issueSession(user, res) {
  if (!process.env.JWT_SECRET) throw Object.assign(new Error('Account sign-in is not configured on this server.'), { statusCode: 503 })
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.cookie('atellix_session', token, cookieOptions())
  return publicUser(user)
}

function requireDatabase(res) {
  if (!process.env.JWT_SECRET) {
    res.status(503).json({ success: false, message: 'Account sign-in is not configured on this server.' })
    return true
  }
  if (getDbStatus().connected) return false
  res.status(503).json({ success: false, message: 'Account service is offline until the API connects to MongoDB.' })
  return true
}

export async function register(req, res, next) {
  if (requireDatabase(res)) return
  try {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : ''
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    const password = typeof req.body.password === 'string' ? req.body.password : ''
    const avatarUrl = typeof req.body.avatarUrl === 'string' ? req.body.avatarUrl.trim() : ''
    if (name.length < 2 || name.length > 80) return res.status(400).json({ success: false, message: 'Name must be 2–80 characters.' })
    if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) return res.status(400).json({ success: false, message: 'Enter a valid email address.' })
    if (password.length < 10 || password.length > 128) return res.status(400).json({ success: false, message: 'Password must be 10–128 characters.' })
    if (avatarUrl && (!/^https:\/\//i.test(avatarUrl) || avatarUrl.length > 500)) return res.status(400).json({ success: false, message: 'Profile photo must be an HTTPS URL under 500 characters.' })
    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email, passwordHash, avatarUrl })
    return res.status(201).json({ success: true, user: issueSession(user, res) })
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ success: false, message: 'An account with this email already exists.' })
    return next(error)
  }
}

export async function login(req, res, next) {
  if (requireDatabase(res)) return
  try {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    const password = typeof req.body.password === 'string' ? req.body.password : ''
    const user = await User.findOne({ email }).select('+passwordHash')
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ success: false, message: 'Email or password is incorrect.' })
    }
    return res.json({ success: true, user: issueSession(user, res) })
  } catch (error) {
    return next(error)
  }
}

export function logout(_req, res) {
  res.clearCookie('atellix_session', { ...cookieOptions(), maxAge: undefined })
  return res.json({ success: true })
}

export function currentUser(req, res) {
  return res.json({ success: true, user: publicUser(req.user) })
}
