import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Clock,
  DollarSign,
  Heart,
  Share2,
  ChevronLeft,
  User,
} from "lucide-react";
import { Button, Card } from "@/components";
import { type Job } from "@/types";
import { type ApiCompany } from "../types";
import { formatSalary } from "@/utils/common";
import { CompanyLogo } from "@/components";
import { useAuthStore } from "@/stores/auth-store";
import { paths } from "@/config/paths";

interface JobHeaderProps {
  job: Job;
  company?: ApiCompany;
  onSaveJob: () => void;
  onApply: () => void;
  isSaved: boolean;
  isApplying: boolean;
  hasApplied: boolean;
  appliedAt?: string; // Application date when user has applied
}

// Helper to convert Job salary to global formatSalary format
const formatJobSalary = (job: Job) => {
  if (!job.salary) return formatSalary({});
  return formatSalary({
    min: job.salary.min,
    max: job.salary.max,
    text: job.salary.text, // ✅ Use pre-formatted text if available
  });
};

export function JobHeader({
  job,
  company,
  onSaveJob,
  onApply,
  isSaved,
  isApplying,
  hasApplied,
  appliedAt,
}: JobHeaderProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();

  // Auth check functions
  const handleSaveJobWithAuth = () => {
    if (!isAuthenticated) {
      navigate(paths.auth.login.getHref(window.location.pathname));
      return;
    }
    onSaveJob();
  };

  const handleApplyWithAuth = () => {
    if (!isAuthenticated) {
      navigate(paths.auth.login.getHref(window.location.pathname));
      return;
    }
    onApply();
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // Use toast notification here
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const salaryText = useMemo(() => formatJobSalary(job), [job.salary]);

  return (
    <Card className="border-0 shadow-lg bg-white">
      <div className="px-3 py-2 md:px-4 md:py-3">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-[#202124] hover:bg-gray-100 h-9"
            aria-label="Go back to jobs list"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t("common:jobs.backToJobs")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="border-[#1967D2] text-[#1967D2] hover:bg-[#1967D2] hover:text-white h-9"
            aria-label="Share this job"
          >
            <Share2 className="h-4 w-4 mr-2" />
            {t("common:jobs.share")}
          </Button>
        </div>

        {/* Main Header Content */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          {/* Left: Job Info */}
          <div className="flex flex-col sm:flex-row items-start gap-3 flex-1">
            {/* Company Logo */}
            <CompanyLogo
              src={company?.company_image}
              companyName={company?.company_name || job.companyName}
              size="xl"
              variant="rounded"
              className="h-16 w-16 sm:h-20 sm:w-20"
            />

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-[#202124] mb-2">
                {job.title}
              </h1>

              {/* Job Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                {/* Salary */}
                {job.salary && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#1967D2] rounded-full flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#202124]">
                        {t("jobs.details.salary")}
                      </p>
                      <p className="text-sm text-[#696969]">{salaryText}</p>
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#1967D2] rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#202124]">
                      {t("jobs.details.location")}
                    </p>
                    <p className="text-sm text-[#696969]">
                      {job.location.isRemote
                        ? "Remote"
                        : `${job.location.city || "Hà Nội"}`}
                    </p>
                  </div>
                </div>

                {/* Job Type */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#1967D2] rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#202124]">
                      {t("jobs.details.jobType")}
                    </p>
                    <p className="text-sm text-[#696969]">
                      {job.type === "full_time"
                        ? t("jobs.details.jobTypes.fullTime")
                        : job.type === "part_time"
                        ? t("jobs.details.jobTypes.partTime")
                        : job.type === "contract"
                        ? t("jobs.details.jobTypes.contract")
                        : job.type === "internship"
                        ? t("jobs.details.jobTypes.internship")
                        : t("jobs.details.jobTypes.fullTime")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Deadline */}
              <div className="flex items-center gap-2 text-sm text-[#696969]">
                <Clock className="h-4 w-4" />
                <span>
                  {t("jobs.details.deadline")}:{" "}
                  {job.expiresAt
                    ? new Date(job.expiresAt).toLocaleDateString("vi-VN")
                    : "01/09/2025"}
                </span>
              </div>

              {/* Applied Date - Show only if user has applied */}
              {hasApplied && appliedAt && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <User className="h-4 w-4" />
                  <span>
                    Đã ứng tuyển:{" "}
                    {new Date(appliedAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-row gap-3 items-start lg:items-center lg:flex-shrink-0">
            <Button
              variant="outline"
              size="lg"
              onClick={handleSaveJobWithAuth}
              className={`min-w-[120px] border-[#1967D2] text-[#1967D2] hover:bg-[#1967D2] hover:text-white ${
                isSaved ? "bg-[#1967D2] text-white" : ""
              }`}
              aria-label={isSaved ? "Remove from saved jobs" : "Save this job"}
            >
              <Heart
                className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`}
              />
              {isSaved ? t("jobs.details.saved") : t("jobs.details.saveJob")}
            </Button>
            <Button
              size="lg"
              onClick={handleApplyWithAuth}
              disabled={isApplying || hasApplied}
              className={`min-w-[120px] bg-[#1967D2] hover:bg-[#1557B8] text-white font-medium ${
                hasApplied ? "bg-gray-400 hover:bg-gray-400" : ""
              }`}
              aria-label={
                hasApplied ? "Already applied to this job" : "Apply to this job"
              }
            >
              {isApplying
                ? t("jobs.details.applying")
                : hasApplied
                ? t("jobs.details.applied")
                : t("jobs.details.apply")}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
