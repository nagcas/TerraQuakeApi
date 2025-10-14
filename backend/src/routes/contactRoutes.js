import express from 'express'
import Contact from '../models/contactModels.js'
import {
  deleteContact,
  listAllContacts,
  listOneContact,
  answerContact,
  createContact
} from '../controllers/contactControllers.js'
import { validatorAnswer, validatorContact } from '../validators/contactValidators.js'
import { sendEmailConfirmContact } from '../libs/sendEmailConfirmContact.js'
import { sendEmailConfirmAnswer } from '../libs/sendEmailConfirmAnswer.js'
import { buildResponse } from '../utils/buildResponse.js'
import handleHttpError from '../utils/handleHttpError.js'
import { adminMiddleware } from '../middleware/adminMiddlewares.js'

const router = express.Router()

// NOTE: Defining a [POST] route to send a new message
router.post('/create-contact', validatorContact, createContact({ Contact, sendEmailConfirmContact, buildResponse, handleHttpError }))

// NOTE: Defining a [GET] route to display all received messages
router.get('/list-all-contacts', adminMiddleware, listAllContacts({ Contact, buildResponse, handleHttpError }))

// NOTE: Defining a [GET] route to display a single message with a specific id
router.get('/list-one-contact/:id', adminMiddleware, listOneContact({ Contact, buildResponse, handleHttpError }))

// NOTE: Defining a [PATCH] route to reply to a message with a specific id
router.patch('/answer-contact/:id', adminMiddleware, validatorAnswer, answerContact({ Contact, sendEmailConfirmAnswer, buildResponse, handleHttpError }))

// NOTE: Defining a [DELETE] route to delete a single message with a specific id
router.delete('/delete-contact/:id', adminMiddleware, deleteContact({ Contact, buildResponse, handleHttpError }))

export default router
