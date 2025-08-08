import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import { ArrowLeft, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateJobRequest } from "@/features/jobs/types";
import { useCreateJob } from "../hooks/useCreateJob";
import { useUserCompany } from "@/features/companies/hooks";
import { paths } from "@/config/paths";
import { JobForm } from "./JobForm";

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

export function CreateJobPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: userCompany } = useUserCompany();
  const createJobMutation = useCreateJob();

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

  const onSubmit = async (data: JobFormData) => {
    if (!userCompany?.data?.company) {
      console.error("No company found for user");
      return;
    }

    const jobData: CreateJobRequest = {
      company_id: userCompany.data.company.company_id,
      job_title: data.job_title,
      description: data.description || undefined,
      requirements: data.requirements || undefined,
      benefits: data.benefits || undefined,
      location: data.location || undefined,
      salary_min: data.salary_min || undefined,
      salary_max: data.salary_max || undefined,
      salary: data.salary || undefined,
      job_type: data.job_type || undefined,
      // Status will default to PENDING on backend
      expires_at: data.expires_at || undefined,
    };

    try {
      await createJobMutation.mutateAsync(jobData);
      navigate(paths.recruiter.jobs.getHref());
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

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

        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Briefcase className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t("recruiter.jobs.create.title")}
            </h1>
            <p className="text-gray-600 mt-1">
              {t("recruiter.jobs.create.description")}
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <JobForm
        form={form}
        onSubmit={onSubmit}
        isReadOnly={false}
        isSubmitting={createJobMutation.isPending}
        showActions={true}
        onCancel={() => navigate(paths.recruiter.jobs.getHref())}
      />
    </div>
  );
}
