// utils/auth.js
// Authentication utility functions

/**
 * Storage keys for authentication
 */
export const AUTH_STORAGE_KEY = 'user'
export const TOKEN_STORAGE_KEY = 'authToken'

/**
 * Get stored user data
 */
export const getStoredUser = () => {
    try {
        // Check localStorage first (remember me), then sessionStorage
        const userData = localStorage.getItem(AUTH_STORAGE_KEY) ||
            sessionStorage.getItem(AUTH_STORAGE_KEY)
        return userData ? JSON.parse(userData) : null
    } catch (error) {
        console.error('Error parsing stored user data:', error)
        clearStoredUser()
        return null
    }
}

/**
 * Store user data
 */
export const storeUser = (userData, remember = false) => {
    try {
        const storage = remember ? localStorage : sessionStorage
        storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData))

        // Store token separately if exists
        if (userData.token) {
            storage.setItem(TOKEN_STORAGE_KEY, userData.token)
        }
    } catch (error) {
        console.error('Error storing user data:', error)
    }
}

/**
 * Clear all stored authentication data
 */
export const clearStoredUser = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
    sessionStorage.removeItem(TOKEN_STORAGE_KEY)
}

/**
 * Get stored authentication token
 */
export const getStoredToken = () => {
    return localStorage.getItem(TOKEN_STORAGE_KEY) ||
        sessionStorage.getItem(TOKEN_STORAGE_KEY)
}

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    const user = getStoredUser()
    const token = getStoredToken()
    return !!(user && token)
}

/**
 * Mock API login function - replace with actual API call
 */
export const loginAPI = async (credentials) => {
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mock validation - replace with actual API call
        if (credentials.username && credentials.password) {
            // Mock successful response
            return {
                success: true,
                data: {
                    id: '12345',
                    username: credentials.username,
                    name: 'Linda Adora',
                    email: `${credentials.username}@greenwoodacademy.edu`,
                    role: 'Admin',
                    permissions: ['read', 'write', 'admin'],
                    token: 'mock-jwt-token-' + Date.now(),
                    avatar: '/placeholder.svg'
                }
            }
        } else {
            return {
                success: false,
                error: 'Invalid credentials'
            }
        }
    } catch (error) {
        return {
            success: false,
            error: 'Login failed. Please try again.'
        }
    }
}

/**
 * Mock API logout function - replace with actual API call
 */
export const logoutAPI = async () => {
    try {
        // In real app, make API call to invalidate token
        await new Promise(resolve => setTimeout(resolve, 500))
        return { success: true }
    } catch (error) {
        console.error('Logout API error:', error)
        return { success: false }
    }
}

/**
 * Validate token with server - replace with actual API call
 */
export const validateToken = async (token) => {
    try {
        // Mock token validation
        await new Promise(resolve => setTimeout(resolve, 500))

        // In real app, make API call to validate token
        if (token && token.startsWith('mock-jwt-token')) {
            return {
                success: true,
                data: {
                    id: '12345',
                    username: 'admin',
                    name: 'Linda Adora',
                    role: 'Admin'
                }
            }
        }

        return { success: false, error: 'Invalid token' }
    } catch (error) {
        return { success: false, error: 'Token validation failed' }
    }
}

/**
 * Get user role-based permissions
 */
export const getUserPermissions = (user) => {
    if (!user) return []

    const rolePermissions = {
        'Admin': ['read', 'write', 'delete', 'admin'],
        'Teacher': ['read', 'write'],
        'Student': ['read'],
        'Parent': ['read']
    }

    return rolePermissions[user.role] || ['read']
}

/**
 * Check if user has specific permission
 */
export const hasPermission = (user, permission) => {
    const permissions = getUserPermissions(user)
    return permissions.includes(permission)
}