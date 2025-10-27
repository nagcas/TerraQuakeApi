import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '@config/Axios.js'

/**
 * RequireAuth Component
 *
 * Protects routes by checking authentication and role requirements
 * - Calls /api/auth/me to verify login status and get user info
 * - Redirects unauthenticated users to /login
 * - Redirects non-admins to /no-access if requiredRole is 'admin'
 * - Renders children only if user has correct role
 */
const RequireAuth = ({ children, requiredRole = null }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          navigate('/signin', { replace: true })
          return
        }

        // Call /auth/me to verify token and get user info
        const response = await axios.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.data.success && response.data.data.user) {
          const userData = response.data.data.user
          setUser(userData)

          // Check role requirements
          if (requiredRole === 'admin') {
            if (!userData.role || !userData.role.includes('admin')) {
              navigate('/no-access', { replace: true })
              return
            }
          }

          setLoading(false)
        } else {
          // Token is invalid or user not found
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/signin', { replace: true })
        }
      } catch (error) {
        console.error('Auth check error:', error)
        // Clear invalid tokens
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/signin', { replace: true })
      }
    }

    checkAuth()
  }, [navigate, requiredRole])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4'></div>
          <p className='text-white/70'>Verifying access...</p>
        </div>
      </div>
    )
  }

  // Only render children if user is authenticated and has required role
  return user ? children : null
}

export default RequireAuth
