import { useState, useMemo, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { FullScreenErrorState, Spinner } from "@/components";
import { type Job } from "@/types";
import { useJob, useSaveJob } from "../hooks";

import { JobTwoColumnLayout } from "./JobTwoColumnLayout";
import { JobDetailSkeleton } from "./JobDetailSkeleton";
import { JobApplicationModal } from "./JobApplicationModal";

const RelatedJobs = lazy(() => import("./RelatedJobs"));

export function JobDetailPage() {
  const { identifier } = useParams<{ identifier: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isApplying] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const {
    data: jobResponse,
    isLoading,
    error,
  } = useJob(identifier!, {
    enabled: !!identifier,
  });

  // ✅ Use is_saved and is_applied from API response instead of local state
  const isSaved = jobResponse?.data?.is_saved || false;
  const hasApplied = jobResponse?.data?.is_applied || false;
  const appliedAt = jobResponse?.data?.applied_at;

  const job = useMemo(() => {
    if (!jobResponse?.data) return null;

    const apiJob = jobResponse.data;
    return {
      id: apiJob.job_id.toString(),
      title: apiJob.job_title,
      description: apiJob.description || "",
      summary: apiJob.description?.substring(0, 150) + "..." || "",
      companyId: apiJob.company_id.toString(),
      companyName: apiJob.company?.company_name || t("jobs.unknownCompany"),
      companyLogo: apiJob.company?.company_image,
      type:
        (apiJob.job_type === "temporary" ? "full_time" : apiJob.job_type) ||
        "full_time",
      experienceLevel: "entry" as const,
      location: {
        city: apiJob.location || t("jobs.remote"),
        state: "",
        country: "",
        isRemote: apiJob.location?.toLowerCase().includes("remote") || false,
      },
      salary:
        apiJob.salary_min || apiJob.salary_max || apiJob.salary
          ? {
              min:
                typeof apiJob.salary_min === "string"
                  ? parseFloat(apiJob.salary_min)
                  : apiJob.salary_min || 0,
              max:
                typeof apiJob.salary_max === "string"
                  ? parseFloat(apiJob.salary_max)
                  : apiJob.salary_max || 0,
              currency: "VND",
              period: "monthly" as const,
              text: apiJob.salary,
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
    } as Job;
  }, [jobResponse?.data]);

  const company = jobResponse?.data?.company;

  const { mutate: saveJobMutation } = useSaveJob();

  const handleSaveJob = () => {
    if (job) {
      saveJobMutation({
        jobId: job.id,
        action: isSaved ? "unsave" : "save",
      });
    }
  };

  const handleApply = () => {
    if (hasApplied) return;
    setIsApplicationModalOpen(true);
  };

  const handleApplicationSuccess = () => {
    // Invalidate specific job query to update hasApplied status immediately
    queryClient.invalidateQueries({ queryKey: ["job", identifier] });
  };

  // Handle loading states
  if (!identifier) {
    return (
      <FullScreenErrorState
        type="invalid-id"
        actions={[
          {
            label: "Browse All Jobs",
            onClick: () => navigate("/jobs"),
            variant: "default",
          },
        ]}
        showRetry={false}
      />
    );
  }

  if (isLoading) {
    return <JobDetailSkeleton />;
  }

  if (error) {
    return (
      <FullScreenErrorState
        type="server"
        title="Failed to Load Job"
        message="We couldn't load the job details. Please try again later."
        actions={[
          {
            label: "Browse All Jobs",
            onClick: () => navigate("/jobs"),
            variant: "outline",
          },
        ]}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!job) {
    return (
      <FullScreenErrorState
        type="not-found"
        title="Job Not Found"
        message="The job you're looking for doesn't exist or has been removed."
        actions={[
          {
            label: "Browse All Jobs",
            onClick: () => navigate("/jobs"),
            variant: "default",
          },
        ]}
        showRetry={false}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FC]">
      <JobTwoColumnLayout
        job={job}
        company={company}
        rawJobData={jobResponse?.data}
        onSaveJob={handleSaveJob}
        onApply={handleApply}
        isSaved={isSaved}
        isApplying={isApplying}
        hasApplied={hasApplied}
        appliedAt={appliedAt}
      />

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        job={job}
        company={company}
        onSuccess={handleApplicationSuccess}
      />

      {/* Related Jobs - Lazy loaded */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-lg shadow-lg">
          <Suspense fallback={<Spinner />}>
            <RelatedJobs
              currentJobId={job.id}
              category={job.categories[0]}
              jobTitle={job.title}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
