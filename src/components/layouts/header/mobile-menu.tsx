import { Link, useNavigate } from "react-router-dom";
import { User, Briefcase, Heart, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/stores";
import { paths } from "@/config/paths";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

interface NavigationItem {
  name: string;
  href: string;
  isActive: boolean;
}

interface MobileMenuProps {
  navigationItems: NavigationItem[];
  onClose: () => void;
}

export const MobileMenu = ({ navigationItems, onClose }: MobileMenuProps) => {
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      clearAuth();
      onClose();
      navigate(paths.home.getHref());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="lg:hidden border-t border-gray-100 py-4 animate-in slide-in-from-top-2 duration-200">
      <nav className="flex flex-col space-y-2" role="navigation">
        {/* Navigation Links */}
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "text-[15px] font-medium transition-all duration-200 px-4 py-3 rounded-lg mx-2",
              item.isActive
                ? "text-[#1967d2] bg-[#1967d2]/10 font-semibold"
                : "text-[#202124] hover:text-[#1967d2] hover:bg-gray-50"
            )}
            onClick={onClose}
            aria-current={item.isActive ? "page" : undefined}
          >
            {item.name}
          </Link>
        ))}

        {/* Upload CV Link */}
        <Link
          to="#"
          className="text-[#1967d2] text-[15px] font-medium px-4 py-3 rounded-lg mx-2 hover:bg-[#1967d2]/10 transition-colors md:hidden"
          onClick={onClose}
        >
          {t("header.actions.uploadCV")}
        </Link>

        {/* Auth Section */}
        {!isAuthenticated ? (
          <div className="flex flex-col space-y-3 px-2 pt-4 border-t border-gray-100 mt-4 md:hidden">
            <Button
              variant="outline"
              className="bg-[#1967d2]/7 text-[#1967d2] border-[#1967d2]/20 hover:bg-[#1967d2]/10 justify-center h-11 text-[15px] font-medium rounded-lg transition-all duration-200"
              onClick={() => {
                navigate(paths.auth.login.getHref());
                onClose();
              }}
            >
              {t("header.actions.loginRegister")}
            </Button>
          </div>
        ) : (
          <div className="px-2 pt-4 border-t border-gray-100 mt-4 md:hidden">
            {/* User Info */}
            <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1967d2] to-[#1557b8] rounded-full flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.full_name || user.email}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white text-sm font-medium">
                    {user?.full_name?.charAt(0)?.toUpperCase() ||
                      user?.email?.charAt(0)?.toUpperCase() ||
                      "U"}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {user?.full_name || "User"}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {user?.email}
                </div>
              </div>
            </div>

            {/* User Menu Links */}
            <div className="space-y-1">
              <Link
                to={paths.app.profile.getHref()}
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <User className="w-4 h-4 mr-3 text-gray-400" />
                {t("header.userMenu.completeProfile")}
              </Link>
              <Link
                to={paths.app.applications.getHref()}
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <Briefcase className="w-4 h-4 mr-3 text-gray-400" />
                {t("header.userMenu.myApplications")}
              </Link>
              <Link
                to={paths.app.savedJobs.getHref()}
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <Heart className="w-4 h-4 mr-3 text-gray-400" />
                {t("header.userMenu.savedJobs")}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3" />
                {t("header.userMenu.signOut")}
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
