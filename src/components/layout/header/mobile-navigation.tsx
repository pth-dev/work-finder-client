"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, User, FileText, Heart, Briefcase, LogOut } from "lucide-react";
import Navigation from "./navigation";
import type { MobileNavigationProps } from "@/types/navigation";
import { useAuth } from "@/hooks/useAuthRedirect";
import { useAuthStore } from "@/stores/user-store";

const MobileNavigation = ({
  isOpen,
  onClose,
  items,
}: MobileNavigationProps) => {
  const { user, isAuthenticated } = useAuth();
  const { logout } = useAuthStore();

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="lg:hidden">
      <div
        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-4">
          <Navigation items={items} isScrolled={true} isMobile={true} />
        </div>
        {/* Mobile Actions */}
        <div className="p-4 border-t space-y-3">
          {isAuthenticated && user ? (
            // Authenticated User Actions
            <>
              {/* User Info */}
              <div className="px-4 py-3 bg-gray-50 rounded-md">
                <p className="font-medium text-gray-900">
                  {user.profile?.firstName && user.profile?.lastName
                    ? `${user.profile.firstName} ${user.profile.lastName}`
                    : user.name || user.email}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-blue-600 capitalize">
                  {user.role.replace("_", " ")}
                </p>
              </div>

              {/* Role-based Actions */}
              {user.role === "job_seeker" && (
                <>
                  <Link
                    href="/upload-cv"
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={onClose}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Upload your CV</span>
                  </Link>
                  <Link
                    href="/my-applications"
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={onClose}
                  >
                    <FileText className="w-4 h-4" />
                    <span>My Applications</span>
                  </Link>
                  <Link
                    href="/saved-jobs"
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={onClose}
                  >
                    <Heart className="w-4 h-4" />
                    <span>Saved Jobs</span>
                  </Link>
                </>
              )}

              {user.role === "employer" && (
                <>
                  <Link
                    href="/post-job"
                    className="block px-4 py-3 bg-[#1967D2] text-white text-center rounded-md hover:bg-[#1967D2]/90 transition-colors font-medium"
                    onClick={onClose}
                  >
                    Job Post
                  </Link>
                  <Link
                    href="/my-jobs"
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={onClose}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>My Job Posts</span>
                  </Link>
                </>
              )}

              {/* Common Actions */}
              <Link
                href="/profile"
                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                onClick={onClose}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            // Guest User Actions
            <>
              <Link
                href="/upload-cv"
                className="block px-4 py-2 text-[#1967D2] hover:bg-blue-50 rounded-md transition-colors font-medium"
                onClick={onClose}
              >
                Upload your CV
              </Link>

              <Link
                href="/login"
                className="block px-4 py-2 text-[#1967D2] bg-[#1967D2]/7 hover:bg-[#1967D2]/10 rounded-md transition-colors font-medium"
                onClick={onClose}
              >
                Login / Register
              </Link>

              <Link
                href="/post-job"
                className="block px-4 py-3 bg-[#1967D2] text-white text-center rounded-md hover:bg-[#1967D2]/90 transition-colors font-medium"
                onClick={onClose}
              >
                Job Post
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
