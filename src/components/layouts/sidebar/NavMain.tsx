import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils";
import { NavigationService, type UserRole } from "@/config/navigation";

interface NavMainProps {
  userRole: UserRole;
}

export function NavMain({ userRole }: NavMainProps) {
  const { t } = useTranslation();

  const navigationItems = NavigationService.getNavigationForRole(userRole);

  return (
    <div className="space-y-1">
      {navigationItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.href}
          end={item.href === NavigationService.getDefaultDashboard(userRole)}
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
          {t(item.name)}
        </NavLink>
      ))}
    </div>
  );
}
