// ✅ NEW: FeaturedJobs component using shadcn/ui components and backend format
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { useFeaturedJobs, useSaveJob } from "../hooks";
import { ApiJobPost } from "../types";
import { Job } from "@/types";
import { formatTimeAgo, formatSalary } from "@/utils/common";
import { generateJobSlug } from "@/utils/slug-utils";
import {
  JobCard,
  JobCardSkeleton,
  SectionHeader,
  CompanyLogo,
  Button,
} from "@/components/ui";

interface FeaturedJobsProps {
  limit?: number;
  showViewAllButton?: boolean;
  className?: string;
}

// ✅ Helper function to transform backend job to UI props
const transformJobToCardProps = (
  job: ApiJobPost,
  onBookmark: (jobId: string, currentlySaved: boolean) => void,
  onClick: (job: ApiJobPost) => void,
  isBookmarked: boolean,
  t: any // i18n translation function
) => {
  // Create tags
  const tags = [];

  // Job type tag
  if (job.job_type) {
    tags.push({
      text: job.job_type.replace("_", "-"),
      variant: "secondary" as const,
      color: "blue" as const,
    });
  }

  // Category tag
  if (job.category) {
    tags.push({
      text: job.category,
      variant: "secondary" as const,
      color: "yellow" as const,
    });
  }

  return {
    logo: job.company?.company_image ? (
      <CompanyLogo
        src={job.company.company_image}
        alt={job.company.company_name}
        size="md"
      />
    ) : undefined,
    title: job.job_title,
    company: job.company?.company_name || t("common:jobs.unknownCompany"),
    location: job.location || t("common:jobs.remote"),
    timeAgo: formatTimeAgo(job.posted_date, t),
    salary: formatSalary({
      salary: job.salary,
      salary_min: job.salary_min,
      salary_max: job.salary_max,
    }),
    tags,
    onBookmark: () => onBookmark(job.job_id.toString(), isBookmarked),
    onClick: () => onClick(job),
    isBookmarked,
  };
};

export const FeaturedJobs: React.FC<FeaturedJobsProps> = ({
  limit = 6,
  showViewAllButton = true,
  className = "",
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate: saveJobMutation } = useSaveJob();

  // ✅ BACKEND-FIRST: Use API data directly
  const { data: apiResponse, isLoading, error } = useFeaturedJobs(limit);
  const jobs = apiResponse?.data?.jobs || [];

  const handleViewJob = (job: ApiJobPost) => {
    const jobForSlug = {
      id: job.job_id.toString(),
      title: job.job_title,
      companyName: job.company?.company_name || "Unknown Company",
    } as Job;

    const slug = generateJobSlug(jobForSlug);
    navigate(`/jobs/${slug}`);
  };
  const handleSaveJob = (jobId: string, currentlySaved: boolean = false) => {
    saveJobMutation({
      jobId,
      action: currentlySaved ? "unsave" : "save",
    });
  };

  if (error) {
    return (
      <section className={`py-16 px-4 bg-gray-50 ${className}`}>
        <div className="container mx-auto max-w-7xl">
          <div className="text-center py-8">
            <p className="text-red-600">{t("common.error")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 px-4 bg-white ${className}`}>
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <SectionHeader
          title={t("jobs.title")}
          subtitle={t("jobs.discoverOpportunities")}
        >
          {showViewAllButton && (
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => navigate("/jobs")}
                className="group"
              >
                {t("jobs.findJobs")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}
        </SectionHeader>

        {/* Jobs Grid - 2 columns × 3 rows layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {isLoading
            ? Array.from({ length: limit }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))
            : jobs.map((job) => {
                const isSaved = job.is_saved || false;
                const cardProps = transformJobToCardProps(
                  job,
                  handleSaveJob,
                  handleViewJob,
                  isSaved,
                  t
                );
                return <JobCard key={job.job_id} {...cardProps} />;
              })}
        </div>

        {/* Empty State */}
        {!isLoading && jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Không có việc làm nổi bật nào
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Hãy thử lại sau hoặc khám phá các việc làm khác
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobs;
