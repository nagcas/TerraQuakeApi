/**
 * NOTE: Controller: Create a new faq.
 *
 * - Accepts `request`, `answer`
 * - Saves a new `Faq` document to the database.
 * - Responds with `200 OK` and the created contact object on success.
 * - Returns a structured error response if validation or DB error occurs.
 */
export const createFaq = ({ Faq, buildResponse, handleHttpError, invalidateToken }) => {
  return async (req, res) => {
    try {
      const { request, answer } = req.body

      // Retrieve token from Authorization header
      const authHeader = req.headers.authorization
      console.log(authHeader)

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return handleHttpError(res, 'No token provided', 400)
      }

      const token = authHeader.split(' ')[1]

      // Invalidate the token (add it to blacklist)
      const success = await invalidateToken(token)

      if (!success) {
        return handleHttpError(res, 'Failed to created faq.', 400)
      }

      const faq = new Faq({ request, answer })

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

      // Get filtered + paginated faq
      const faqs = await Faq.findWithDeleted()
        .sort({ [sort]: sortDirection })
        .skip(skip)
        .limit(limit)
        .lean()

      console.log(faqs)

      const totalPages = Math.ceil(totalFaq / limit)
      const hasMore = page < totalPages

      res.json(
        buildResponse(req, 'Faq retrieved successfully', {
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
export const listOneFaq = () => {
  return async (req, res) => {
    try {
      res.status(200).json('list one faq')
    } catch (error) {
      console.log(error)
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
export const updateFaq = () => {
  return async (req, res) => {
    try {
      res.status(200).json('update faq')
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * NOTE: Controller: Soft-delete a faq by ID.
 *
 * - To be implemented: should mark a message as deleted without removing it from the DB.
 * - Currently returns a placeholder response.
 */
export const deleteFaq = () => {
  return async (req, res) => {
    try {
      res.status(200).json('delete faq')
    } catch (error) {
      console.log(error)
    }
  }
}
