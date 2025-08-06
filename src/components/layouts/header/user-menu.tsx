import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  Briefcase,
  Heart,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/stores";
import { useLogout } from "@/features/authentication/api/logout";
import { paths } from "@/config/paths";
import { cn } from "@/utils";

export const UserMenu = () => {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const logoutMutation = useLogout({
    mutationConfig: {
      onSuccess: () => {
        clearAuth();
        setIsOpen(false);
        navigate(paths.home.getHref());
      },
      onError: (error) => {
        console.error("Logout failed:", error);
        // Clear auth even if logout API fails
        clearAuth();
        setIsOpen(false);
        navigate(paths.home.getHref());
      },
    },
  });

  const handleLogout = async () => {
    try {
      // Clear auth state immediately to prevent API calls
      clearAuth();
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout failed:", error);
      // Auth already cleared above
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-[#1967d2] transition-colors p-2 rounded-lg hover:bg-gray-50"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-[#1967d2] to-[#1557b8] rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
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
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900">
            {user?.full_name || "User"}
          </div>
          <div className="text-xs text-gray-500 capitalize">
            {user?.role || "Member"}
          </div>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-[9999] animate-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
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
          </div>

          <div className="py-2">
            <Link
              to={paths.app.dashboard.getHref()}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4 mr-3 text-gray-400" />
              {t("sidebar.dashboard")}
            </Link>
            <Link
              to={paths.app.applications.getHref()}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Briefcase className="w-4 h-4 mr-3 text-gray-400" />
              {t("header.userMenu.myApplications")}
            </Link>
            <Link
              to={paths.app.savedJobs.getHref()}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="w-4 h-4 mr-3 text-gray-400" />
              {t("header.userMenu.savedJobs")}
            </Link>
            <Link
              to="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4 mr-3 text-gray-400" />
              {t("header.userMenu.settings")}
            </Link>
          </div>

          <div className="border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" />
              {t("header.userMenu.signOut")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
