import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ApplicationsFiltersProps {
  filters: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
}

export function ApplicationsFilters({ 
  filters, 
  onFiltersChange, 
  onClearFilters 
}: ApplicationsFiltersProps) {
  const { t } = useTranslation();

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value, page: 1 });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      status: value === "all" ? undefined : value, 
      page: 1 
    });
  };

  const hasActiveFilters = filters.search || filters.status;

  // Status options with counts (mock data)
  const statusOptions = [
    { value: "all", label: t("common.all", "All"), count: 12 },
    { value: "pending", label: t("applicationStatus.pending", "Pending"), count: 3 },
    { value: "under_review", label: t("applicationStatus.under_review", "Under Review"), count: 4 },
    { value: "interview_scheduled", label: t("applicationStatus.interview_scheduled", "Interview Scheduled"), count: 2 },
    { value: "accepted", label: t("applicationStatus.accepted", "Accepted"), count: 1 },
    { value: "rejected", label: t("applicationStatus.rejected", "Rejected"), count: 2 },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <Label htmlFor="search" className="sr-only">
              {t("applications.searchPlaceholder", "Search applications")}
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder={t("applications.searchPlaceholder", "Search by job title or company...")}
                value={filters.search || ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-48">
            <Label htmlFor="status-filter" className="sr-only">
              {t("applications.filterByStatus", "Filter by status")}
            </Label>
            <Select
              value={filters.status || "all"}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger id="status-filter">
                <SelectValue placeholder={t("applications.selectStatus", "Select status")} />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{option.label}</span>
                      <span className="ml-2 text-xs text-gray-500">({option.count})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="flex items-center space-x-1"
            >
              <X className="h-4 w-4" />
              <span>{t("common.clear", "Clear")}</span>
            </Button>
          )}
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            <span className="text-sm text-gray-600">
              {t("common.activeFilters", "Active filters:")}
            </span>
            
            {filters.search && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                Search: "{filters.search}"
              </span>
            )}
            
            {filters.status && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Status: {t(`applicationStatus.${filters.status}`, filters.status)}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
