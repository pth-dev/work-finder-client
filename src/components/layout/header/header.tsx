"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAVIGATION_ITEMS, COMPANY_INFO } from "@/constants/navigation";
import { CompactLanguageSwitcher } from "@/components/ui/language-switcher";
import MobileNavigation from "./mobile-navigation";
import { UserDropdown } from "./user-dropdown";
import { useAuth, useAuthRedirect } from "@/hooks/useAuthRedirect";

const Header = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Authentication state and redirect logic
  const { user, isAuthenticated, isLoading } = useAuth();
  useAuthRedirect();

  // Handle client-side only code
  useEffect(() => {
    setIsClient(true);

    // Initialize scroll state after hydration
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent layout shift when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Header - Fixed with overlay */}
      <header
        className={`w-full transition-all duration-300 fixed top-0 z-50 hidden lg:block ${
          isClient && isScrolled
            ? "bg-white border-b border-gray-100 shadow-sm"
            : "bg-transparent border-0 shadow-none"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 lg:gap-8 xl:gap-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 flex-shrink-0 min-w-0"
            >
              {/* Logo Icon */}
              <div className="w-8 h-8 bg-[#1967D2] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium text-sm">
                  {COMPANY_INFO.shortName}
                </span>
              </div>
              {/* Logo Text */}
              <span className="text-[25px] font-medium text-[#202124] font-['Jost',sans-serif] whitespace-nowrap">
                {COMPANY_INFO.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1">
              {NAVIGATION_ITEMS.map((item) => (
                <div key={item.id} className="relative">
                  {item.children && item.children.length > 0 ? (
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger className="flex items-center space-x-1 text-[#202124] hover:text-[#1967D2] transition-colors py-2 focus:outline-none font-['Jost',sans-serif] text-[15px]">
                        <span>{item.label}</span>
                        <ChevronDown className="w-3 h-3" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        sideOffset={12}
                        align="start"
                        avoidCollisions={true}
                        collisionPadding={8}
                      >
                        {item.children.map((child) => (
                          <DropdownMenuItem
                            key={child.href}
                            onClick={() => router.push(child.href)}
                          >
                            {child.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-[#202124] hover:text-[#1967D2] transition-colors font-['Jost',sans-serif] text-[15px]"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-shrink-0">
              {/* Language Switcher */}
              <CompactLanguageSwitcher />

              {isAuthenticated && user && user.email ? (
                // Authenticated User UI
                <>
                  {/* Upload CV Link - Only for job seekers */}
                  {user.role === "job_seeker" && (
                    <Link
                      href="/upload-cv"
                      className="text-[#1967D2] hover:text-[#1967D2]/80 transition-colors font-['Jost',sans-serif] text-[15px] whitespace-nowrap"
                    >
                      Upload your CV
                    </Link>
                  )}

                  {/* Job Post Button - Only for employers */}
                  {user.role === "employer" && (
                    <Link
                      href="/post-job"
                      className="px-4 py-2 bg-[#1967D2] text-white hover:bg-[#1967D2]/90 transition-colors rounded-lg font-['Jost',sans-serif] text-[15px] whitespace-nowrap"
                    >
                      Job Post
                    </Link>
                  )}

                  {/* User Dropdown */}
                  <UserDropdown user={user} />
                </>
              ) : (
                // Guest User UI
                <>
                  {/* Upload CV Link */}
                  <Link
                    href="/upload-cv"
                    className="text-[#1967D2] hover:text-[#1967D2]/80 transition-colors font-['Jost',sans-serif] text-[15px] whitespace-nowrap"
                  >
                    Upload your CV
                  </Link>

                  {/* Login/Register Button */}
                  <Link
                    href="/login"
                    className="px-4 py-2 bg-[#1967D2]/7 text-[#1967D2] hover:bg-[#1967D2]/10 transition-colors rounded-lg font-['Jost',sans-serif] text-[15px] whitespace-nowrap"
                  >
                    Login / Register
                  </Link>

                  {/* Job Post Button */}
                  <Link
                    href="/post-job"
                    className="px-4 py-2 bg-[#1967D2] text-white hover:bg-[#1967D2]/90 transition-colors rounded-lg font-['Jost',sans-serif] text-[15px] whitespace-nowrap"
                  >
                    Job Post
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header - Static with white background */}
      <header className="w-full bg-white border-b border-gray-100 shadow-sm lg:hidden relative z-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 min-w-0"
            >
              {/* Logo Icon */}
              <div className="w-8 h-8 bg-[#1967D2] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium text-sm">
                  {COMPANY_INFO.shortName}
                </span>
              </div>
              {/* Logo Text */}
              <span className="text-[22px] sm:text-[25px] font-medium text-[#202124] font-['Jost',sans-serif] truncate">
                {COMPANY_INFO.name}
              </span>
            </Link>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              {/* Language Switcher */}
              <div className="flex-shrink-0">
                <CompactLanguageSwitcher />
              </div>

              {/* User Avatar for Mobile - Only show if authenticated */}
              {isAuthenticated && user && user.email && (
                <div className="flex-shrink-0">
                  <UserDropdown user={user} className="lg:hidden" />
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="p-2 rounded-md text-[#202124] hover:text-[#1967D2] hover:bg-gray-50 transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
      </header>

      {/* Mobile Navigation Overlay */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={NAVIGATION_ITEMS}
      />
    </>
  );
};

export default Header;
