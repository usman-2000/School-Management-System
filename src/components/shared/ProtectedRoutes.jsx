import { Navigate, Outlet } from 'react-router-dom';
import { usePermissions } from '@/hooks/useAuth';

export const ProtectedRoute = ({ allowedRoles = [], redirectTo = '/login' }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth); // Get from Redux
  const { isAdmin } = usePermissions();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = allowedRoles.length === 0 || (allowedRoles.includes('Admin') && isAdmin());
  if (!hasAccess) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};