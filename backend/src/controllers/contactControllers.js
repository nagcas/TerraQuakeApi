import mongoose from 'mongoose'
import Contact from '../models/contactModels.js'
import handleHttpError from '../utils/handleHttpError.js'

/**
 * Helper: Builds a standard API response object.
 *
 * @param {object} req - Express request object.
 * @param {string} message - Response message.
 * @param {object} data - Data payload for the response.
 * @returns {object} Structured JSON response with meta info.
 */
const buildResponse = (req, message, data) => ({
  success: true,
  code: 200,
  status: 'OK',
  message,
  data,
  meta: {
    method: req.method.toUpperCase(),
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  }
})

/**
 * Controller: Create a new contact message.
 *
 * - Accepts `name`, `lastname`, `email`, `subject`, and `message` from request body.
 * - Saves a new `Contact` document to the database.
 * - Responds with `200 OK` and the created contact object on success.
 * - Returns a structured error response if validation or DB error occurs.
 */
export const createContact = async (req, res) => {
  try {
    const { name, lastname, email, subject, message } = req.body
    const contact = new Contact({ name, lastname, email, subject, message })
    const newContact = await contact.save()
    res.json({
      ...buildResponse(req, 'Message sent successfully', newContact)
    })
  } catch (error) {
    console.error('Error in the contact controller:', error.message)
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

/**
 * Controller: Retrieve all contact messages.
 *
 * - Supports pagination: `page`, `limit`.
 * - Supports sorting: `sort` field and `sortDirection` (asc/desc).
 * - Supports case-insensitive filtering by `name`, `lastname`, `email`.
 * - Returns total count, total pages, and pagination metadata.
 * - Responds with `200 OK` and an array of contacts on success.
 */
export const getAllContacts = async (req, res) => {
  try {
    const { name, lastname, email } = req.body
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
    if (lastname) {
      filter.lastname = { $regex: lastname, $options: 'i' }
    }

    // Count total documents
    const totalContacts = await Contact.countDocuments(filter)

    // Get filtered + paginated contacts
    const contacts = await Contact.findWithDeleted(filter)
      .sort({ [sort]: sortDirection })
      .skip(skip)
      .limit(limit)
      .lean()

    const totalPages = Math.ceil(totalContacts / limit)
    const hasMore = page < totalPages

    res.json({
      ...buildResponse(
        req,
        'Contacts retrieved successfully',
        contacts
      ),
      pagination: {
        page,
        totalPages,
        limit,
        hasMore,
        totalResults: totalContacts
      }
    })
  } catch (error) {
    console.error('Error in the contact controller:', error.message)
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

/**
 * Controller: Retrieve a single contact message by ID.
 *
 * - Validates that the provided ID is a valid MongoDB ObjectId.
 * - Responds with `404 Not Found` if no contact exists with the given ID.
 * - Returns `200 OK` and the contact document on success.
 */
export const getOneContact = async (req, res) => {
  try {
    const { contactId } = req.params

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return handleHttpError(res, `Invalid contact ID: ${contactId}`, 400)
    }

    const contact = await Contact.findById(contactId)

    if (!contact) {
      return handleHttpError(res, `No contact found with ID: ${contactId}`, 404)
    }

    res.json({
      ...buildResponse(
        req,
        'Contact retrieved successfully',
        contact
      )
    })
  } catch (error) {
    console.error('Error in the contact controller:', error.message)
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

/**
 * Controller: Answer a specific contact message.
 *
 * - To be implemented: should send or log a reply to a contact message.
 * - Currently returns a placeholder response.
 */
export const answerContact = (req, res) => {
  res.json({
    message: 'answer contact'
  })
}

/**
 * Controller: Soft-delete a contact message by ID.
 *
 * - To be implemented: should mark a message as deleted without removing it from the DB.
 * - Currently returns a placeholder response.
 */
export const deleteContact = (req, res) => {
  res.json({
    message: 'delete contact'
  })
}
