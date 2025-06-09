import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  CircularProgress, 
  Box, 
  Typography, 
  Alert,
  Button
} from '@mui/material';
import { AdminPanelSettings, Warning } from '@mui/icons-material';

const ProtectedRoute = ({ children, requiredRole = 'Administrator', is_super_admin=false }) => {
  const { isAuthenticated, user, loading, error, logout } = useAuth();
  const location = useLocation();

  // Loading state
  if (loading) {
    return (
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        gap={2}
      >
        <AdminPanelSettings sx={{ fontSize: 48, color: 'primary.main' }} />
        <CircularProgress size={40} />
        <Typography variant="h6" color="text.secondary">
          Verifying credentials...
        </Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        gap={2}
        px={2}
      >
        <Warning sx={{ fontSize: 48, color: 'error.main' }} />
        <Alert severity="error" sx={{ maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Authentication Error
          </Typography>
          <Typography variant="body2" sx={{
            marginBottom: "16px"
          }}>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            onClick={logout}
            size="small"
          >
            Return to Login
          </Button>
        </Alert>
      </Box>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        gap={2}
        px={2}
      >
        <Warning sx={{ fontSize: 48, color: 'warning.main' }} />
        <Alert severity="warning" sx={{ maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Access Denied
          </Typography>
          <Typography variant="body2" sx={{
            marginBottom: "16px"
          }}>
            You don't have the required Administrator privileges to access this area.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{
            marginBottom: "16px"
          }}>
            Current role: {user?.role || 'Unknown'}
            <br />
            Required role: {requiredRole}
          </Typography>
          <Button 
            variant="contained" 
            onClick={logout}
            size="small"
          >
            Sign Out
          </Button>
        </Alert>
      </Box>
    );
  }

  if (is_super_admin && !user?.is_superuser) {
    return (
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        gap={2}
        px={2}
      >
        <Warning sx={{ fontSize: 48, color: 'warning.main' }} />
        <Alert severity="warning" sx={{ maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Access Denied
          </Typography>
          <Typography variant="body2" sx={{
            marginBottom: "16px"
          }}>
            You don't have the required super admin privileges to access this area.
          </Typography>
          <Button 
            variant="contained" 
            onClick={logout}
            size="small"
          >
            Sign Out
          </Button>
        </Alert>
      </Box>
    );
  }

  return children;
};

export default ProtectedRoute;