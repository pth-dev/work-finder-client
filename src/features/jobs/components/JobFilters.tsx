import React from "react";
import { Filter, X } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  Label,
  Separator,
  Badge,
} from "@/components";
import {
  type JobFilter,
  type JobType,
  type ExperienceLevel,
  type WorkLocation,
} from "@/types";
import { jobCategories, locations } from "@/lib/mock-data";

interface JobFiltersProps {
  filters: JobFilter;
  onFiltersChange: (filters: JobFilter) => void;
  onClearFilters: () => void;
  className?: string;
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  className = "",
}) => {
  const handleFilterChange = (key: keyof JobFilter, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleArrayFilterChange = (
    key: keyof JobFilter,
    value: string,
    checked: boolean
  ) => {
    const currentArray = (filters[key] as string[]) || [];
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter((item) => item !== value);

    handleFilterChange(key, newArray.length > 0 ? newArray : undefined);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.type?.length) count++;
    if (filters.experienceLevel?.length) count++;
    if (filters.workLocation?.length) count++;
    if (filters.categories?.length) count++;
    if (filters.salaryMin) count++;
    if (filters.salaryMax) count++;
    if (filters.postedWithin && filters.postedWithin !== "all") count++;
    if (filters.location) count++;
    return count;
  };

  const jobTypes: { value: JobType; label: string }[] = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance" },
  ];

  const experienceLevels: { value: ExperienceLevel; label: string }[] = [
    { value: "entry-level", label: "Entry Level" },
    { value: "mid-level", label: "Mid Level" },
    { value: "senior-level", label: "Senior Level" },
    { value: "executive", label: "Executive" },
  ];

  const workLocations: { value: WorkLocation; label: string }[] = [
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "on-site", label: "On-site" },
  ];

  const postedWithinOptions = [
    { value: "all", label: "Any time" },
    { value: "day", label: "Past 24 hours" },
    { value: "week", label: "Past week" },
    { value: "month", label: "Past month" },
  ];

  const salaryRanges = [
    { min: 0, max: 50000, label: "Under $50K" },
    { min: 50000, max: 75000, label: "$50K - $75K" },
    { min: 75000, max: 100000, label: "$75K - $100K" },
    { min: 100000, max: 150000, label: "$100K - $150K" },
    { min: 150000, max: 200000, label: "$150K - $200K" },
    { min: 200000, max: 999999, label: "$200K+" },
  ];

  return (
    <Card className={`${className}`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-gray-600" />
            <h3 className="font-semibold text-lg">Filters</h3>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </div>
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Location */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Location</Label>
            <Select
              value={filters.location || ""}
              onValueChange={(value) =>
                handleFilterChange("location", value || undefined)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Any location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any location</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Job Type */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Job Type</Label>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type.value}`}
                    checked={filters.type?.includes(type.value) || false}
                    onCheckedChange={(checked: boolean) =>
                      handleArrayFilterChange("type", type.value, checked)
                    }
                  />
                  <Label
                    htmlFor={`type-${type.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Experience Level */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Experience Level
            </Label>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <div key={level.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`experience-${level.value}`}
                    checked={
                      filters.experienceLevel?.includes(level.value) || false
                    }
                    onCheckedChange={(checked: boolean) =>
                      handleArrayFilterChange(
                        "experienceLevel",
                        level.value,
                        checked
                      )
                    }
                  />
                  <Label
                    htmlFor={`experience-${level.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {level.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Work Location */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Work Arrangement
            </Label>
            <div className="space-y-2">
              {workLocations.map((location) => (
                <div
                  key={location.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`work-${location.value}`}
                    checked={
                      filters.workLocation?.includes(location.value) || false
                    }
                    onCheckedChange={(checked: boolean) =>
                      handleArrayFilterChange(
                        "workLocation",
                        location.value,
                        checked
                      )
                    }
                  />
                  <Label
                    htmlFor={`work-${location.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {location.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Categories */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Categories</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {jobCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories?.includes(category) || false}
                    onCheckedChange={(checked: boolean) =>
                      handleArrayFilterChange(
                        "categories",
                        category,
                        checked as boolean
                      )
                    }
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Salary Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Salary Range
            </Label>
            <div className="space-y-2">
              {salaryRanges.map((range, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`salary-${index}`}
                    checked={
                      filters.salaryMin === range.min &&
                      filters.salaryMax === range.max
                    }
                    onCheckedChange={(checked: boolean) => {
                      if (checked) {
                        handleFilterChange("salaryMin", range.min);
                        handleFilterChange("salaryMax", range.max);
                      } else {
                        handleFilterChange("salaryMin", undefined);
                        handleFilterChange("salaryMax", undefined);
                      }
                    }}
                  />
                  <Label
                    htmlFor={`salary-${index}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {range.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Date Posted */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Date Posted
            </Label>
            <Select
              value={filters.postedWithin || "all"}
              onValueChange={(value) =>
                handleFilterChange(
                  "postedWithin",
                  value === "all" ? undefined : value
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {postedWithinOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobFilters;
