"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Building2,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { useJobFilters } from "@/hooks/use-jobs";
import { cn } from "@/lib/utils";
import type { JobFilters } from "@/types/job";

interface SearchFiltersProps {
  className?: string;
  showAdvanced?: boolean;
  onToggleAdvanced?: () => void;
}

const workTypes = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

const employmentTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const experienceLevels = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
  { value: "lead", label: "Lead/Manager" },
];

const postedWithinOptions = [
  { value: "day", label: "Last 24 hours" },
  { value: "week", label: "Last week" },
  { value: "month", label: "Last month" },
  { value: "all", label: "All time" },
];

export function SearchFilters({
  className,
  showAdvanced = false,
  onToggleAdvanced,
}: SearchFiltersProps) {
  const { filters, updateFilters, clearFilters, hasActiveFilters } =
    useJobFilters();
  const [localKeywords, setLocalKeywords] = useState(filters.search || "");
  const [localLocation, setLocalLocation] = useState(filters.location || "");

  const handleKeywordSearch = () => {
    updateFilters({ search: localKeywords });
  };

  const handleLocationSearch = () => {
    updateFilters({ location: localLocation });
  };

  const handleKeyPress = (
    e: React.KeyboardEvent,
    type: "keywords" | "location"
  ) => {
    if (e.key === "Enter") {
      if (type === "keywords") {
        handleKeywordSearch();
      } else {
        handleLocationSearch();
      }
    }
  };

  const toggleArrayFilter = (key: keyof JobFilters, value: string) => {
    const currentArray = (filters[key] as string[]) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFilters({ [key]: newArray });
  };

  const removeFilter = (key: keyof JobFilters, value?: string) => {
    if (value && Array.isArray(filters[key])) {
      const currentArray = (filters[key] as string[]) || [];
      const newArray = currentArray.filter((item) => item !== value);
      updateFilters({ [key]: newArray });
    } else {
      updateFilters({
        [key]: key === "search" || key === "location" ? "" : [],
      });
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Main Search Bar */}
      <div className="bg-white rounded-lg border border-[#ecedf2] shadow-[0px_6px_15px_0px_rgba(64,79,104,0.05)] overflow-hidden">
        <div className="flex h-[100px]">
          {/* Keywords Input */}
          <div className="flex-1 relative flex items-center px-6">
            <Search className="absolute left-6 h-5 w-5 text-[#696969] pointer-events-none" />
            <input
              type="text"
              value={localKeywords}
              onChange={(e) => setLocalKeywords(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, "keywords")}
              placeholder="Job title, keywords, or company"
              className="w-full pl-10 bg-transparent text-[15px] text-[#202124] placeholder:text-[#696969] outline-none font-normal"
            />
          </div>

          {/* Divider */}
          <div className="w-px bg-[#ecedf2] my-5" />

          {/* Location Input */}
          <div className="flex-1 relative flex items-center px-6">
            <MapPin className="absolute left-6 h-5 w-5 text-[#696969] pointer-events-none" />
            <input
              type="text"
              value={localLocation}
              onChange={(e) => setLocalLocation(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, "location")}
              placeholder="City or postcode"
              className="w-full pl-10 bg-transparent text-[15px] text-[#202124] placeholder:text-[#696969] outline-none font-normal"
            />
          </div>

          {/* Search Button */}
          <div className="px-5 py-5">
            <Button
              onClick={() => {
                handleKeywordSearch();
                handleLocationSearch();
              }}
              variant="primary"
              className="h-[60px] px-6 bg-[#1967d2] hover:bg-[#1557b0] text-white rounded-lg font-normal text-[15px]"
            >
              Find Jobs
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleAdvanced}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showAdvanced ? "Hide Filters" : "Show Filters"}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-[#696969] hover:text-[#1967d2]"
            >
              Clear All Filters
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="bg-white rounded-lg border border-[#ecedf2] p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Work Type */}
            <div>
              <h3 className="text-sm font-medium text-[#202124] mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Work Type
              </h3>
              <div className="space-y-2">
                {workTypes.map((type) => (
                  <label
                    key={type.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(filters.workType || []).includes(
                        type.value as any
                      )}
                      onChange={() => toggleArrayFilter("workType", type.value)}
                      className="rounded border-[#ecedf2] text-[#1967d2] focus:ring-[#1967d2]"
                    />
                    <span className="text-sm text-[#696969]">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Employment Type */}
            <div>
              <h3 className="text-sm font-medium text-[#202124] mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Employment Type
              </h3>
              <div className="space-y-2">
                {employmentTypes.map((type) => (
                  <label
                    key={type.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(filters.employmentType || []).includes(
                        type.value as any
                      )}
                      onChange={() =>
                        toggleArrayFilter("employmentType", type.value)
                      }
                      className="rounded border-[#ecedf2] text-[#1967d2] focus:ring-[#1967d2]"
                    />
                    <span className="text-sm text-[#696969]">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <h3 className="text-sm font-medium text-[#202124] mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Experience Level
              </h3>
              <div className="space-y-2">
                {experienceLevels.map((level) => (
                  <label
                    key={level.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(filters.experienceLevel || []).includes(
                        level.value as any
                      )}
                      onChange={() =>
                        toggleArrayFilter("experienceLevel", level.value)
                      }
                      className="rounded border-[#ecedf2] text-[#1967d2] focus:ring-[#1967d2]"
                    />
                    <span className="text-sm text-[#696969]">
                      {level.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Posted Within */}
            <div>
              <h3 className="text-sm font-medium text-[#202124] mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Posted Within
              </h3>
              <div className="space-y-2">
                {postedWithinOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="postedWithin"
                      checked={filters.postedWithin === option.value}
                      onChange={() =>
                        updateFilters({ postedWithin: option.value as any })
                      }
                      className="border-[#ecedf2] text-[#1967d2] focus:ring-[#1967d2]"
                    />
                    <span className="text-sm text-[#696969]">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              "{filters.search}"
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFilter("search")}
              />
            </Badge>
          )}

          {filters.location && (
            <Badge variant="secondary" className="flex items-center gap-1">
              📍 {filters.location}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFilter("location")}
              />
            </Badge>
          )}

          {(filters.workType || []).map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {workTypes.find((wt) => wt.value === type)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFilter("workType", type)}
              />
            </Badge>
          ))}

          {(filters.employmentType || []).map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {employmentTypes.find((et) => et.value === type)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFilter("employmentType", type)}
              />
            </Badge>
          ))}

          {(filters.experienceLevel || []).map((level) => (
            <Badge
              key={level}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {experienceLevels.find((el) => el.value === level)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFilter("experienceLevel", level)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
