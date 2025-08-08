import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { ApiJobPost } from "@/features/jobs/types";
import { JobsTable } from "./JobsTable";
import { EmptyState } from "./EmptyState";

interface JobListCardProps {
  jobs: ApiJobPost[];
  loading: boolean;
  onCreateJob: () => void;
  onEditJob: (job: ApiJobPost) => void;
  onDeleteJob: (jobId: number) => void;
  onJobClick?: (job: ApiJobPost) => void;
}

export function JobListCard({
  jobs,
  loading,
  onCreateJob,
  onEditJob,
  onDeleteJob,
  onJobClick,
}: JobListCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="overflow-visible">
      <CardContent className="pt-6 overflow-visible">
        {loading ? (
          <div className="text-center py-8">{t("common.loading")}</div>
        ) : jobs.length === 0 ? (
          <EmptyState onCreateJob={onCreateJob} />
        ) : (
          <div className="overflow-visible">
            <JobsTable
              jobs={jobs}
              onEdit={onEditJob}
              onDelete={onDeleteJob}
              onJobClick={onJobClick}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
