import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { ApiJobPost, ApiJobStatus } from "@/features/jobs/types";

interface JobsTableProps {
  jobs: ApiJobPost[];
  onEdit: (job: ApiJobPost) => void;
  onDelete: (jobId: number) => void;
  onJobClick?: (job: ApiJobPost) => void;
}

export function JobsTable({
  jobs,
  onEdit,
  onDelete,
  onJobClick,
}: JobsTableProps) {
  const { t } = useTranslation();

  const getStatusBadge = (status: ApiJobStatus) => {
    const statusColors: Record<ApiJobStatus, string> = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      closed: "bg-red-100 text-red-800",
      pending: "bg-blue-100 text-blue-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={statusColors[status]}>
        {t(`recruiter.jobs.status.${status}`)}
      </Badge>
    );
  };

  const formatSalary = (job: ApiJobPost) => {
    if (job.salary) return job.salary;
    if (job.salary_min && job.salary_max) {
      return `$${job.salary_min} - $${job.salary_max}`;
    }
    if (job.salary_min) return `From $${job.salary_min}`;
    if (job.salary_max) return `Up to $${job.salary_max}`;
    return t("common.notSpecified");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="overflow-visible">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="align-middle">
              {t("recruiter.jobs.fields.title")}
            </TableHead>
            <TableHead className="align-middle text-center">
              {t("recruiter.jobs.fields.type")}
            </TableHead>
            <TableHead className="align-middle text-center">
              {t("recruiter.jobs.fields.location")}
            </TableHead>
            <TableHead className="align-middle text-center">
              {t("recruiter.jobs.fields.salary")}
            </TableHead>
            <TableHead className="align-middle text-center">
              {t("recruiter.jobs.fields.status")}
            </TableHead>
            <TableHead className="align-middle text-center">
              {t("recruiter.jobs.fields.applications")}
            </TableHead>
            <TableHead className="align-middle text-center">
              {t("recruiter.jobs.fields.postedDate")}
            </TableHead>
            <TableHead className="align-middle text-center">
              {t("recruiter.jobs.fields.actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.job_id}>
              <TableCell className="font-medium align-middle">
                <div className="max-w-[200px]">
                  <div
                    className={`font-semibold truncate ${
                      onJobClick
                        ? "cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
                        : ""
                    }`}
                    onClick={onJobClick ? () => onJobClick(job) : undefined}
                    title={job.job_title} // Show full title on hover
                  >
                    {job.job_title}
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    {job.company?.company_name}
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-middle text-center">
                {job.job_type ? t(`recruiter.jobs.type.${job.job_type}`) : "-"}
              </TableCell>
              <TableCell className="align-middle text-center">
                {job.location || t("common.notSpecified")}
              </TableCell>
              <TableCell className="align-middle text-center">
                {formatSalary(job)}
              </TableCell>
              <TableCell className="align-middle text-center">
                {getStatusBadge(job.status)}
              </TableCell>
              <TableCell className="align-middle text-center">
                <div className="flex flex-col items-center space-y-1">
                  <span className="font-semibold text-lg">
                    {job.application_count || 0}
                  </span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Eye className="h-3 w-3 mr-1" />
                    {job.view_count || 0} {t("common.views")}
                  </div>
                </div>
              </TableCell>
              <TableCell className="align-middle text-center">
                {formatDate(job.posted_date)}
              </TableCell>
              <TableCell className="align-middle text-center">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(job);
                    }}
                    className="h-8 w-8 p-0"
                    title={t("recruiter.jobs.actions.edit")}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(job.job_id);
                    }}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    title={t("recruiter.jobs.actions.delete")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
