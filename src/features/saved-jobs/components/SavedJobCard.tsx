import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, ExternalLink, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CompanyLogo } from "@/components";
import { formatSalary } from "@/utils/common";
import { SavedJobPost } from "../types";
import { useSaveJob } from "../hooks";

interface SavedJobCardProps {
  job: SavedJobPost;
  onRemove?: (jobId: number) => void;
}

// Helper function to get job type color
const getJobTypeColor = (jobType: string) => {
  switch (jobType?.toLowerCase()) {
    case "full_time":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "part_time":
      return "bg-green-100 text-green-800 border-green-200";
    case "contract":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "internship":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export function SavedJobCard({ job, onRemove }: SavedJobCardProps) {
  const { t } = useTranslation();
  const { unsaveJob, isUnsaving } = useSaveJob();

  // job is now directly a JobPost, not nested in job_post
  const company = job.company;

  const handleUnsave = () => {
    unsaveJob(job.job_id, {
      onSuccess: () => {
        onRemove?.(job.job_id);
      },
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          {/* Job Info */}
          <div className="flex items-start space-x-3 flex-1">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <CompanyLogo
                src={company?.company_image}
                companyName={company?.company_name || ""}
                size="md"
                variant="rounded"
              />
            </div>

            {/* Job Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 truncate mb-1 overflow-hidden whitespace-nowrap">
                    {job.job_title || t("jobs.unknownJob", "Unknown Job")}
                  </h3>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1 min-w-0 flex-1">
                      <Building2 className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">
                        {company?.company_name || t("jobs.unknownCompany")}
                      </span>
                    </div>

                    {job.location && (
                      <div className="flex items-center space-x-1 min-w-0 flex-shrink-0">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate max-w-[120px]">
                          {job.location}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Salary */}
                  {(job.salary || job.salary_min || job.salary_max) && (
                    <div className="text-sm text-green-600 font-medium mb-2">
                      {formatSalary({
                        salary: job.salary,
                        salary_min: job.salary_min,
                        salary_max: job.salary_max,
                      })}
                    </div>
                  )}

                  {/* Job Type */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {job.job_type && (
                        <Badge
                          variant="outline"
                          className={`text-xs ${getJobTypeColor(job.job_type)}`}
                        >
                          {t(`jobs.jobTypes.${job.job_type}`, job.job_type)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2 ml-4 flex-shrink-0">
            <Button asChild size="sm" className="min-w-[80px] text-xs">
              <Link to={`/jobs/${job.job_id}`}>
                <ExternalLink className="h-3 w-3 mr-1" />
                Xem
              </Link>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleUnsave}
              disabled={isUnsaving}
              className="min-w-[80px] text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              {isUnsaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
              ) : (
                <>
                  <Trash2 className="h-3 w-3 mr-1" />
                  Bỏ lưu
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
