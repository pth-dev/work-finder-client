import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Briefcase, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MainContentCard } from "@/components/common";
import { UpdateJobRequest } from "@/features/jobs/types";
import { useJobDetail, useUpdateJob } from "../hooks";
import { paths } from "@/config/paths";
import { JobForm } from "./JobForm";
import { JobApplicationsList } from "./JobApplicationsList";
import { ChangeJobStatus } from "./ChangeJobStatus";

const jobFormSchema = z.object({
  job_title: z
    .string()
    .min(1, "Job title is required")
    .max(200, "Job title is too long"),
  description: z.string().optional(),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  location: z.string().max(200, "Location is too long").optional(),
  salary_min: z.number().min(0, "Minimum salary must be positive").optional(),
  salary_max: z.number().min(0, "Maximum salary must be positive").optional(),
  salary: z.string().max(100, "Salary is too long").optional(),
  job_type: z
    .enum([
      "full_time",
      "part_time",
      "contract",
      "freelance",
      "internship",
      "temporary",
    ])
    .optional(),
  expires_at: z.string().optional(),
});

type JobFormData = z.infer<typeof jobFormSchema>;

export function JobDetailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isEditMode, setIsEditMode] = useState(false);

  const jobId = parseInt(id || "0", 10);
  const { data: jobResponse, isLoading, error } = useJobDetail(jobId);
  const updateJobMutation = useUpdateJob();

  const job = jobResponse?.data;

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      job_title: "",
      description: "",
      requirements: "",
      benefits: "",
      location: "",
      salary_min: undefined,
      salary_max: undefined,
      salary: "",
      expires_at: "",
    },
  });

  // Populate form when job data is loaded
  useEffect(() => {
    if (job) {
      form.reset({
        job_title: job.job_title || "",
        description: job.description || "",
        requirements: job.requirements || "",
        benefits: job.benefits || "",
        location: job.location || "",
        salary_min: job.salary_min ? Number(job.salary_min) : undefined,
        salary_max: job.salary_max ? Number(job.salary_max) : undefined,
        salary: job.salary || "",
        job_type: job.job_type,
        expires_at: job.expires_at ? job.expires_at.split("T")[0] : "",
      });
    }
  }, [job, form]);

  const onSubmit = async (data: JobFormData) => {
    if (!job) return;

    const jobData: UpdateJobRequest = {
      job_title: data.job_title,
      description: data.description || undefined,
      requirements: data.requirements || undefined,
      benefits: data.benefits || undefined,
      location: data.location || undefined,
      salary_min: data.salary_min || undefined,
      salary_max: data.salary_max || undefined,
      salary: data.salary || undefined,
      job_type: data.job_type || undefined,
      expires_at: data.expires_at || undefined,
    };

    try {
      await updateJobMutation.mutateAsync({ jobId, jobData });
      setIsEditMode(false);
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  const handleEditToggle = () => {
    if (isEditMode) {
      // Cancel edit - reset form to original values
      if (job) {
        form.reset({
          job_title: job.job_title || "",
          description: job.description || "",
          requirements: job.requirements || "",
          benefits: job.benefits || "",
          location: job.location || "",
          salary_min: job.salary_min ? Number(job.salary_min) : undefined,
          salary_max: job.salary_max ? Number(job.salary_max) : undefined,
          salary: job.salary || "",
          job_type: job.job_type,
          expires_at: job.expires_at ? job.expires_at.split("T")[0] : "",
        });
      }
    }
    setIsEditMode(!isEditMode);
  };

  if (isLoading) {
    return (
      <MainContentCard>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t("common.loading")}</p>
          </div>
        </div>
      </MainContentCard>
    );
  }

  if (error || !job) {
    return (
      <MainContentCard>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">
            {t("recruiter.jobs.errors.notFound")}
          </p>
          <Button
            variant="outline"
            onClick={() => navigate(paths.recruiter.jobs.getHref())}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.back")}
          </Button>
        </div>
      </MainContentCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => navigate(paths.recruiter.jobs.getHref())}
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.back")}
        </Button>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {isEditMode
                    ? t("recruiter.jobs.detail.editTitle")
                    : t("recruiter.jobs.detail.viewTitle")}
                </h1>
                <Badge
                  className={
                    job.status === "active"
                      ? "bg-green-100 text-green-800"
                      : job.status === "inactive"
                      ? "bg-gray-100 text-gray-800"
                      : job.status === "pending"
                      ? "bg-blue-100 text-blue-800"
                      : job.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {t(`recruiter.jobs.status.${job.status}`)}
                </Badge>
              </div>
              <p className="text-gray-600 mt-1">{job.job_title}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isEditMode && (
              <ChangeJobStatus
                jobId={job.job_id}
                currentStatus={job.status}
                disabled={updateJobMutation.isPending}
              />
            )}

            <Button
              onClick={handleEditToggle}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={updateJobMutation.isPending}
            >
              <Edit className="mr-2 h-4 w-4" />
              {isEditMode ? t("common.cancel") : t("common.edit")}
            </Button>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <JobForm
        form={form}
        onSubmit={onSubmit}
        isReadOnly={!isEditMode}
        isSubmitting={updateJobMutation.isPending}
        showActions={isEditMode}
        onCancel={handleEditToggle}
      />

      {/* Applications Section */}
      <div className="mt-8">
        <JobApplicationsList jobId={jobId} />
      </div>
    </div>
  );
}
