// Authentication API functions
import axios from 'axios'

const API_BASE_URL ='https://tutorial-blog-app-backend.onrender.com'

const authClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

export const authAPI = {
  async register({ email, password }) {
    try {
      const { data } = await authClient.post('/auth/register', { email, password })
      return data
    } catch (error) {
      throw new Error(error.message || 'Registration failed')
    }
  },

  async login({ email, password }) {
    try {
      const { data } = await authClient.post('/auth/login', { email, password })
      return data
    } catch (error) {
      throw new Error("Invalid credentials")
    }
  },

  async refresh() {
    try {
      const { data } = await authClient.post('/auth/refresh')
      return data
    } catch (error) {
      throw new Error(error.message || 'Token refresh failed')
    }
  },

  async logout() {
    try {
      const { data } = await authClient.post('/auth/logout')
      return data
    } catch (error) {
      throw new Error(error.message || 'Logout failed')
    }
  },

  async checkAuth() {
    try {
      // await new Promise(res => setTimeout(res, 4000));
      const { data } = await authClient.get('/auth/me')
      return data
    } catch {
      return null
    }
  },

  async updateProfile(updates) {
    try {
      const { data } = await authClient.put('/auth/me', updates)
      return data
    } catch (error) {
      throw new Error(error.message || 'Profile update failed')
    }
  },
}