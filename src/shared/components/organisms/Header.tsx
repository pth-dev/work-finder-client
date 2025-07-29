import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/authentication/stores/auth-store';
import { PUBLIC_ROUTES, AUTH_ROUTES, DASHBOARD_ROUTES } from '@/constants/routes';

export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(PUBLIC_ROUTES.HOME);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={PUBLIC_ROUTES.HOME} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-gray-900">WorkFinder</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to={PUBLIC_ROUTES.JOBS} 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Jobs
            </Link>
            <Link 
              to={PUBLIC_ROUTES.COMPANIES} 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Companies
            </Link>
            <Link 
              to={PUBLIC_ROUTES.ABOUT} 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              to={PUBLIC_ROUTES.CONTACT} 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={DASHBOARD_ROUTES.APPLICATIONS}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  My Applications
                </Link>
                <Link 
                  to={DASHBOARD_ROUTES.SAVED_JOBS}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Saved Jobs
                </Link>
                
                {/* User Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="font-medium">{user?.name}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link 
                        to={DASHBOARD_ROUTES.PROFILE}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Complete Profile
                      </Link>
                      <Link 
                        to={DASHBOARD_ROUTES.APPLICATIONS}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Applications
                      </Link>
                      <Link 
                        to={DASHBOARD_ROUTES.SAVED_JOBS}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Saved Jobs
                      </Link>
                      <div className="border-t border-gray-100"></div>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to={AUTH_ROUTES.LOGIN}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  to={AUTH_ROUTES.REGISTER}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}