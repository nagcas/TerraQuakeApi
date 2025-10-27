import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '@components/modules/Context'

export default function RequireAuth ({ children, requiredRole = null }) {
  const { userLogin } = useContext(Context)
  const navigate = useNavigate()

  // Transform role into array if it isn't already
  const roles = userLogin
    ? Array.isArray(userLogin.role)
      ? userLogin.role
      : [userLogin.role]
    : []

  // Authentication check
  if (!userLogin) {
    navigate('/signin', { replace: true })
    return null
  }

  // Role control
  if (requiredRole && !roles.includes(requiredRole)) {
    navigate('/no-access', { replace: true })
    return null
  }

  return children
}
