"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import {
  TextFormField,
  SelectFormField,
  CheckboxFormField,
  RadioGroupFormField,
} from "@/components/ui/form-fields";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal, X } from "lucide-react";
import { advancedJobSearchSchema, type AdvancedJobSearchFormData } from "@/lib/validations/search";
import { cn } from "@/lib/utils";

interface ModernSearchFiltersProps {
  className?: string;
  onFiltersChange?: (filters: AdvancedJobSearchFormData) => void;
  defaultValues?: Partial<AdvancedJobSearchFormData>;
  showTitle?: boolean;
}

const jobTypeOptions = [
  { value: "full_time", label: "Full-time" },
  { value: "part_time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Remote" },
];

const experienceLevelOptions = [
  { value: "entry", label: "Entry Level" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "executive", label: "Executive" },
];

const postedDateOptions = [
  { value: "last24h", label: "Last 24 hours" },
  { value: "last7days", label: "Last 7 days" },
  { value: "last30days", label: "Last 30 days" },
  { value: "all", label: "All time" },
];

const sortByOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "date", label: "Date" },
  { value: "salary", label: "Salary" },
  { value: "company", label: "Company" },
];

const sortOrderOptions = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" },
];

const remoteWorkOptions = [
  { value: "remote_only", label: "Remote Only" },
  { value: "hybrid", label: "Hybrid" },
  { value: "on_site", label: "On-site" },
  { value: "any", label: "Any" },
];

export function ModernSearchFilters({
  className,
  onFiltersChange,
  defaultValues,
  showTitle = true,
}: ModernSearchFiltersProps) {
  const form = useForm<AdvancedJobSearchFormData>({
    resolver: zodResolver(advancedJobSearchSchema),
    defaultValues: {
      keywords: "",
      location: "",
      postedDate: "all",
      sortBy: "relevance",
      sortOrder: "desc",
      salaryCurrency: "USD",
      remoteWork: "any",
      ...defaultValues,
    },
  });

  const handleFiltersChange = (data: AdvancedJobSearchFormData) => {
    onFiltersChange?.(data);
  };

  const clearFilters = () => {
    form.reset({
      keywords: "",
      location: "",
      postedDate: "all",
      sortBy: "relevance",
      sortOrder: "desc",
      salaryCurrency: "USD",
      remoteWork: "any",
    });
    handleFiltersChange(form.getValues());
  };

  const activeFiltersCount = Object.values(form.watch()).filter(
    (value) => value && value !== "" && value !== "all" && value !== "relevance" && value !== "desc" && value !== "USD" && value !== "any"
  ).length;

  return (
    <Card className={cn("w-full", className)}>
      {showTitle && (
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <SlidersHorizontal className="h-5 w-5" />
            Search Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
      )}
      
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onChange={() => handleFiltersChange(form.getValues())} className="space-y-6">
            {/* Basic Search */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Basic Search
              </h3>
              
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <TextFormField
                    label="Keywords"
                    placeholder="Job title, skills, or company"
                    {...field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <TextFormField
                    label="Location"
                    placeholder="City, state, or country"
                    {...field}
                  />
                )}
              />
            </div>

            <Separator />

            {/* Job Type */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Job Type
              </h3>
              
              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <SelectFormField
                    label="Experience Level"
                    placeholder="Select experience level"
                    options={experienceLevelOptions}
                    onValueChange={field.onChange}
                    {...field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="remoteWork"
                render={({ field }) => (
                  <RadioGroupFormField
                    label="Work Arrangement"
                    options={remoteWorkOptions}
                    onValueChange={field.onChange}
                    {...field}
                  />
                )}
              />
            </div>

            <Separator />

            {/* Salary Range */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Salary Range
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="salaryMin"
                  render={({ field }) => (
                    <TextFormField
                      label="Minimum"
                      type="number"
                      placeholder="0"
                      onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                      value={field.value?.toString() || ""}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="salaryMax"
                  render={({ field }) => (
                    <TextFormField
                      label="Maximum"
                      type="number"
                      placeholder="100000"
                      onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                      value={field.value?.toString() || ""}
                    />
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="salaryCurrency"
                render={({ field }) => (
                  <SelectFormField
                    label="Currency"
                    options={[
                      { value: "USD", label: "USD ($)" },
                      { value: "EUR", label: "EUR (€)" },
                      { value: "GBP", label: "GBP (£)" },
                      { value: "VND", label: "VND (₫)" },
                    ]}
                    onValueChange={field.onChange}
                    {...field}
                  />
                )}
              />
            </div>

            <Separator />

            {/* Filters */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Filters & Sorting
              </h3>
              
              <FormField
                control={form.control}
                name="postedDate"
                render={({ field }) => (
                  <SelectFormField
                    label="Posted Date"
                    options={postedDateOptions}
                    onValueChange={field.onChange}
                    {...field}
                  />
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sortBy"
                  render={({ field }) => (
                    <SelectFormField
                      label="Sort By"
                      options={sortByOptions}
                      onValueChange={field.onChange}
                      {...field}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="sortOrder"
                  render={({ field }) => (
                    <SelectFormField
                      label="Order"
                      options={sortOrderOptions}
                      onValueChange={field.onChange}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            {/* Clear Filters Button */}
            {activeFiltersCount > 0 && (
              <div className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
