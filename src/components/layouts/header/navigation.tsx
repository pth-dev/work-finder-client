import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { paths } from "@/config/paths";
import { cn } from "@/utils";
import { useAuthStore } from "@/stores";

interface NavigationItem {
  name: string;
  href: string;
  isActive: boolean;
}

interface NavigationProps {
  className?: string;
}

export const Navigation = ({ className }: NavigationProps) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuthStore();

  const getNavigationItems = (): NavigationItem[] => {
    // Base navigation for all users
    const baseItems: NavigationItem[] = [
      {
        name: t("header.navigation.findJobs"),
        href: paths.jobs.root.getHref(),
        isActive: location.pathname.startsWith(paths.jobs.root.getHref()),
      },
      {
        name: t("header.navigation.employers"),
        href: paths.companies.root.getHref(),
        isActive: location.pathname.startsWith(paths.companies.root.getHref()),
      },
    ];

    // Add role-specific navigation
    if (isAuthenticated && user) {
      if (user.role === "recruiter") {
        // Recruiter-specific navigation
        baseItems.push({
          name: t("header.navigation.candidates"),
          href: paths.candidates?.root?.getHref() || "#",
          isActive: location.pathname.startsWith("/candidates"),
        });
        baseItems.push({
          name: t("header.navigation.postJob"),
          href: paths.app.postJob?.getHref() || "#",
          isActive: location.pathname.startsWith("/app/post-job"),
        });
      } else if (user.role === "job_seeker") {
        // Job seeker-specific navigation
        baseItems.push({
          name: t("header.navigation.myApplications"),
          href: paths.app.applications.getHref(),
          isActive: location.pathname.startsWith(
            paths.app.applications.getHref()
          ),
        });
      }
    } else {
      // For non-authenticated users, show candidates link
      baseItems.push({
        name: t("header.navigation.candidates"),
        href: "#",
        isActive: false,
      });
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <nav
      className={cn("flex items-center space-x-8", className)}
      role="navigation"
    >
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            "relative text-[15px] font-medium transition-all duration-200 hover:text-[#1967d2] py-2",
            item.isActive
              ? "text-[#1967d2] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1967d2] after:rounded-full"
              : "text-[#202124] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-[#1967d2]/30 hover:after:rounded-full"
          )}
          aria-current={item.isActive ? "page" : undefined}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

// Export navigation items for use in mobile menu
export const useNavigationItems = (): NavigationItem[] => {
  const location = useLocation();
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuthStore();

  const getNavigationItems = (): NavigationItem[] => {
    // Base navigation for all users
    const baseItems: NavigationItem[] = [
      {
        name: t("header.navigation.findJobs"),
        href: paths.jobs.root.getHref(),
        isActive: location.pathname.startsWith(paths.jobs.root.getHref()),
      },
      {
        name: t("header.navigation.employers"),
        href: paths.companies.root.getHref(),
        isActive: location.pathname.startsWith(paths.companies.root.getHref()),
      },
    ];

    // Add role-specific navigation
    if (isAuthenticated && user) {
      if (user.role === "recruiter") {
        // Recruiter-specific navigation
        baseItems.push({
          name: t("header.navigation.candidates"),
          href: paths.candidates?.root?.getHref() || "#",
          isActive: location.pathname.startsWith("/candidates"),
        });
        baseItems.push({
          name: t("header.navigation.postJob"),
          href: paths.app.postJob?.getHref() || "#",
          isActive: location.pathname.startsWith("/app/post-job"),
        });
      } else if (user.role === "job_seeker") {
        // Job seeker-specific navigation
        baseItems.push({
          name: t("header.navigation.myApplications"),
          href: paths.app.applications.getHref(),
          isActive: location.pathname.startsWith(
            paths.app.applications.getHref()
          ),
        });
      }
    } else {
      // For non-authenticated users, show candidates link
      baseItems.push({
        name: t("header.navigation.candidates"),
        href: "#",
        isActive: false,
      });
    }

    return baseItems;
  };

  return getNavigationItems();
};
