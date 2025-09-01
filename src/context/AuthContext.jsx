// context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    getStoredUser,
    storeUser,
    clearStoredUser,
    loginAPI,
    logoutAPI,
    validateToken,
    getStoredToken
} from '../utils/auth'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    // Initialize auth state on app start
    useEffect(() => {
        const initializeAuth = async () => {
            const storedUser = getStoredUser()
            const token = getStoredToken()

            if (storedUser && token) {
                // Validate token with server (optional)
                const validation = await validateToken(token)

                if (validation.success) {
                    setUser(storedUser)
                } else {
                    // Token invalid, clear storage
                    clearStoredUser()
                }
            }

            setIsLoading(false)
        }

        initializeAuth()
    }, [])

    // Redirect logic after auth state is determined
    useEffect(() => {
        if (!isLoading) {
            const isLoginPage = location.pathname === '/login'

            if (user && isLoginPage) {
                // User is logged in but on login page, redirect to dashboard
                navigate('/dashboard', { replace: true })
            } else if (!user && !isLoginPage) {
                // User is not logged in but trying to access protected page
                navigate('/login', { replace: true })
            }
        }
    }, [user, isLoading, location.pathname, navigate])

    /**
     * Login function
     */
    const login = async (credentials, remember = false) => {
        setIsLoading(true)

        try {
            const result = await loginAPI(credentials)

            if (result.success) {
                const userData = result.data
                setUser(userData)
                storeUser(userData, remember)

                // Navigate to intended page or dashboard
                const from = location.state?.from?.pathname || '/dashboard'
                navigate(from, { replace: true })

                return { success: true }
            } else {
                throw new Error(result.error || 'Login failed')
            }
        } catch (error) {
            console.error('Login error:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    /**
     * Logout function
     */
    const logout = async () => {
        setIsLoading(true)

        try {
            // Call logout API to invalidate token
            await logoutAPI()
        } catch (error) {
            console.error('Logout API error:', error)
        } finally {
            // Clear local state and storage regardless of API response
            setUser(null)
            clearStoredUser()
            setIsLoading(false)
            navigate('/login', { replace: true })
        }
    }

    /**
     * Update user data
     */
    const updateUser = (updatedData) => {
        const newUser = { ...user, ...updatedData }
        setUser(newUser)

        // Update storage
        const isRemembered = localStorage.getItem('user')
        storeUser(newUser, !!isRemembered)
    }

    /**
     * Check if user has specific permission
     */
    const hasPermission = (permission) => {
        return user?.permissions?.includes(permission) || false
    }

    const value = {
        user,
        login,
        logout,
        updateUser,
        hasPermission,
        isLoading,
        isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}