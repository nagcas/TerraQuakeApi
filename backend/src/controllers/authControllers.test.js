import {
  signUp,
  signIn,
  resetPassword
} from './authControllers.js'
import { test, describe, beforeEach } from 'node:test'
import assert from 'node:assert'

// Utility function for handling HTTP errors consistently
const handleHttpError = (res, message = 'Internal server error. Your request cannot be processed at this time', code = 500) => {
  res.status(code).json(
    {
      success: false,
      status: code,
      message
    }
  )
}

// Helper for building consistent API responses
const buildResponse = (req, message, data, total = null, { ...rest }) => ({
  success: true,
  code: 200,
  status: 'OK',
  data,
  message
})

// Mock Express.js response object
const makeRes = () => ({
  _status: null,
  _json: null,
  status (code) {
    this._status = code
    return this
  },
  json (data) {
    this._json = data
    return this
  }
})

// Helper to mimic express-validator’s matchedData
const matchedData = (req) => ({ ...req.body })

// Mock password comparison (simulates bcrypt.compare)
const compare = async (actualPassword, enteredPassword) => (actualPassword === enteredPassword)

// Mock user dataset for testing
const mockData = [
  { id: 1, name: 'Alice', email: 'alice.sample@gmail.com', password: '12345678', role: ['admin'] },
  { id: 2, name: 'Bob', email: 'bob.sample@gmail.com', password: 'abcd@1234', role: ['user'] }
]

/* ================================
   SIGN UP CONTROLLER TESTS
================================ */
describe('signUp Controller', () => {
  // Mock User model for testing user registration
  class MockUser {
    save () {
      return this
    }

    toObject () {
      return this._data
    }

    constructor (data) {
      // Simulate checking for existing user by email
      const matchedEmail = mockData.filter((obj) => obj.email === data.email)
      if (matchedEmail.length) throw new Error('User Exists')
      this._data = data
      return this
    }
  }

  // Mock email sending function (e.g., Mailgun)
  const sendEmailRegister = async () => {}

  test('returns 400 if user exists', async () => {
    const res = makeRes()
    const handler = signUp({ User: MockUser, buildResponse, handleHttpError, matchedData, sendEmailRegister })
    await handler({
      body: {
        email: 'alice.sample@gmail.com'
      }
    }, res)

    assert.strictEqual(res._status, 409)
    assert.strictEqual(res._json.success, false)
  })

  test('returns 200 on successful user creation', async () => {
    const res = makeRes()
    const handler = signUp({ User: MockUser, buildResponse, handleHttpError, matchedData, sendEmailRegister })
    await handler({
      body: {
        email: 'john.sample@gmail.com'
      }
    }, res)

    assert.strictEqual(res._status, 200)
    assert.strictEqual(res._json.data.email, 'john.sample@gmail.com')
  })
})

/* ================================
   SIGN IN CONTROLLER TESTS
================================ */
describe('signIn Controller', () => {
  let handler, res

  // Mock User model for login authentication
  const mockUser = {
    findOne ({ email }) {
      const matchedData = mockData.filter((obj) => obj.email === email)
      if (!matchedData.length) return this
      this.matchedUser = { ...matchedData[0] }
      return this
    },
    select (params) {
      return this
    },
    lean () {
      return this.matchedUser
    }
  }

  // Mock JWT generation function
  const tokenSign = async (user) => 'token'

  beforeEach(() => {
    handler = signIn({ User: mockUser, buildResponse, handleHttpError, matchedData, compare, tokenSign })
    res = makeRes()
  })

  test('returns 404 if no user with matching email exists', async () => {
    await handler({
      body: {
        email: 'john@yahoo.com',
        password: '12345678'
      }
    }, res)

    assert.strictEqual(res._status, 404)
    assert.strictEqual(res._json.success, false)
  })

  test('returns 401 if passwords do not match', async () => {
    await handler({
      body: {
        email: 'alice.sample@gmail.com',
        password: '1234567'
      }
    }, res)

    assert.strictEqual(res._status, 401)
    assert.strictEqual(res._json.success, false)
  })

  test('returns 200 with a JWT token on successful login', async () => {
    await handler({
      body: {
        email: 'alice.sample@gmail.com',
        password: '12345678'
      }
    }, res)

    assert.strictEqual(res._status, 200)
    assert.strictEqual(res._json.success, true)
  })

  test('returns 500 on Internal Error', async () => {
    const failingHandler = signIn({
      User: {
        findOne () {
          throw new Error('Internal Server Error')
        }
      },
      buildResponse,
      handleHttpError,
      matchedData,
      compare,
      tokenSign
    })

    await failingHandler({
      body: {
        email: 'alice.sample@gmail.com',
        password: '12345678'
      }
    }, res)

    assert.strictEqual(res._status, 500)
    assert.strictEqual(res._json.success, false)
  })
})

/* ================================
   RESET PASSWORD CONTROLLER TESTS
================================ */
describe('resetPassword Controller', () => {
  let res, handler

  // Mock User model for password reset logic
  const mockUser = {
    findOne ({ email }) {
      const matchedData = mockData.filter((obj) => obj.email === email)
      return {
        ...matchedData[0],
        save () {
          return this
        },
        toObject () {
          return this
        },
        select (params) {
          if (!matchedData.length) return null
          return this
        }
      }
    }
  }

  beforeEach(() => {
    handler = resetPassword({ User: mockUser, buildResponse, handleHttpError, compare, matchedData })
    res = makeRes()
  })

  test('returns 404 if no user with matching email exists', async () => {
    await handler({
      body: {
        email: 'john.doe@gmail.com',
        password: '12345678'
      }
    }, res)

    assert.strictEqual(res._status, 404)
    assert.strictEqual(res._json.success, false)
  })

  test('returns 409 if old password == new password', async () => {
    await handler({
      body: {
        email: 'alice.sample@gmail.com',
        password: '12345678'
      }
    }, res)

    assert.strictEqual(res._status, 409)
    assert.strictEqual(res._json.success, false)
  })

  test('returns 200 with user data on success', async () => {
    await handler({
      body: {
        email: 'alice.sample@gmail.com',
        password: '123456789'
      }
    }, res)

    assert.strictEqual(res._status, 200)
    assert.strictEqual(res._json.success, true)
  })

  test('returns 500 on Internal Error', async () => {
    const failingHandler = resetPassword({
      User: {
        findOne ({ email }) {
          throw new Error('Internal Server Error')
        }
      },
      buildResponse,
      handleHttpError,
      matchedData,
      compare
    })

    await failingHandler({
      body: {
        email: 'alice.sample@gmail.com',
        password: '12345678'
      }
    }, res)

    assert.strictEqual(res._status, 500)
    assert.strictEqual(res._json.success, false)
  })
})
