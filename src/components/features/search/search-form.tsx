"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { TextFormField } from "@/components/ui/form-field";
import { Search, MapPin } from "lucide-react";
import { useJobs } from "@/hooks/use-jobs";
import {
  jobSearchSchema,
  type JobSearchFormData,
} from "@/lib/validations/search";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  className?: string;
  onSearch?: (data: JobSearchFormData) => void;
  defaultValues?: Partial<JobSearchFormData>;
}

export function SearchForm({
  className,
  onSearch,
  defaultValues,
}: SearchFormProps) {
  const form = useForm<JobSearchFormData>({
    resolver: zodResolver(jobSearchSchema),
    defaultValues: {
      keywords: "",
      location: "",
      ...defaultValues,
    },
  });

  const handleSubmit = async (data: JobSearchFormData) => {
    // Call external handler if provided
    onSearch?.(data);
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-[#ecedf2] shadow-[0px_6px_15px_0px_rgba(64,79,104,0.05)] overflow-hidden",
        className
      )}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex h-[100px]"
        >
          {/* Keywords Input */}
          <div className="flex-1 relative flex items-center px-6">
            <Search className="absolute left-6 h-5 w-5 text-[#696969] pointer-events-none z-10" />
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <TextFormField
                  placeholder="Job title, keywords, or company"
                  className="border-0 shadow-none bg-transparent h-auto p-0"
                  {...field}
                />
              )}
            />
          </div>

          {/* Divider */}
          <div className="w-px bg-[#ecedf2] my-5" />

          {/* Location Input */}
          <div className="flex-1 relative flex items-center px-6">
            <MapPin className="absolute left-6 h-5 w-5 text-[#696969] pointer-events-none z-10" />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <TextFormField
                  placeholder="City or postcode"
                  className="border-0 shadow-none bg-transparent h-auto p-0"
                  {...field}
                />
              )}
            />
          </div>

          {/* Find Jobs Button */}
          <div className="px-5 py-5">
            <Button
              type="submit"
              className="h-[60px] px-6 bg-[#1967d2] hover:bg-[#1557b0] text-white rounded-lg font-normal text-[15px]"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Searching..." : "Find Jobs"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
