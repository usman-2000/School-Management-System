import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import StudentsPage from './pages/students/StudentsPage';
import InvoicePage from './pages/invoice/InvoicePage';
import RoleUserPage from './pages/role-user/RoleUserPage';
import ReportsPage from './pages/reports/ReportsPage';
import FeeStructurePage from './pages/fee-structure/FeeStructurePage';
import ProfilePage from './pages/profile/ProfilePage';
import SettingsPage from './pages/settings/SettingsPage';
import LoginPage from './pages/auth/loginPage';
import AddStudentForm from './pages/students/AddStudentPage';
import { ProtectedRoute } from './components/shared/ProtectedRoutes';

function App() {
  return (
    // <Router>
      <AuthProvider>
        <Routes>
          {/* Public Route - Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes with Dashboard Layout */}
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            {/* Admin-only Routes */}
            <Route
              element={<ProtectedRoute allowedRoles={['Admin']} redirectTo="/students" />}
            >
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="role-user" element={<RoleUserPage />} />
            </Route>
            {/* Accessible to both Admin and Teacher */}
            <Route path="students" element={<StudentsPage />} />
            <Route path="/students/addnewstudent" element={<AddStudentForm />} />
            <Route path="invoice" element={<InvoicePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="fee-structure" element={<FeeStructurePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    // </Router>
  );
}

export default App;