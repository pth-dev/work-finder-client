import {
  Home,
  Heart,
  FileText,
  User,
  Settings,
  Briefcase,
  Users,
  Calendar,
  BarChart,
  Building2,
  UserCheck,
} from "lucide-react";
import { paths } from "@/config/paths";

export type UserRole = "job_seeker" | "recruiter" | "admin";

export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  roles: UserRole[];
  group?: string;
  order?: number;
  isActive?: boolean;
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
  // Common dashboard for all roles
  {
    id: "dashboard",
    name: "sidebar.dashboard",
    href: paths.app.dashboard.getHref(),
    icon: Home,
    roles: ["job_seeker"],
    group: "main",
    order: 1,
  },
  {
    id: "recruiter-dashboard",
    name: "sidebar.dashboard",
    href: paths.recruiter.dashboard.getHref(),
    icon: Home,
    roles: ["recruiter"],
    group: "main",
    order: 1,
  },
  {
    id: "admin-dashboard",
    name: "sidebar.dashboard",
    href: paths.admin.dashboard.getHref(),
    icon: Home,
    roles: ["admin"],
    group: "main",
    order: 1,
  },

  // Job Seeker specific items
  {
    id: "saved-jobs",
    name: "sidebar.savedJobs",
    href: paths.app.savedJobs.getHref(),
    icon: Heart,
    roles: ["job_seeker"],
    group: "main",
    order: 2,
  },
  {
    id: "applications",
    name: "sidebar.myApplications",
    href: paths.app.applications.getHref(),
    icon: FileText,
    roles: ["job_seeker"],
    group: "main",
    order: 3,
  },
  {
    id: "resume",
    name: "sidebar.resumeManagement",
    href: paths.app.resume.getHref(),
    icon: User,
    roles: ["job_seeker"],
    group: "main",
    order: 4,
  },
  {
    id: "job-seeker-settings",
    name: "sidebar.accountSettings",
    href: paths.app.settings.getHref(),
    icon: Settings,
    roles: ["job_seeker"],
    group: "settings",
    order: 5,
  },

  // Recruiter specific items
  {
    id: "job-management",
    name: "sidebar.jobManagement",
    href: paths.recruiter.jobs.getHref(),
    icon: Briefcase,
    roles: ["recruiter"],
    group: "main",
    order: 2,
  },
  {
    id: "candidates",
    name: "sidebar.candidates",
    href: paths.recruiter.candidates.getHref(),
    icon: Users,
    roles: ["recruiter"],
    group: "main",
    order: 3,
  },
  {
    id: "interviews",
    name: "sidebar.interviews",
    href: paths.recruiter.interviews.getHref(),
    icon: Calendar,
    roles: ["recruiter"],
    group: "main",
    order: 4,
  },
  {
    id: "recruiter-analytics",
    name: "sidebar.analytics",
    href: paths.recruiter.analytics.getHref(),
    icon: BarChart,
    roles: ["recruiter"],
    group: "main",
    order: 5,
  },

  // Admin specific items
  {
    id: "user-management",
    name: "sidebar.userManagement",
    href: paths.admin.users.getHref(),
    icon: UserCheck,
    roles: ["admin"],
    group: "main",
    order: 2,
  },
  {
    id: "company-management",
    name: "sidebar.companyManagement",
    href: paths.admin.companies.getHref(),
    icon: Building2,
    roles: ["admin"],
    group: "main",
    order: 3,
  },
  {
    id: "admin-analytics",
    name: "sidebar.systemAnalytics",
    href: paths.admin.analytics.getHref(),
    icon: BarChart,
    roles: ["admin"],
    group: "main",
    order: 4,
  },
];

export class NavigationService {
  /**
   * Get navigation items filtered by user role
   */
  static getNavigationForRole(userRole: UserRole): NavigationItem[] {
    return NAVIGATION_CONFIG.filter((item) =>
      item.roles.includes(userRole)
    ).sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  /**
   * Get grouped navigation items
   */
  static getGroupedNavigation(
    userRole: UserRole
  ): Record<string, NavigationItem[]> {
    const items = this.getNavigationForRole(userRole);
    return items.reduce((groups, item) => {
      const group = item.group || "default";
      if (!groups[group]) groups[group] = [];
      groups[group].push(item);
      return groups;
    }, {} as Record<string, NavigationItem[]>);
  }

  /**
   * Get active navigation item based on current path
   */
  static getActiveItem(
    currentPath: string,
    userRole: UserRole
  ): NavigationItem | null {
    const items = this.getNavigationForRole(userRole);
    return items.find((item) => currentPath.startsWith(item.href)) || null;
  }

  /**
   * Get default dashboard path for role
   */
  static getDefaultDashboard(userRole: UserRole): string {
    const dashboardItem = NAVIGATION_CONFIG.find(
      (item) => item.id.includes("dashboard") && item.roles.includes(userRole)
    );
    return dashboardItem?.href || paths.home.getHref();
  }
}
