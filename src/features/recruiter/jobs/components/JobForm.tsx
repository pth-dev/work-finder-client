import { useTranslation } from "react-i18next";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CurrencyInput, ProvinceSelect } from "@/components/common";
import { generateSalaryDescription } from "@/utils/salary";
import { ApiJobType } from "@/features/jobs/types";

interface JobFormData {
  job_title: string;
  description?: string;
  requirements?: string;
  benefits?: string;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  salary?: string;
  job_type?: ApiJobType;
  expires_at?: string;
}

interface JobFormProps {
  form: UseFormReturn<JobFormData>;
  onSubmit: (data: JobFormData) => void;
  isReadOnly?: boolean;
  isSubmitting?: boolean;
  showActions?: boolean;
  onCancel?: () => void;
}

export function JobForm({
  form,
  onSubmit,
  isReadOnly = false,
  isSubmitting = false,
  showActions = false,
  onCancel,
}: JobFormProps) {
  const { t } = useTranslation();

  const jobTypeOptions: { value: ApiJobType; label: string }[] = [
    { value: "full_time", label: t("recruiter.jobs.type.full_time") },
    { value: "part_time", label: t("recruiter.jobs.type.part_time") },
    { value: "contract", label: t("recruiter.jobs.type.contract") },
    { value: "freelance", label: t("recruiter.jobs.type.freelance") },
    { value: "internship", label: t("recruiter.jobs.type.internship") },
    { value: "temporary", label: t("recruiter.jobs.type.temporary") },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
            {t("recruiter.jobs.create.sections.basicInfo")}
          </h3>

          <FormField
            control={form.control}
            name="job_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("recruiter.jobs.fields.title")} *</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("recruiter.jobs.create.placeholders.title")}
                    disabled={isReadOnly}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="job_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("recruiter.jobs.fields.type")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isReadOnly}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue
                          placeholder={t("recruiter.jobs.create.placeholders.type")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {jobTypeOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="bg-white hover:bg-gray-50"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("recruiter.jobs.fields.location")}</FormLabel>
                  <FormControl>
                    <ProvinceSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder={t("recruiter.jobs.create.placeholders.location")}
                      disabled={isReadOnly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Salary Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
            {t("recruiter.jobs.create.sections.salaryInfo")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="salary_min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("recruiter.jobs.fields.salaryMin")}</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t("recruiter.jobs.create.placeholders.salaryMin")}
                      disabled={isReadOnly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary_max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("recruiter.jobs.fields.salaryMax")}</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t("recruiter.jobs.create.placeholders.salaryMax")}
                      disabled={isReadOnly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => {
              const salaryMin = form.watch("salary_min");
              const salaryMax = form.watch("salary_max");
              const autoDescription = generateSalaryDescription(
                salaryMin,
                salaryMax,
                field.value
              );

              return (
                <FormItem>
                  <FormLabel>{t("recruiter.jobs.fields.salary")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("recruiter.jobs.create.placeholders.salary")}
                      disabled={isReadOnly}
                      {...field}
                    />
                  </FormControl>
                  {!isReadOnly && (
                    <FormDescription>
                      <div className="space-y-1">
                        <div>{t("recruiter.jobs.create.salaryHelp")}</div>
                        <div className="text-blue-600 font-medium">
                          {t("recruiter.jobs.create.preview")}: {autoDescription}
                        </div>
                      </div>
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        {/* Job Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
            {t("recruiter.jobs.create.sections.jobDetails")}
          </h3>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("recruiter.jobs.fields.description")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("recruiter.jobs.create.placeholders.description")}
                    className="min-h-[120px]"
                    disabled={isReadOnly}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("recruiter.jobs.fields.requirements")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("recruiter.jobs.create.placeholders.requirements")}
                    className="min-h-[120px]"
                    disabled={isReadOnly}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="benefits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("recruiter.jobs.fields.benefits")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("recruiter.jobs.create.placeholders.benefits")}
                    className="min-h-[120px]"
                    disabled={isReadOnly}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Publishing Settings */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
            {t("recruiter.jobs.create.sections.publishingSettings")}
          </h3>

          <FormField
            control={form.control}
            name="expires_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("recruiter.jobs.fields.expiresAt")}</FormLabel>
                <FormControl>
                  <Input type="date" disabled={isReadOnly} {...field} className="bg-white" />
                </FormControl>
                {!isReadOnly && (
                  <FormDescription>
                    {t("recruiter.jobs.create.expiresHelp")}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex justify-end space-x-4 pt-8 border-t">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
              className="text-gray-600 hover:text-gray-800"
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 shadow-md"
            >
              {isSubmitting ? t("common.saving") : t("common.save")}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
