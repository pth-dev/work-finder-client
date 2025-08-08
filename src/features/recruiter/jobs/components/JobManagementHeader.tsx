import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface JobManagementHeaderProps {
  onCreateJob: () => void;
}

export function JobManagementHeader({ onCreateJob }: JobManagementHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("recruiter.jobs.management.title")}
        </h1>
        <p className="text-muted-foreground">
          {t("recruiter.jobs.management.subtitle")}
        </p>
      </div>
      <Button onClick={onCreateJob}>
        <Plus className="h-4 w-4 mr-2" />
        {t("recruiter.jobs.management.createJob")}
      </Button>
    </div>
  );
}