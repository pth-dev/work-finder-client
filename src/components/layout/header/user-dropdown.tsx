"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  Briefcase,
  Heart,
  Crown,
  Shield,
} from "lucide-react";
import { useAuthStore } from "@/stores/user-store";
import type { User as UserType } from "@/types/user";
import { cn } from "@/lib/utils";

interface UserDropdownProps {
  user: UserType;
  className?: string;
}

export function UserDropdown({ user, className = "" }: UserDropdownProps) {
  const router = useRouter();
  const { logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Early return if user is not available
  if (!user) {
    return null;
  }

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get user display name
  const displayName =
    user.profile?.firstName && user.profile?.lastName
      ? `${user.profile.firstName} ${user.profile.lastName}`
      : user.name || user.email || "User";

  // Get user initials for avatar fallback
  const initials = (displayName || "U")
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Get role icon and color
  const getRoleInfo = () => {
    switch (user.role) {
      case "employer":
        return { icon: Crown, color: "text-purple-600", bg: "bg-purple-50" };
      case "admin":
        return { icon: Shield, color: "text-red-600", bg: "bg-red-50" };
      default:
        return { icon: User, color: "text-blue-600", bg: "bg-blue-50" };
    }
  };

  // Role-based menu items
  const getMenuItems = () => {
    const commonItems = [
      {
        href: "/profile",
        icon: User,
        label: "My Profile",
        description: "View and edit your profile",
      },
      {
        href: "/settings",
        icon: Settings,
        label: "Account Settings",
        description: "Manage your preferences",
      },
    ];

    if (user.role === "job_seeker") {
      return [
        ...commonItems,
        {
          href: "/my-applications",
          icon: FileText,
          label: "My Applications",
          description: "Track your job applications",
        },
        {
          href: "/saved-jobs",
          icon: Heart,
          label: "Saved Jobs",
          description: "View your bookmarked jobs",
        },
      ];
    }

    if (user.role === "employer") {
      return [
        ...commonItems,
        {
          href: "/my-jobs",
          icon: Briefcase,
          label: "My Job Posts",
          description: "Manage your job listings",
        },
        {
          href: "/candidates",
          icon: User,
          label: "Candidates",
          description: "Browse candidate profiles",
        },
      ];
    }

    return commonItems;
  };

  const roleInfo = getRoleInfo();

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-[#202124] hover:text-[#1967D2] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-0 p-1 rounded-lg hover:bg-gray-50"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Account menu for ${displayName}`}
      >
        <Avatar className="w-8 h-8 flex-shrink-0 ring-2 ring-transparent hover:ring-blue-100 transition-all duration-200">
          <AvatarImage src={user.avatar} alt={displayName} />
          <AvatarFallback className="bg-gradient-to-br from-[#1967D2] to-[#1557B8] text-white text-sm font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <span className="font-['Jost',sans-serif] text-[15px] font-medium truncate min-w-0 max-w-[100px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px]">
          {displayName}
        </span>
        <ChevronDown
          className={cn(
            "w-3 h-3 flex-shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Custom Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] sm:max-w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 ring-2 ring-white shadow-sm">
                <AvatarImage src={user.avatar} alt={displayName} />
                <AvatarFallback className="bg-gradient-to-br from-[#1967D2] to-[#1557B8] text-white font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {displayName}
                </p>
                <p className="text-sm text-gray-600 truncate">{user.email}</p>
                <div
                  className={cn(
                    "inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium mt-1",
                    roleInfo.bg,
                    roleInfo.color
                  )}
                >
                  <roleInfo.icon className="w-3 h-3" />
                  <span className="capitalize">
                    {user.role.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {getMenuItems().map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-6 py-3 hover:bg-gray-50 transition-colors duration-150 group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors duration-150">
                  <item.icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-150" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 group-hover:text-blue-900 transition-colors duration-150">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Separator */}
          <div className="border-t border-gray-100"></div>

          {/* Logout Button */}
          <div className="p-2">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors duration-150">
                <LogOut className="w-4 h-4 text-red-600" />
              </div>
              <span className="font-medium">
                {isLoading ? "Logging out..." : "Sign Out"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
