import express from 'express'
import {
  deleteContact,
  getAllContacts,
  getOneContact,
  answerContact,
  createContact
} from '../controllers/contactControllers.js'
import { validatorAnswer, validatorContact } from '../validators/contactValidators.js'

const router = express.Router()

// NOTE: Defining a [POST] route to send a new message
router.post('/create-contact', validatorContact, createContact)

// NOTE: Defining a [GET] route to display all received messages
router.get('/get-all-contacts', getAllContacts)

// NOTE: Defining a [GET] route to display a single message with a specific id
router.get('/get-one-contact/:contactId', getOneContact)

// NOTE: Defining a [PATCH] route to reply to a message with a specific id
router.patch('/answer-contact/:contactId', validatorAnswer, answerContact)

// NOTE: Defining a [DELETE] route to delete a single message with a specific id
router.delete('/delete-contact/:contactId', deleteContact)

export default router
