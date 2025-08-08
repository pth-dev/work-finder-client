import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  onCreateJob: () => void;
}

export function EmptyState({ onCreateJob }: EmptyStateProps) {
  const { t } = useTranslation();

  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground mb-4">
        {t("recruiter.jobs.management.noJobs")}
      </p>
      <Button onClick={onCreateJob}>
        <Plus className="h-4 w-4 mr-2" />
        {t("recruiter.jobs.management.createFirstJob")}
      </Button>
    </div>
  );
}
