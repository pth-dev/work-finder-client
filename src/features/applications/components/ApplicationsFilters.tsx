import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ApplicationsFiltersProps {
  filters: {
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
  onClearFilters,
}: ApplicationsFiltersProps) {
  const { t } = useTranslation();

  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: value === "all" ? undefined : value,
      page: 1,
    });
  };

  const hasActiveFilters = filters.status;

  // Status options without counts
  const statusOptions = [
    { value: "all", label: t("common.all", "Tất cả") },
    {
      value: "pending",
      label: t("common.applicationStatus.pending", "Đang chờ"),
    },
    {
      value: "reviewing",
      label: t("common.applicationStatus.reviewing", "Đang xem xét"),
    },
    {
      value: "interview_scheduled",
      label: t(
        "common.applicationStatus.interview_scheduled",
        "Đã lên lịch phỏng vấn"
      ),
    },
    {
      value: "accepted",
      label: t("common.applicationStatus.accepted", "Được chấp nhận"),
    },
    {
      value: "rejected",
      label: t("common.applicationStatus.rejected", "Bị từ chối"),
    },
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <Label
            htmlFor="status-filter"
            className="text-sm font-medium text-gray-700"
          >
            {t("applications.filterByStatus", "Lọc theo trạng thái")}:
          </Label>
          <Select
            value={filters.status || "all"}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger id="status-filter" className="w-48">
              <SelectValue
                placeholder={t("applications.selectStatus", "Chọn trạng thái")}
              />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="whitespace-nowrap"
        >
          <X className="h-4 w-4 mr-2" />
          {t("common.clear", "Xóa bộ lọc")}
        </Button>
      )}
    </div>
  );
}
