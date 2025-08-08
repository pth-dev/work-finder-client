import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Search, Filter, X, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ApplicationFilters as FilterType, ApplicationStatus } from "../types";

import { useDebounce } from "@/hooks/useDebounce";

interface ApplicationFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  jobOptions?: Array<{ value: number; label: string }>;
  isLoading?: boolean;
  totalCount?: number;
}

export function RecruiterApplicationFilters({
  filters,
  onFiltersChange,
  jobOptions = [],
  isLoading = false,
}: ApplicationFiltersProps) {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState(filters.search || "");
  const debouncedSearch = useDebounce(searchValue, 300);

  // Update filters when debounced search changes
  React.useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFiltersChange({ ...filters, search: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch, filters, onFiltersChange]);

  const handleStatusChange = useCallback(
    (status: string) => {
      const newStatus =
        status === "all" ? undefined : (status as ApplicationStatus);
      onFiltersChange({ ...filters, status: newStatus, page: 1 });
    },
    [filters, onFiltersChange]
  );

  const handleJobChange = useCallback(
    (jobId: string) => {
      const newJobId = jobId === "all" ? undefined : parseInt(jobId);
      onFiltersChange({ ...filters, jobId: newJobId, page: 1 });
    },
    [filters, onFiltersChange]
  );

  const handleSortChange = useCallback(
    (sortBy: string) => {
      const [field, order] = sortBy.split("-");
      onFiltersChange({
        ...filters,
        sortBy: field as any,
        sortOrder: order as "asc" | "desc",
        page: 1,
      });
    },
    [filters, onFiltersChange]
  );

  const clearFilters = useCallback(() => {
    setSearchValue("");
    onFiltersChange({ page: 1, limit: filters.limit });
  }, [filters.limit, onFiltersChange]);

  const activeFiltersCount = [
    filters.search,
    filters.status,
    filters.jobId,
  ].filter(Boolean).length;

  const statusOptions = [
    { value: "all", label: t("common.all") },
    ...Object.values(ApplicationStatus).map((status) => ({
      value: status,
      label: t(`recruiterApplications.status.${status}`),
    })),
  ];

  const sortOptions = [
    { value: "applied_at-desc", label: t("applications.sort.newestFirst") },
    { value: "applied_at-asc", label: t("applications.sort.oldestFirst") },
    { value: "updated_at-desc", label: t("applications.sort.recentlyUpdated") },
    { value: "status-asc", label: t("applications.sort.statusAsc") },
  ];

  // Quick filter for ready-to-interview applications
  const handleReadyForInterviewFilter = useCallback(() => {
    onFiltersChange({
      ...filters,
      status: ApplicationStatus.REVIEWING,
      page: 1,
    });
  }, [filters, onFiltersChange]);

  const isReadyForInterviewActive =
    filters.status === ApplicationStatus.REVIEWING;

  return (
    <div className="space-y-4">
      {/* Search and Primary Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("applications.search.placeholder")}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>

        {/* Status Filter */}
        <Select
          value={filters.status || "all"}
          onValueChange={handleStatusChange}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t("applications.filters.selectStatus")} />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Quick Filter: Ready for Interview */}
        <Button
          variant={isReadyForInterviewActive ? "default" : "outline"}
          size="sm"
          onClick={handleReadyForInterviewFilter}
          disabled={isLoading}
          className="whitespace-nowrap"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Ready for Interview
        </Button>

        {/* Advanced Filters */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="h-4 w-4 mr-2" />
              {t("common.filter")}
              {activeFiltersCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">
                  {t("applications.filters.advanced")}
                </h4>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-8 px-2"
                  >
                    <X className="h-4 w-4 mr-1" />
                    {t("common.clear")}
                  </Button>
                )}
              </div>

              {/* Job Filter */}
              {jobOptions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t("applications.filters.job")}
                  </label>
                  <Select
                    value={filters.jobId?.toString() || "all"}
                    onValueChange={handleJobChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("common.all")}</SelectItem>
                      {jobOptions.map((job) => (
                        <SelectItem
                          key={job.value}
                          value={job.value.toString()}
                        >
                          {job.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("applications.filters.sortBy")}
                </label>
                <Select
                  value={`${filters.sortBy || "applied_at"}-${
                    filters.sortOrder || "desc"
                  }`}
                  onValueChange={handleSortChange}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              {t("applications.filters.search")}: "{filters.search}"
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => {
                  setSearchValue("");
                  onFiltersChange({ ...filters, search: undefined, page: 1 });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {filters.status && (
            <Badge variant="secondary" className="gap-1">
              {t("applications.filters.status")}:{" "}
              {t(`applications.status.${filters.status}`)}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() =>
                  onFiltersChange({ ...filters, status: undefined, page: 1 })
                }
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {filters.jobId && (
            <Badge variant="secondary" className="gap-1">
              {t("applications.filters.job")}:{" "}
              {jobOptions.find((j) => j.value === filters.jobId)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() =>
                  onFiltersChange({ ...filters, jobId: undefined, page: 1 })
                }
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
