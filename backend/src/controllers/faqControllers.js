import mongoose from 'mongoose'

/**
 * NOTE: Controller: Create a new faq.
 *
 * - Accepts `request`, `answer`
 * - Saves a new `Faq` document to the database.
 * - Responds with `200 OK` and the created contact object on success.
 * - Returns a structured error response if validation or DB error occurs.
 */
export const createFaq = ({ Faq, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const { question, answer } = req.body

      const faq = new Faq({ question, answer })

      const newFaq = await faq.save()

      res.json(
        buildResponse(req, 'Faq created successfully', newFaq, null, {})
      )
    } catch (error) {
      console.error('error in the faq controller:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller: Retrieve all faq.
 *
 * - Supports pagination: `page`, `limit`.
 * - Supports sorting: `sort` field and `sortDirection` (asc/desc).
 * - Returns total count, total pages, and pagination metadata.
 * - Responds with `200 OK` and an array of faq on success.
 */
export const listAllFaq = ({ Faq, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      const sort = req.query.sort || 'createdAt'
      const sortDirection = req.query.sortDirection === 'desc' ? -1 : 1
      const skip = (page - 1) * limit

      // Count total documents
      const totalFaq = await Faq.countDocuments()
      console.log(totalFaq)

      // Get filtered + paginated faq
      const faqs = await Faq.findWithDeleted()
        .sort({ [sort]: sortDirection })
        .skip(skip)
        .limit(limit)
        .lean()

      const totalPages = Math.ceil(totalFaq / limit)
      const hasMore = page < totalPages

      res.json(
        buildResponse(req, 'Faq retrieved successfully', {
          totalFaq,
          faqs,
          pagination: {
            page,
            totalPages,
            limit,
            hasMore,
            totalResults: totalFaq
          }
        })
      )
    } catch (error) {
      console.error('Error in the faq controller.', error.message)
      handleHttpError(
        res, error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller: Retrieve a single faq by ID.
 *
 * - Validates that the provided ID is a valid MongoDB ObjectId.
 * - Responds with `404 Not Found` if no faq exists with the given ID.
 * - Returns `200 OK` and the faq document on success.
 */
export const listOneFaq = ({ Faq, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const faqId = req.params.id

      if (!mongoose.Types.ObjectId.isValid(faqId)) {
        return handleHttpError(res, `Invalid faq ID: ${faqId}`, 400)
      }

      const faq = await Faq.findById(faqId)

      if (!faq) {
        return handleHttpError(res, `No faq found with ID: ${faqId}`, 404)
      }

      res.json(
        buildResponse(
          req,
          'Faq retrived successfully',
          faq,
          null,
          {}
        )
      )
    } catch (error) {
      console.error('Error in the faq controller', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller: Update a FAQ by ID.
 *
 * - To be implemented: should update an existing FAQ entry based on its ID.
 * - In the future, consider implementing a soft-delete mechanism instead of physically removing records from the database.
 * - Currently returns a placeholder response.
 */
export const updateFaq = ({ Faq, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const { question, answer } = req.body
      const faqId = req.params.id

      if (!mongoose.Types.ObjectId.isValid(faqId)) {
        return handleHttpError(res, `Invalid faq ID: ${faqId}`, 400)
      }

      const updateFaq = await Faq.findByIdAndUpdate(
        faqId,
        {
          question,
          answer
        },
        {
          new: true
        }
      )

      if (!updateFaq) {
        return handleHttpError(res, 'Faq not found', 404)
      }

      res.json(
        buildResponse(
          req,
          'Faq updated successfully',
          updateFaq,
          null,
          {}
        )
      )
    } catch (error) {
      console.error('Error in the faq controller:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller: Soft-delete a faq by ID.
 *
 * - To be implemented: should mark a message as deleted without removing it from the DB.
 * - Currently returns a placeholder response.
 */
export const deleteFaq = ({ Faq, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const faqId = req.params.id

      if (!mongoose.Types.ObjectId.isValid(faqId)) {
        return handleHttpError(res, `Invalid faq ID: ${faqId}`, 400)
      }

      // Soft delete using mongoose-delete
      const deleted = await Faq.delete({ _id: faqId }) // plugin handles deletedAt & overrideMethods

      if (!deleted) {
        return handleHttpError(res, 'Faq not found', 404)
      }

      // Respond with success message
      res.json(
        buildResponse(req, 'Faq deleted successfully', faqId, null, {})
      )
    } catch (error) {
      console.error('Error in the faq controller:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}
