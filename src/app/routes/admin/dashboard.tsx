import { useTranslation } from "react-i18next";
import { JobStatistics } from "@/features/admin/jobs/components";

export default function AdminDashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {t("admin.dashboard.title", "Admin Dashboard")}
        </h1>
        <p className="text-muted-foreground">
          {t("admin.dashboard.subtitle", "Welcome to the admin control panel")}
        </p>
      </div>

      {/* Job Statistics */}
      <JobStatistics />
    </div>
  );
}
