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

// NOTE: USERS

// NOTE: lista completa utenti (solo admin)
router.get('/all', listAllUsers({ User, buildResponse, handleHttpError }))

// NOTE: cambia ruolo di un utente (solo admin)
router.post('/:id/role', validatorUpdateRoleById, updateRoleById({ User, buildResponse, handleHttpError }))

// NOTE: ottieni i dati utente loggato
router.get('/me', getCurrentUserData({ User, buildResponse, handleHttpError }))

// NOTE: aggiorna dati utente loggato
router.put('/me/update', validatorUpdateCurrentUserData, updateCurrentUserData({ User, buildResponse, handleHttpError, matchedData }))

// NOTE: aggiorna preferenze (es. notifiche, area geografica)
// TODO: Implement deletePreferences controller and uncomment
// router.delete('/preferences/:id', deletePreferences({ User, buildResponse, handleHttpError }))

// NOTE: cancella account utente
router.delete('/me/delete', deleteCurrentUser({ User, buildResponse, handleHttpError }))

export default router
