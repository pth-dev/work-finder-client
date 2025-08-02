import { useMemo } from "react";
import { Card, Badge } from "@/components";
import { MapPin } from "lucide-react";
import { type Job } from "@/types";
import { useJobs } from "../hooks";
import { CompanyLogo } from "@/components";

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
        <h2 className="text-2xl font-bold text-[#202124] mb-2 font-['Jost']">
          Related Jobs
        </h2>
      </div>

      {isLoading ? (
        <div className="text-[#696969] font-['Jost']">
          Loading related jobs...
        </div>
      ) : error ? (
        <div className="text-[#696969] font-['Jost']">
          Unable to load related jobs at the moment.
        </div>
      ) : relatedJobs.length === 0 ? (
        <div className="text-[#696969] font-['Jost']">Loading more jobs...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {relatedJobs.map((job) => (
            <Card
              key={job.id}
              className="border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-[#1967D2]"
            >
              <div className="p-6 space-y-4">
                {/* Job badges */}
                <div className="flex flex-wrap gap-2">
                  {job.featured && (
                    <Badge className="bg-[#34A853] text-white px-2 py-1 rounded-md text-xs font-medium">
                      Private
                    </Badge>
                  )}
                  {job.urgent && (
                    <Badge className="bg-[#D93025] text-white px-2 py-1 rounded-md text-xs font-medium">
                      Urgent
                    </Badge>
                  )}
                  <Badge className="bg-[#1967D2] text-white px-2 py-1 rounded-md text-xs font-medium">
                    Full Time
                  </Badge>
                </div>

                {/* Company logo */}
                <div className="flex justify-center">
                  <CompanyLogo
                    src={job.companyLogo}
                    companyName={job.companyName}
                    size="lg"
                    variant="rounded"
                  />
                </div>

                {/* Company name */}
                <div className="text-center">
                  <p className="text-[#34A853] font-medium text-sm font-['Jost']">
                    {job.companyName}
                  </p>
                </div>

                {/* Job title */}
                <div className="text-center">
                  <h3 className="font-bold text-[#202124] text-lg font-['Jost'] leading-tight">
                    {job.title}
                  </h3>
                </div>

                {/* Location */}
                <div className="flex items-center justify-center gap-2 text-[#696969]">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-['Jost']">
                    {job.location.city}, {job.location.country}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
