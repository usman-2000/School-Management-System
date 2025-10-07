import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { useLoginMutation, useLogoutMutation } from '@/services/authApi'; // Add logout mutation
import { useDispatch } from 'react-redux';
import { setCredentials, logout as logoutAction } from '@/store/authSlice';

/**
 * Custom hook to use authentication context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

/**
 * Hook for login functionality
 */
export const useLogin = () => {
  const [loginMutation, { isLoading: loginLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (credentials, remember = false) => {
    try {
      const response = await loginMutation(credentials).unwrap(); // Call RTK Query login mutation
      const { token, user } = response;
      // Store token in localStorage or sessionStorage based on remember
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('authToken', token);
      // Update Redux state
      dispatch(setCredentials({ token, user }));
      navigate('/dashboard'); // Redirect to dashboard (or adjust based on role later)
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error?.data?.message || 'Login failed',
      };
    }
  };

  return { handleLogin, isLoading: loginLoading };
};

/**
 * Hook for logout functionality
 */
export const useLogout = () => {
  const [logoutMutation, { isLoading: logoutLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap(); // Call RTK Query logout mutation (if exists)
      dispatch(logoutAction()); // Clear Redux state
      navigate('/login');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      dispatch(logoutAction()); // Clear state even if API fails
      navigate('/login');
      return {
        success: false,
        error: 'Logout failed',
      };
    }
  };

  return { handleLogout, isLoading: logoutLoading };
};

/**
 * Hook to check user permissions
 */
export const usePermissions = () => {
  const { user } = useAuth();

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  const isAdmin = () => user?.role === 'Admin';
  const canWrite = () => hasPermission('write');
  const canDelete = () => hasPermission('delete');

  return {
    hasPermission,
    isAdmin,
    canWrite,
    canDelete,
    permissions: user?.permissions || [],
  };
};