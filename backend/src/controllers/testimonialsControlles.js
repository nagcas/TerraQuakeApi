import mongoose from 'mongoose'
import Testimonial from '../models/testimonialModels.js'

/**
 * NOTE: Controller: Create a new testimonial.
 */
export const createTestimonial = ({ Testimonial, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const { userId, name, avatar, email, role, message } = req.body
      const testimonial = new Testimonial({ userId, name, avatar, email, role, message })

      const newTestimonial = await testimonial.save()

      res.json(
        buildResponse(req, 'Testimonials retrieved successfully', newTestimonial, null, {})
      )
    } catch (error) {
      console.error('Error in create testimonial:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller: List all testimonials
 */
export const listAllTestimonials = ({ Testimonial, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const { name, email } = req.body
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      const sort = req.query.sort || 'createdAt'
      const sortDirection = req.query.sortDirection === 'desc' ? -1 : 1
      const skip = (page - 1) * limit

      // Case-insensitive filters
      const filter = {}
      if (email) {
        filter.email = { $regex: email, $options: 'i' }
      }
      if (name) {
        filter.name = { $regex: name, $options: 'i' }
      }

      // Count total documents
      const totalTestimonials = await Testimonial.countDocuments(filter)

      // Get filtered + paginated testimonials
      const testimonials = await Testimonial.findWithDeleted(filter)
        .sort({ [sort]: sortDirection })
        .skip(skip)
        .limit(limit)
        .lean()

      const totalPages = Math.ceil(totalTestimonials / limit)
      const hasMore = page < totalPages

      res.json(
        buildResponse(req, 'Testimonials retrieved successfully', {
          totalTestimonials,
          testimonials,
          pagination: {
            page,
            totalPages,
            limit,
            hasMore,
            totalResults: totalTestimonials
          }
        })
      )
    } catch (error) {
      console.error('Error in list all testimonials:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller: List one testimonial by ID.
 */
export const listOneTestimonial = ({ Testimonial, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const reviewId = req.params.id

      if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return handleHttpError(res, `Invalid testimonial ID: ${reviewId}`, 400)
      }

      const testimonial = await Testimonial.findById(reviewId)

      if (!testimonial) {
        return handleHttpError(res, `No testimonial found with ID: ${reviewId}`, 404)
      }

      res.json(
        buildResponse(req, 'Testimonials retrieved successfully',
          testimonial,
          null,
          {}
        )
      )
    } catch (error) {
      console.error('Error in list one testimonial:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller: Update a testimonial by ID.
 */
export const updateTestimonial = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const reviewId = req.params.id
      const { name, email, role, message } = req.body
      const updateFields = { name, email, role, message }

      // Update modification date
      updateFields.updatedAt = new Date()

      // Perform update in the database
      const testimonial = await Testimonial.findByIdAndUpdate(reviewId, updateFields, {
        new: true
      })

      res.json(
        buildResponse(req, 'Updated testimonial successfully',
          testimonial,
          null,
          {}
        )
      )
    } catch (error) {
      console.error('Error in updated testimonial:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller: delete a testimonial by ID.
 */
export const deleteTestimonial = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const reviewId = req.params.id

      // Validate MongoDB ObjectId format
      if (!reviewId || !reviewId.match(/^[a-fA-F0-9]{24}$/)) {
        return handleHttpError(res, 'Invalid review ID format', 400)
      }

      // Soft delete using mongoose-delete
      const deleted = await Testimonial.delete({ _id: reviewId }) // plugin handles deletedAt & overrideMethods

      if (!deleted) {
        return handleHttpError(res, 'Testimonial not found', 404)
      }

      // Respond with success message
      res.json(
        buildResponse(req, 'Testimonial deleted successfully',
          reviewId,
          null,
          {}
        )
      )
    } catch (error) {
      console.error('Error in delete one testimonial:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}
