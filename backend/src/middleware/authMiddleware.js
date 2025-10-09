import { verifyToken } from '../utils/handleJwt.js'
import handleHttpError from '../utils/handleHttpError.js'

/**
* NOTE: Middleware to authenticate a user based on a JWT.
* It checks for an "Authorization" header, verifies the token,
* and if valid, attaches the decoded user payload to the request object.
* If the token is invalid or missing, it sends a 400 Bad Request response.
*/
export const authenticateUser = async (req, res, next) => {
  const token = req.get('Authorization')?.split(' ')[1]

  if (!token) {
    return handleHttpError(res, 'Authorization token missing', 401)
  }

  const decoded = await verifyToken(token)

  if (!decoded) {
    return handleHttpError(res, 'Invalid or expired JWT token', 401)
  }

  req.user = decoded
  next()
}
