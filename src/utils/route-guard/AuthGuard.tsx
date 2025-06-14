import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "hooks/use-auth";
import ROUTER from "constants/Routers";

interface AuthGuardProps {
  permissionRequired?: string[];
}

const AuthGuard = ({ permissionRequired }: AuthGuardProps) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  // Kiểm tra xác thực
  if (!isAuthenticated) {
    return (
      <Navigate
        to={`/${ROUTER.authentication.login}`}
        replace
        state={{ from: location }}
      />
    );
  }

  // Kiểm tra quyền truy cập nếu cần
  if (permissionRequired && user) {
    // Logic kiểm tra quyền dựa trên role của user
    const hasPermission = permissionRequired.includes(user.role);

    if (!hasPermission) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default AuthGuard;
