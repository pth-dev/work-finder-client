import {
  Home,
  PanelLeft,
  Briefcase,
  Building2,
  User2,
  Heart,
  FileText,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import { useAuthStore } from "@/stores";
import { cn } from "@/utils";

type SideNavigationItem = {
  name: string;
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const Logo = () => {
  return (
    <Link className="flex items-center text-white" to={paths.home.getHref()}>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <span className="text-blue-600 font-bold text-lg">W</span>
        </div>
        <span className="text-sm font-semibold text-white">WorkFinder</span>
      </div>
    </Link>
  );
};

const Progress = () => {
  const { state, location } = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, [location?.pathname]);

  useEffect(() => {
    if (state === "loading") {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          const newProgress = oldProgress + 10;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 300);

      return () => {
        clearInterval(timer);
      };
    }
  }, [state]);

  if (state !== "loading") {
    return null;
  }

  return (
    <div
      className="fixed left-0 top-0 h-1 bg-blue-500 transition-all duration-200 ease-in-out z-50"
      style={{ width: `${progress}%` }}
    />
  );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate(paths.auth.login.getHref());
  };

  const navigation: SideNavigationItem[] = [
    { name: "Dashboard", to: paths.app.dashboard.getHref(), icon: Home },
    { name: "Jobs", to: paths.app.jobs.getHref(), icon: Briefcase },
    { name: "Companies", to: paths.app.companies.getHref(), icon: Building2 },
    { name: "Saved Jobs", to: paths.app.savedJobs.getHref(), icon: Heart },
    {
      name: "Applications",
      to: paths.app.applications.getHref(),
      icon: FileText,
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Progress />

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-gray-900 sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <div className="flex h-16 shrink-0 items-center px-4">
            <Logo />
          </div>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.name === "Dashboard"}
              className={({ isActive }) =>
                cn(
                  "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium",
                  isActive && "bg-gray-800 text-white"
                )
              }
            >
              <item.icon
                className={cn(
                  "text-gray-400 group-hover:text-gray-300",
                  "mr-4 size-6 shrink-0"
                )}
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
          {/* Mobile Menu Button */}
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="size-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <span className="sr-only">Open user menu</span>
                <User2 className="size-6 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigate(paths.app.profile.getHref())}
                className="cursor-pointer"
              >
                <User2 className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate(paths.app.settings.getHref())}
                className="cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
