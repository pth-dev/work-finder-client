"use client";

import Link from "next/link";
import {
  User,
  FileText,
  Bookmark,
  Settings,
  Home,
  Briefcase,
  Users,
  Building2,
  PlusCircle,
} from "lucide-react";
import { DASHBOARD_ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/stores/user-store";
import { useTranslation } from "@/hooks/useTranslation";

// Role-based navigation items
const getNavigationItems = (userRole: string, t: any) => {
  const commonItems = [
    {
      label: t("dashboard.overview"),
      href: DASHBOARD_ROUTES.OVERVIEW,
      icon: Home,
      roles: ["job_seeker", "employer"],
    },
    {
      label: t("dashboard.profile"),
      href: DASHBOARD_ROUTES.PROFILE,
      icon: User,
      roles: ["job_seeker", "employer"],
    },
    {
      label: t("dashboard.settings"),
      href: DASHBOARD_ROUTES.SETTINGS,
      icon: Settings,
      roles: ["job_seeker", "employer"],
    },
  ];

  const jobSeekerItems = [
    {
      label: t("dashboard.myApplications"),
      href: DASHBOARD_ROUTES.APPLICATIONS,
      icon: Briefcase,
      roles: ["job_seeker"],
    },
    {
      label: t("dashboard.savedJobs"),
      href: DASHBOARD_ROUTES.SAVED_JOBS,
      icon: Bookmark,
      roles: ["job_seeker"],
    },
    {
      label: t("dashboard.resume"),
      href: DASHBOARD_ROUTES.RESUME,
      icon: FileText,
      roles: ["job_seeker"],
    },
  ];

  const employerItems = [
    {
      label: "My Jobs",
      href: "/dashboard/jobs",
      icon: Briefcase,
      roles: ["employer"],
    },
    {
      label: "Candidates",
      href: "/dashboard/candidates",
      icon: Users,
      roles: ["employer"],
    },
    {
      label: "Post Job",
      href: "/dashboard/jobs/new",
      icon: PlusCircle,
      roles: ["employer"],
    },
    {
      label: "Company Profile",
      href: "/dashboard/company",
      icon: Building2,
      roles: ["employer"],
    },
  ];

  const allItems = [...commonItems, ...jobSeekerItems, ...employerItems];
  return allItems.filter((item) => item.roles.includes(userRole));
};

export function DashboardSidebar() {
  const { user } = useAuthStore();
  const { t } = useTranslation();

  // Get navigation items based on user role
  const userRole = user?.role || "job_seeker";
  const navigationItems = getNavigationItems(userRole, t);

  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 group"
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
