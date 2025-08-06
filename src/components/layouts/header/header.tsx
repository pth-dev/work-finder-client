import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/stores";
import { paths } from "@/config/paths";
import { Button } from "@/components/ui/button";
import WorkFinderIcon from "@/assets/icon.svg";
import { Navigation, useNavigationItems } from "./navigation";
import { UserMenu } from "./user-menu";
import { MobileMenu } from "./mobile-menu";
import { LanguageSwitcher } from "./language-switcher";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";

export const Header = () => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigationItems = useNavigationItems();

  // Get appropriate home path based on user role
  const getHomePath = () => {
    if (!isAuthenticated || !user) {
      return paths.home.getHref();
    }

    // If user is job_seeker (ứng viên), redirect to home
    if (user.role === "job_seeker") {
      return paths.home.getHref();
    }

    // For other roles (recruiter, admin), redirect to dashboard
    return paths.app.dashboard.getHref();
  };

  // Check if we're on the home page
  const isHomePage =
    location.pathname === "/" || location.pathname === paths.home.getHref();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHomePage]);

  // Dynamic header styling based on page and scroll state
  const getHeaderClasses = () => {
    const baseTransition = "transition-all duration-300";

    if (isHomePage) {
      // Home page:
      // Mobile: sticky positioning to push content down (no overlay)
      // Desktop: fixed positioning to overlay hero and stay during scroll
      const homeBaseClasses = `${baseTransition} sticky md:fixed top-0 left-0 right-0 z-40`;

      if (isScrolled) {
        return `${homeBaseClasses} bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm`;
      } else {
        return `${homeBaseClasses} bg-white md:bg-transparent border-b md:border-transparent border-gray-100`;
      }
    } else {
      // Other pages: sticky positioning with white background
      return `${baseTransition} sticky top-0 z-40 bg-white border-b border-gray-100`;
    }
  };

  return (
    <header className={getHeaderClasses()}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16 md:h-[80px]">
          {/* Left Section: Logo + Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link
              to={getHomePath()}
              className="flex items-center hover:opacity-80 transition-opacity"
              aria-label="WorkFinder Home"
            >
              <img
                src={WorkFinderIcon}
                alt="WorkFinder"
                className="h-10 md:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <Navigation className="hidden lg:flex ml-8" />
          </div>

          {/* Right Section */}
          <div className="flex items-center">
            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Upload CV Link */}
              <Link
                to="#"
                className="text-[#1967d2] text-[15px] font-normal hover:underline transition-all"
              >
                {t("header.actions.uploadCV")}
              </Link>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Notifications - Only show when authenticated */}
              {isAuthenticated && <NotificationBell />}

              {/* Auth Section */}
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Button
                  variant="outline"
                  className="bg-[#1967d2]/7 text-[#1967d2] border-[#1967d2]/20 hover:bg-[#1967d2]/10 px-6 py-2 h-10 text-[15px] font-medium rounded-lg transition-all duration-200"
                  onClick={() => navigate(paths.auth.login.getHref())}
                >
                  {t("header.actions.loginRegister")}
                </Button>
              )}
            </div>

            {/* Mobile Right Section - Minimal */}
            <div className="flex md:hidden items-center space-x-3">
              {/* Language Switcher - Compact */}
              <LanguageSwitcher />

              {/* Notifications - Only show when authenticated */}
              {isAuthenticated && <NotificationBell />}

              {/* Mobile Menu Button */}
              <button
                className="p-2 text-gray-600 hover:text-[#1967d2] transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <MobileMenu
            navigationItems={navigationItems}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};
