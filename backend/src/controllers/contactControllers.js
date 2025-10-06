import mongoose from 'mongoose'
import Contact from '../models/contactModels.js'
import handleHttpError from '../utils/handleHttpError.js'

// Helper function to build standard response
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

// NOTE: Function for creating a new contact message
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

// NOTE: Function to view all contact messages
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

// NOTE: Function to display a single contact message with specified id
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

// NOTE: Function for creating a reply to a single message with a specific id
export const answerContact = (req, res) => {
  res.json({
    message: 'answer contact'
  })
}

// NOTE: Function for soft deletion of a contact message with a specific ID
export const deleteContact = (req, res) => {
  res.json({
    message: 'delete contact'
  })
}
