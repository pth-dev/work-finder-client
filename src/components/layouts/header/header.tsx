import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/stores";
import { paths } from "@/config/paths";
import { Button } from "@/components/ui/button";
import WorkFinderIcon from "@/assets/icon.svg";
import { Navigation, useNavigationItems } from "./navigation";
import { UserMenu } from "./user-menu";
import { MobileMenu } from "./mobile-menu";
import { LanguageSwitcher } from "./language-switcher";

export const Header = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigationItems = useNavigationItems();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-[80px]">
          {/* Left Section: Logo + Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link
              to={paths.home.getHref()}
              className="flex items-center hover:opacity-80 transition-opacity"
              aria-label="WorkFinder Home"
            >
              <img
                src={WorkFinderIcon}
                alt="WorkFinder"
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <Navigation className="hidden lg:flex ml-8" />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Upload CV Link */}
            <Link
              to="#"
              className="hidden md:block text-[#1967d2] text-[15px] font-normal hover:underline transition-all"
            >
              {t("header.actions.uploadCV")}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Auth Section */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button
                variant="outline"
                className="hidden md:flex bg-[#1967d2]/7 text-[#1967d2] border-[#1967d2]/20 hover:bg-[#1967d2]/10 px-6 py-2 h-10 text-[15px] font-medium rounded-lg transition-all duration-200"
                onClick={() => navigate(paths.auth.login.getHref())}
              >
                {t("header.actions.loginRegister")}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-[#1967d2] transition-colors"
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
