import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-logo">
          <h1>WorkFinder</h1>
        </div>
        
        <div className="auth-content">
          <Outlet />
        </div>
        
        <div className="auth-footer">
          <p>&copy; {new Date().getFullYear()} WorkFinder. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
