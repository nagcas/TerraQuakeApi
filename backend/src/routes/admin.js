import express from 'express'
import { authMiddleware, requireAdmin } from '../middleware/authJwt.js'
import { buildResponse } from '../utils/buildResponse.js'

const router = express.Router()

/**
 * Admin Routes
 *
 * All routes in this file require:
 * 1. Valid JWT token (authMiddleware)
 * 2. Admin role (requireAdmin)
 */

// Example admin stats route
router.get('/stats', authMiddleware, requireAdmin, (req, res) => {
  try {
    const response = buildResponse(
      {
        message: 'Admin access granted',
        user: {
          id: req.user._id,
          email: req.user.email,
          role: req.user.role,
          name: req.user.name
        },
        stats: {
          timestamp: new Date().toISOString(),
          serverStatus: 'operational'
        }
      },
      'Admin dashboard data retrieved successfully'
    )

    res.status(200).json(response)
  } catch (error) {
    // Log error to the server console
    console.error('Admin stats error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve admin statistics'
    })
  }
})

// Admin dashboard info route
router.get('/dashboard', authMiddleware, requireAdmin, (req, res) => {
  try {
    const response = buildResponse(
      {
        message: 'Welcome to admin dashboard',
        user: {
          id: req.user._id,
          email: req.user.email,
          role: req.user.role,
          name: req.user.name,
          createdAt: req.user.createdAt
        },
        permissions: ['read', 'write', 'delete', 'admin']
      },
      'Admin dashboard access confirmed'
    )

    res.status(200).json(response)
  } catch (error) {
    // Log error to the server console
    console.error('Admin dashboard error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to access admin dashboard'
    })
  }
})

// Admin system info route
router.get('/system', authMiddleware, requireAdmin, (req, res) => {
  try {
    const response = buildResponse(
      {
        system: {
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          nodeVersion: process.version,
          platform: process.platform
        },
        timestamp: new Date().toISOString()
      },
      'System information retrieved'
    )

    res.status(200).json(response)
  } catch (error) {
    // Log error to the server console
    console.error('Admin system info error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve system information'
    })
  }
})

export default router
