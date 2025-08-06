import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { type Job } from "@/types";
import { useJobs } from "../hooks";
import { JobCard, CompanyLogo, Spinner } from "@/components";
import { formatTimeAgo, formatSalary } from "@/utils/common";
import { generateJobSlug } from "@/utils/slug-utils";

interface RelatedJobsProps {
  currentJobId: string;
  category?: string;
  jobTitle?: string;
  limit?: number;
}

export default function RelatedJobs({
  currentJobId,
  category,
  jobTitle,
  limit = 2,
}: RelatedJobsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Create search filters for related jobs
  const searchFilters = useMemo(() => {
    const filters: any = {
      limit: limit + 1, // Get one extra to filter out current job
      sortBy: "posted_date",
      sortOrder: "DESC" as const,
    };

    // First try to search by category
    if (category) {
      filters.search = category;
    }
    // If no category, try to extract keywords from job title
    else if (jobTitle) {
      const keywords = jobTitle
        .split(" ")
        .filter((word) => word.length > 3) // Only use words longer than 3 characters
        .slice(0, 2) // Take first 2 keywords
        .join(" ");
      if (keywords) {
        filters.search = keywords;
      }
    }

    return filters;
  }, [category, jobTitle, limit]);

  // Fallback filters for when no related jobs found
  const fallbackFilters = useMemo(
    () => ({
      limit: limit + 1,
      sortBy: "posted_date",
      sortOrder: "DESC" as const,
    }),
    [limit]
  );

  // Fetch related jobs using the API
  const { data: jobsResponse, isLoading, error } = useJobs(searchFilters);

  // Fetch fallback jobs if no related jobs found
  const { data: fallbackJobsResponse } = useJobs(fallbackFilters, {
    enabled:
      !isLoading &&
      !error &&
      (!jobsResponse?.data?.jobs ||
        jobsResponse.data.jobs.filter(
          (apiJob) => apiJob.job_id.toString() !== currentJobId
        ).length === 0),
  });

  // Transform API data to Job format and filter out current job
  const relatedJobs = useMemo(() => {
    // First try to use related jobs from search
    let jobs = jobsResponse?.data?.jobs || [];

    // If no related jobs found, use fallback jobs
    if (
      jobs.filter((apiJob) => apiJob.job_id.toString() !== currentJobId)
        .length === 0
    ) {
      jobs = fallbackJobsResponse?.data?.jobs || [];
    }

    return jobs
      .filter((apiJob) => apiJob.job_id.toString() !== currentJobId)
      .slice(0, limit)
      .map(
        (apiJob) =>
          ({
            id: apiJob.job_id.toString(),
            title: apiJob.job_title,
            description: apiJob.description || "",
            summary: apiJob.description?.substring(0, 150) + "..." || "",
            companyId: apiJob.company_id.toString(),
            companyName: apiJob.company?.company_name || "Unknown Company",
            companyLogo: apiJob.company?.company_image,
            type:
              (apiJob.job_type === "temporary"
                ? "full_time"
                : apiJob.job_type) || "full_time",
            experienceLevel: "entry" as const,
            location: {
              city: apiJob.location || "Remote",
              state: "",
              country: "",
              isRemote:
                apiJob.location?.toLowerCase().includes("remote") || false,
            },
            salary:
              apiJob.salary_min && apiJob.salary_max
                ? {
                    min: apiJob.salary_min,
                    max: apiJob.salary_max,
                    currency: "VND",
                    period: "monthly" as const,
                  }
                : undefined,
            skills: [],
            categories: apiJob.category ? [apiJob.category] : [],
            postedAt: apiJob.posted_date,
            updatedAt: apiJob.updated_at,
            expiresAt: apiJob.expires_at,
            isActive: apiJob.status === "active",
            applicationsCount: apiJob.application_count,
            viewsCount: apiJob.view_count,
            featured: false,
            urgent: false,
          } as Job)
      );
  }, [
    jobsResponse?.data?.jobs,
    fallbackJobsResponse?.data?.jobs,
    currentJobId,
    limit,
  ]);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#202124] mb-2">
          {t("jobs.details.relatedJobs")}
        </h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner size="md" />
        </div>
      ) : error ? (
        <div className="text-[#696969] text-center py-8">
          Unable to load related jobs at the moment.
        </div>
      ) : relatedJobs.length === 0 ? (
        <div className="flex justify-center py-8">
          <Spinner size="md" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {relatedJobs.map((job) => {
            const handleJobClick = () => {
              const slug = generateJobSlug(job);
              navigate(`/jobs/${slug}`);
            };

            const getJobTags = (job: Job) => {
              const tags = [];

              // Job type tag
              if (job.type) {
                tags.push({
                  text: job.type.replace("_", " "),
                  variant: "secondary" as const,
                  color: "blue" as const,
                });
              }

              // Experience level tag
              if (job.experienceLevel) {
                tags.push({
                  text: job.experienceLevel,
                  variant: "outline" as const,
                  color: "yellow" as const,
                });
              }

              return tags;
            };

            return (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.companyName}
                location={`${job.location.city}, ${job.location.country}`}
                timeAgo={formatTimeAgo(job.postedAt, t)}
                salary={formatSalary({
                  min: job.salary?.min,
                  max: job.salary?.max,
                  text: job.salary?.text,
                })}
                tags={getJobTags(job)}
                onClick={handleJobClick}
                logo={
                  <CompanyLogo
                    src={job.companyLogo}
                    companyName={job.companyName}
                    size="md"
                    variant="rounded"
                  />
                }
                className="h-full"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
