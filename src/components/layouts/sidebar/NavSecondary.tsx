import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LogOut } from "lucide-react";
import { paths } from "@/config/paths";
import { useAuthStore } from "@/stores/auth-store";

type UserRole = "job_seeker" | "recruiter" | "admin";

interface NavSecondaryProps {
  userRole: UserRole;
}

export function NavSecondary({}: NavSecondaryProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate(paths.auth.login.getHref());
  };

  return (
    <div className="mt-auto pt-4 border-t border-gray-200">
      <button
        onClick={handleLogout}
        className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-red-600 hover:bg-red-50 hover:text-red-700"
      >
        <LogOut className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
        {t("sidebar.logout", "Logout")}
      </button>
    </div>
  );
}
