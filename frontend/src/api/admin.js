import axios from '@config/Axios.js'

/**
 * Admin API Helper
 *
 * Provides methods to interact with admin-protected endpoints
 * Automatically includes Authorization header with JWT token
 */
class AdminAPI {
  /**
   * Get authorization headers with JWT token
   */
  getAuthHeaders() {
    const token = localStorage.getItem('token')
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }

  /**
   * Get admin dashboard statistics
   */
  async getStats() {
    try {
      const response = await axios.get('/api/admin/stats', {
        headers: this.getAuthHeaders(),
      })
      return response.data
    } catch (error) {
      console.error('Error fetching admin stats:', error)
      throw error
    }
  }

  /**
   * Get admin dashboard info
   */
  async getDashboardInfo() {
    try {
      const response = await axios.get('/api/admin/dashboard', {
        headers: this.getAuthHeaders(),
      })
      return response.data
    } catch (error) {
      console.error('Error fetching dashboard info:', error)
      throw error
    }
  }

  /**
   * Get system information
   */
  async getSystemInfo() {
    try {
      const response = await axios.get('/api/admin/system', {
        headers: this.getAuthHeaders(),
      })
      return response.data
    } catch (error) {
      console.error('Error fetching system info:', error)
      throw error
    }
  }

  /**
   * Generic method for admin API calls
   * @param {string} endpoint - API endpoint (without /api/admin prefix)
   * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
   * @param {object} data - Request data (for POST/PUT requests)
   */
  async adminRequest(endpoint, method = 'GET', data = null) {
    try {
      const config = {
        method,
        url: `/api/admin${endpoint}`,
        headers: this.getAuthHeaders(),
      }

      if (data && (method === 'POST' || method === 'PUT')) {
        config.data = data
      }

      const response = await axios(config)
      return response.data
    } catch (error) {
      console.error(`Error in admin request to ${endpoint}:`, error)
      throw error
    }
  }

  /**
   * Check if current user has admin privileges
   */
  async checkAdminAccess() {
    try {
      const response = await axios.get('/auth/me', {
        headers: this.getAuthHeaders(),
      })

      if (response.data.success && response.data.data.user) {
        const user = response.data.data.user
        return user.role && user.role.includes('admin')
      }

      return false
    } catch (error) {
      console.error('Error checking admin access:', error)
      return false
    }
  }
}

// Export singleton instance
export default new AdminAPI()
