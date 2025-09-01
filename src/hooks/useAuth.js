// hooks/useAuth.js
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/**
 * Custom hook to use authentication context
 * Provides easy access to auth state and methods
 */
export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

// Alternative: You can also create specific hooks for common auth operations

/**
 * Hook for login functionality
 */
export const useLogin = () => {
    const { login, isLoading } = useAuth()

    const handleLogin = async (credentials, remember = false) => {
        try {
            await login(credentials, remember)
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Login failed'
            }
        }
    }

    return { handleLogin, isLoading }
}

/**
 * Hook for logout functionality
 */
export const useLogout = () => {
    const { logout } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
            return { success: true }
        } catch (error) {
            console.error('Logout error:', error)
            return {
                success: false,
                error: 'Logout failed'
            }
        }
    }

    return { handleLogout }
}

/**
 * Hook to check user permissions
 */
export const usePermissions = () => {
    const { user } = useAuth()

    const hasPermission = (permission) => {
        if (!user || !user.permissions) return false
        return user.permissions.includes(permission)
    }

    const isAdmin = () => hasPermission('admin')
    const canWrite = () => hasPermission('write')
    const canDelete = () => hasPermission('delete')

    return {
        hasPermission,
        isAdmin,
        canWrite,
        canDelete,
        permissions: user?.permissions || []
    }
}