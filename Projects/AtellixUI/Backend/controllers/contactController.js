import { Inquiry } from '../models/Inquiry.js'
import { getDbStatus } from '../utils/db.js'

// In-memory fallback if MongoDB is not connected
const memoryInquiries = []

export async function submitContact(req, res, next) {
  try {
    const { name, email, project, projectType, message } = req.body

    const cleanName = (name || '').trim()
    const cleanEmail = (email || '').trim().toLowerCase()
    const selectedType = project || projectType || 'Product design'
    const cleanMessage = (message || '').trim()

    // Validation
    const errors = []
    if (!cleanName || cleanName.length < 2) errors.push('Name must be at least 2 characters.')
    if (!cleanEmail || !/^\S+@\S+\.\S+$/.test(cleanEmail)) errors.push('A valid email address is required.')
    if (!cleanMessage || cleanMessage.length < 10) errors.push('Message must be at least 10 characters long.')

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      })
    }

    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress

    let record = null
    const dbStatus = getDbStatus()

    if (dbStatus.connected) {
      record = await Inquiry.create({
        name: cleanName,
        email: cleanEmail,
        projectType: selectedType,
        message: cleanMessage,
        ipAddress,
      })
    } else {
      record = {
        _id: `mem_${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        projectType: selectedType,
        message: cleanMessage,
        ipAddress,
        createdAt: new Date().toISOString(),
        mode: 'in-memory-fallback',
      }
      memoryInquiries.push(record)
      // Keep max 100 in memory
      if (memoryInquiries.length > 100) memoryInquiries.shift()
    }

    return res.status(201).json({
      success: true,
      message: 'Inquiry received successfully. Thank you for reaching out!',
      data: {
        id: record._id,
        name: cleanName,
        email: cleanEmail,
        projectType: selectedType,
        createdAt: record.createdAt,
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function listInquiries(req, res, next) {
  try {
    const dbStatus = getDbStatus()
    if (dbStatus.connected) {
      const items = await Inquiry.find().sort({ createdAt: -1 }).limit(50)
      return res.status(200).json({ success: true, count: items.length, data: items })
    }

    return res.status(200).json({
      success: true,
      count: memoryInquiries.length,
      mode: 'in-memory',
      data: memoryInquiries,
    })
  } catch (error) {
    next(error)
  }
}

