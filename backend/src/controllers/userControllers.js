import { sendDeleteAccountConfirmation } from '../libs/sendDeleteAccountConfirmation.js'

/**
 * NOTE: Controller: List all users (Admin only).
 */
export const listAllUsers = ({ User, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const { name } = req.query
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 50
      const sort = req.query.sort || 'createdAt'
      const sortDirection = req.query.sortDirection === 'asc' ? 1 : -1
      const skip = (page - 1) * limit

      // Build filters only if provided
      const filter = {}
      if (name) filter.name = { $regex: name, $options: 'i' }

      // Count including soft-deleted users
      const totalUsers = await User.countDocumentsWithDeleted(filter)

      // Fetch filtered or all users
      const users = await User.findWithDeleted(filter)
        .sort({ [sort]: sortDirection })
        .skip(skip)
        .limit(limit)
        .lean()

      const totalPages = Math.ceil(totalUsers / limit)
      const hasMore = page < totalPages

      // Respond with paginated posts
      res.json(
        buildResponse(req, 'Users retrieved successfully', {
          users,
          pagination: {
            page,
            totalPages,
            limit,
            hasMore,
            totalResults: totalUsers
          }
        })
      )
    } catch (error) {
      console.error('Error in listAllUsers:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller: Update a user's role by ID (Admin only).
 */
export const updateRoleById = ({ User, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      if (!req.user || !req.user.role?.includes('admin')) {
        return handleHttpError(res, 'Unauthorized', 401)
      }

      const { id } = req.params
      const user = await User.findById(id)
      if (!user) return handleHttpError(res, 'User not found', 400)

      user.role = [req.body.role]
      await user.save()

      return res
        .status(200)
        .json(buildResponse(req, 'Role updated successfully', user, null, {}))
    } catch (error) {
      console.error('Error in updateRoleById:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
* NOTE: Controller: Get current authenticated user's data.
 */
export const getCurrentUserData = ({
  User,
  buildResponse,
  handleHttpError
}) => {
  return async (req, res) => {
    try {
      if (!req.user || !req.user.role?.length) {
        return handleHttpError(res, 'Unauthorized', 401)
      }

      const user = await User.findById(req.user._id).lean()
      if (!user) return handleHttpError(res, 'User not found', 400)

      return res.status(200).json(buildResponse(req, '', user, null, {}))
    } catch (error) {
      console.error('Error in getCurrentUserData:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
* NOTE: Controller: Update current authenticated user's data.
 */
export const updateCurrentUserData = ({
  User,
  buildResponse,
  handleHttpError,
  matchedData
}) => {
  return async (req, res) => {
    try {
      if (!req.user || !req.user.role?.length) {
        return handleHttpError(res, 'Unauthorized', 401)
      }

      const updates = matchedData(req)
      const user = await User.findById(req.user._id).select('+password')
      if (!user) return handleHttpError(res, 'User not found', 400)

      user.set(updates)
      const savedUser = await user.save()

      const userResponse = savedUser.toObject()
      delete userResponse.password

      return res
        .status(200)
        .json(
          buildResponse(
            req,
            'User updated successfully',
            userResponse,
            null,
            {}
          )
        )
    } catch (error) {
      console.error('Error in updateCurrentUserData:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller: Update user.
 * This controller updates user data including the soft-delete state.
 */
export const updateUserData = ({ User, buildResponse, handleHttpError, matchedData }) => {
  return async (req, res) => {
    try {
      const { id } = req.params

      // Check if request comes from a logged-in user with a role
      if (!req.user || !req.user.role?.length) {
        return handleHttpError(res, 'Unauthorized', 401)
      }

      // Extract only validated fields
      const updates = matchedData(req)

      console.log(updates)

      // Find user including soft-deleted ones
      const user = await User.findOneWithDeleted({ _id: id }).select('+password')
      if (!user) return handleHttpError(res, 'User not found', 400)

      // Update user fields
      user.set(updates)

      // If deleted changed, perform mongoose-delete actions
      if ('deleted' in updates) {
        if (updates.deleted === true) {
          await user.delete() // Soft-delete
        } else {
          await user.restore() // Restore
        }
      }

      const savedUser = await user.save()

      const userResponse = savedUser.toObject()
      delete userResponse.password

      return res.status(200).json(
        buildResponse(req, 'User updated successfully', userResponse, null, {})
      )
    } catch (error) {
      console.error('Error in updateUserData:', error.message)
      return handleHttpError(res, 'Internal server error', 500)
    }
  }
}

/**
* NOTE: Controller: Soft delete the currently authenticated user's account.
 */
export const deleteCurrentUser = ({ User, buildResponse, handleHttpError, invalidateToken }) => {
  return async (req, res) => {
    try {
      // Retrieve token from Authorization header
      const authHeader = req.headers.authorization

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return handleHttpError(res, 'No token provided', 400)
      }

      const token = authHeader.split(' ')[1]

      // Invalidate the token (add it to blacklist)
      const success = await invalidateToken(token)

      if (!success) {
        return handleHttpError(res, 'Failed to delete account.', 400)
      }

      // Find user first to use its data for email
      const user = await User.findById(req.user._id).select('email name')
      if (!user) {
        return handleHttpError(res, 'User not found', 400)
      }

      // Perform soft delete with mongoose-delete
      await User.delete({ _id: req.user._id })

      // Send confirmation email with user data
      await sendDeleteAccountConfirmation(user)

      return res.status(200).json(
        buildResponse(req, 'Account deleted successfully', { _id: user._id, email: user.email, name: user.name }, null, {})
      )
    } catch (error) {
      console.error('Error in deleteCurrentUser:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
* NOTE: Controller: Soft delete the user's account.
 */
export const deleteUser = ({ User, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const { id } = req.params

      // Verify that the user exists
      const user = await User.findOneWithDeleted({ _id: id })
      if (!user) {
        return handleHttpError(res, 'User not found', 404)
      }

      // Soft delete via mongoose-delete
      await User.delete({ _id: id })

      return res.status(200).json(
        buildResponse(
          req,
          'User soft-deleted successfully',
          { _id: user._id, email: user.email, name: user.name, deleted: true },
          null,
          {}
        )
      )
    } catch (error) {
      console.error('Error in deleteUser:', error)
      return handleHttpError(res, 'Unexpected server error', 500)
    }
  }
}
