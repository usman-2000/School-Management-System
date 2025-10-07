import { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation, useLogoutMutation, useValidateTokenMutation } from '@/services/authApi';
import { setCredentials, logout as logoutAction } from '@/store/authSlice';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, token, isAuthenticated } = useSelector((state) => state.auth); // Get from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();
  const [validateTokenMutation] = useValidateTokenMutation();

  // Initialize auth state on app start
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      if (storedToken) {
        try {
          await validateTokenMutation(storedToken).unwrap();
          // setCredentials dispatched in mutation
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
          dispatch(logoutAction());
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [dispatch, validateTokenMutation]);

  // Redirect logic after auth state is determined
  useEffect(() => {
    if (!isLoading) {
      const isLoginPage = location.pathname === '/login';
      if (isAuthenticated && isLoginPage) {
        // Redirect to dashboard or intended page
        const from = location.state?.from?.pathname || (user?.role === 'Admin' ? '/dashboard' : '/students');
        navigate(from, { replace: true });
      } else if (!isAuthenticated && !isLoginPage) {
        // Redirect to login for unauthorized access
        navigate('/login', { replace: true, state: { from: location } });
      }
    }
  }, [isAuthenticated, user, isLoading, location, navigate]);

  /**
   * Login function
   */
  const login = async (credentials, remember = false) => {
    setIsLoading(true);
    try {
      const result = await loginMutation(credentials).unwrap();
      const { token, user } = result;
      // Store token in localStorage or sessionStorage
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('authToken', token);
      // setCredentials dispatched in mutation
      const from = location.state?.from?.pathname || (user.role === 'Admin' ? '/dashboard' : '/students');
      navigate(from, { replace: true });
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout function
   */
  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutMutation().unwrap();
      // logoutAction dispatched in mutation
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      dispatch(logoutAction());
      setIsLoading(false);
      navigate('/login', { replace: true });
    }
  };

  /**
   * Update user data
   */
  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    dispatch(setCredentials({ token, user: newUser }));
    // Update storage
    const isRemembered = !!localStorage.getItem('authToken');
    const storage = isRemembered ? localStorage : sessionStorage;
    storage.setItem('authToken', token); // Token unchanged
  };

  /**
   * Check if user has specific permission
   */
  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    hasPermission,
    isLoading,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};