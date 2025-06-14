import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';

const GuestGuard = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

export default GuestGuard;
