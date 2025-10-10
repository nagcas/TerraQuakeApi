import express from 'express'
import { matchedData } from 'express-validator'
import {
  listAllUsers,
  updateRoleById,
  getCurrentUserData,
  updateCurrentUserData,
  deleteCurrentUser
} from '../controllers/userControllers.js'

import {
  validatorUpdateCurrentUserData,
  validatorUpdateRoleById
} from '../validators/userValidators.js'

import { buildResponse } from '../utils/buildResponse.js'
import handleHttpError from '../utils/handleHttpError.js'
import User from '../models/userModels.js'

const router = express.Router()

// NOTE: USERS ROUTES

// NOTE: List all users (admin only)
// GET /all — returns a complete list of users, accessible only to admins
router.get('/all', listAllUsers({ User, buildResponse, handleHttpError }))

// NOTE: Change a user's role (admin only)
// POST /:id/role — updates the role of a specified user by ID
router.post('/:id/role', validatorUpdateRoleById, updateRoleById({ User, buildResponse, handleHttpError }))

// NOTE: Get current logged-in user's data
// GET /me — retrieves profile information of the logged-in user
router.get('/me', getCurrentUserData({ User, buildResponse, handleHttpError }))

// NOTE: Update current logged-in user's data
// PUT /me/update — updates personal data for the logged-in user
router.put('/me/update', validatorUpdateCurrentUserData, updateCurrentUserData({ User, buildResponse, handleHttpError, matchedData }))

// NOTE: Update user preferences (e.g., notifications, geographic area)
// DELETE /preferences/:id — removes specified user preferences
router.delete('/preferences/:id')

// NOTE: Delete the current logged-in user's account
// DELETE /me/delete — permanently deletes the logged-in user's account
router.delete('/me/delete', deleteCurrentUser({ User, buildResponse, handleHttpError }))

export default router
