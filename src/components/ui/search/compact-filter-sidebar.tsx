import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JobTypeFilter } from "./job-type-filter";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { CategorySelect } from "./category-select";
import { useTranslation } from "react-i18next";

// Filter form schema based on actual API filters
const filterSchema = z.object({
  category: z.string().optional(),
  jobType: z.array(z.string()).optional(),
  salaryRange: z.tuple([z.number(), z.number()]).optional(),
});

export interface CompactFilterParams {
  category?: string;
  jobType?: string[];
  salaryRange?: [number, number];
}

interface CompactFilterSidebarProps {
  onFiltersChange?: (filters: CompactFilterParams) => void;
  initialFilters?: CompactFilterParams;
  className?: string;
  height?: string;
}

export const CompactFilterSidebar: React.FC<CompactFilterSidebarProps> = ({
  onFiltersChange,
  initialFilters = {},
  className = "",
  height = "h-[calc(100vh-200px)]",
}) => {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      category: initialFilters.category || "all",
      jobType: initialFilters.jobType || [],
      salaryRange: initialFilters.salaryRange || undefined, // No default salary range
    },
  });

  // Watch form changes and notify parent
  React.useEffect(() => {
    const subscription = form.watch((values) => {
      onFiltersChange?.(values as CompactFilterParams);
    });
    return () => subscription.unsubscribe();
  }, [form, onFiltersChange]);

  const handleClearAll = () => {
    form.reset({
      jobType: [],
      salaryRange: [0, 100000],
    });
  };

  return (
    <div className={`w-80 bg-white border-r border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {t("jobs.filters.title", "Filters")}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            {t("jobs.filters.clearAll", "Clear all")}
          </Button>
        </div>
      </div>

      {/* Scrollable Filter Content */}
      <ScrollArea className={height}>
        <div className="p-6 space-y-6">
          <Form {...form}>
            <form className="space-y-6">
              {/* Category Filter */}
              <div>
                <CategorySelect
                  control={form.control}
                  name="category"
                  label={t("jobs.filters.category", "Category")}
                  showIcon={false}
                />
              </div>

              <Separator />

              {/* Job Type Filter */}
              <div>
                <JobTypeFilter
                  control={form.control}
                  name="jobType"
                  label={t("jobs.filters.jobType", "Job Type")}
                  showCounts={false}
                />
              </div>

              <Separator />

              {/* Salary Range Filter */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-gray-900">
                  {t("jobs.filters.salaryRange", "Salary Range")}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="salaryRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-gray-600">
                          {t("jobs.filters.minSalary", "Min Salary")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            value={field.value?.[0] || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "") {
                                // If empty, check if max is also empty to clear entire range
                                const max = field.value?.[1];
                                if (!max || max === 0) {
                                  field.onChange(undefined);
                                } else {
                                  field.onChange([0, max]);
                                }
                              } else {
                                const min = parseInt(value);
                                const max = field.value?.[1] || 100000;
                                field.onChange([min, max]);
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salaryRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-gray-600">
                          {t("jobs.filters.maxSalary", "Max Salary")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="100000"
                            value={field.value?.[1] || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "") {
                                // If empty, check if min is also empty to clear entire range
                                const min = field.value?.[0];
                                if (!min || min === 0) {
                                  field.onChange(undefined);
                                } else {
                                  field.onChange([min, 100000]);
                                }
                              } else {
                                const max = parseInt(value);
                                const min = field.value?.[0] || 0;
                                field.onChange([min, max]);
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Additional filters can be added here */}
              <div className="text-center text-sm text-gray-500">
                {t(
                  "jobs.filters.moreFiltersComingSoon",
                  "More filters coming soon..."
                )}
              </div>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </div>
  );
};
