import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: String, default: 'atellixui', trim: true, maxlength: 80 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  message: { type: String, required: true, trim: true, minlength: 12, maxlength: 600 },
}, { timestamps: true })

export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema)
