import { useTranslation } from "react-i18next";
import { PendingJobsList } from "@/features/admin/jobs/components";

export default function AdminJobs() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {t("admin.jobs.title", "Content Moderation")}
        </h1>
        <p className="text-muted-foreground">
          {t(
            "admin.jobs.subtitle",
            "Review and moderate job postings and content"
          )}
        </p>
      </div>

      {/* Pending Jobs List */}
      <PendingJobsList />
    </div>
  );
}
