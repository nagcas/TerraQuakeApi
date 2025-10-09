import { sendDeleteAccountConfirmation } from '../libs/sendDeleteAccountConfirmation.js'
import { getPositiveInt } from '../utils/httpQuery.js'

/**
 * NOTE: Controller: List all users (Admin only).
 */
export const listAllUsers = ({ User, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      if (!req.user || !req.user.role?.includes('admin')) {
        return handleHttpError(res, 'Unauthorized', 400)
      }

      const limit = getPositiveInt(req.query, 'limit', { max: 100, def: 50 })
      if (!limit) return handleHttpError(res, 'Invalid limit parameter', 400)

      const documents = await User.find({}).limit(limit).lean()

      return res.status(200).json(buildResponse(req, '', documents, null, {}))
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
        return handleHttpError(res, 'Unauthorized', 400)
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
        return handleHttpError(res, 'Unauthorized', 400)
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
        return handleHttpError(res, 'Unauthorized', 400)
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
* NOTE: Controller: Soft delete the currently authenticated user's account.
 */
export const deleteCurrentUser = ({ User, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      if (!req.user || !req.user.role?.length) {
        return handleHttpError(res, 'Unauthorized', 400)
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
