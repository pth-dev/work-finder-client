import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../auth/tokenService';

interface PrivateRouteProps {
  redirectPath?: string;
}

const PrivateRoute = ({ redirectPath = '/auth/login' }: PrivateRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
