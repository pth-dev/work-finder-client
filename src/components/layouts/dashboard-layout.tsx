import { Home, Heart, FileText, User, Settings, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { ScrollToTop } from "@/components";
import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import { useAuthStore } from "@/stores";
import { cn } from "@/utils";
import { LanguageSwitcher } from "./header/language-switcher";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { UserMenu } from "./header/user-menu";
import { useTranslation } from "react-i18next";
import WorkFinderIcon from "@/assets/icon.svg";

type SideNavigationItem = {
  name: string;
  to?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  isLogout?: boolean;
};

const Logo = () => {
  return (
    <Link className="flex items-center" to={paths.home.getHref()}>
      <img src={WorkFinderIcon} alt="WorkFinder" className="h-12 w-auto" />
    </Link>
  );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    clearAuth();
    navigate(paths.auth.login.getHref());
  };

  const navigation: SideNavigationItem[] = [
    {
      name: t("sidebar.dashboard", "Dashboard"),
      to: paths.app.dashboard.getHref(),
      icon: Home,
    },
    {
      name: t("sidebar.savedJobs", "Saved Jobs"),
      to: paths.app.savedJobs.getHref(),
      icon: Heart,
    },
    {
      name: t("sidebar.myApplications", "My Applications"),
      to: paths.app.applications.getHref(),
      icon: FileText,
    },
    {
      name: t("sidebar.resumeManagement", "Resume Management"),
      to: paths.app.resume.getHref(),
      icon: User,
    },
    {
      name: t("sidebar.accountSettings", "Account Settings"),
      to: paths.app.settings.getHref(),
      icon: Settings,
    },
    {
      name: t("sidebar.logout", "Logout"),
      icon: LogOut,
      onClick: handleLogout,
      isLogout: true,
    },
  ];

  return (
    <div className="h-screen flex bg-gray-50">
      <ScrollToTop />

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Logo />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            if (item.isLogout) {
              return (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <item.icon
                    className="mr-3 h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item.name}
                </button>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.to!}
                end={item.to === paths.app.dashboard.getHref()}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )
                }
              >
                <item.icon
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Notifications - Only show when authenticated */}
            {isAuthenticated && <NotificationBell />}

            {/* User Menu */}
            {isAuthenticated && <UserMenu />}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container-xl mx-auto p-6 h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
