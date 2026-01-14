import express from 'express'
import { matchedData } from 'express-validator'
import {
  listAllUsers,
  updateRoleById,
  getCurrentUserData,
  updateCurrentUserData,
  deleteCurrentUser,
  updateUserData,
  deleteUser
} from '../controllers/userControllers.js'

import {
  validatorUpdateCurrentUserData,
  validatorUpdateDeleted,
  validatorUpdateRoleById
} from '../validators/userValidators.js'

import { buildResponse } from '../utils/buildResponse.js'
import handleHttpError from '../utils/handleHttpError.js'
import User from '../models/userModels.js'
import { authenticateUser } from '../middleware/authMiddleware.js'
import { adminMiddleware } from '../middleware/adminMiddlewares.js'
import { invalidateToken } from '../utils/handleJwt.js'

const router = express.Router()

// NOTE: USERS ROUTES

// NOTE: List all users (admin only)
// GET /all — returns a complete list of users, accessible only to admins
router.get('/', adminMiddleware, listAllUsers({ User, buildResponse, handleHttpError }))

// NOTE: Change a user's role (admin only)
// POST /:id/role — updates the role of a specified user by ID
router.post('/:id/role', validatorUpdateRoleById, updateRoleById({ User, buildResponse, handleHttpError }))

// NOTE: Get current logged-in user's data
// GET /me — retrieves profile information of the logged-in user
router.get('/me', authenticateUser, getCurrentUserData({ User, buildResponse, handleHttpError }))

// NOTE: Update current logged-in user's data
// PATCH /me/update — updates personal data for the logged-in user
router.patch('/me', authenticateUser, validatorUpdateCurrentUserData, updateCurrentUserData({ User, buildResponse, handleHttpError, matchedData }))

// NOTE; Update user by admin
// PATCH /update/:id — updates personal data user
router.patch('/:id', adminMiddleware, validatorUpdateCurrentUserData, validatorUpdateDeleted, updateUserData({ User, buildResponse, handleHttpError, matchedData }))

// NOTE: Update user preferences (e.g., notifications, geographic area)
// DELETE /preferences/:id — removes specified user preferences
router.delete('/preferences/:id')

// NOTE: Delete the current logged-in user's account
// DELETE /me/delete — soft deletes the logged-in user's account
router.delete('/me', authenticateUser, deleteCurrentUser({ User, buildResponse, handleHttpError, invalidateToken }))

// NOTE: Delete the user's account
// DELETE /delete — soft deletes the logged-in user's account
router.delete('/:id', adminMiddleware, deleteUser({ User, buildResponse, handleHttpError, invalidateToken }))

export default router
