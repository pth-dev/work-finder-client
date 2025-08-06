import { useTranslation } from "react-i18next";
import { User } from "@/stores/auth-store";

interface DashboardHeaderProps {
  user: User | null;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const { t } = useTranslation();

  const displayName = user?.full_name || user?.email?.split("@")[0] || t("dashboard.greeting.defaultName");

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        {t("dashboard.greeting.hello", { name: displayName })}
      </h1>
      <p className="text-gray-600 mt-2">
        {t("dashboard.greeting.subtitle")}
      </p>
    </div>
  );
}
