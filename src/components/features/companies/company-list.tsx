"use client";

import { useState } from "react";
import { CompanyCard } from "./company-card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  website?: string;
  size: string;
  industry: string;
  location: string;
  rating: number;
  jobCount?: number;
  featured?: boolean;
}

interface CompanyListProps {
  companies: Company[];
  isLoading?: boolean;
  variant?: "grid" | "list";
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onViewJobs?: (companyId: string) => void;
  onViewProfile?: (companyId: string) => void;
  className?: string;
}

export function CompanyList({
  companies,
  isLoading = false,
  variant = "grid",
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onViewJobs,
  onViewProfile,
  className,
}: CompanyListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading companies..." />
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <EmptyState
        icon={Building2}
        title="No companies found"
        description="Try adjusting your search criteria or browse all companies."
        action={{
          label: "Browse All Companies",
          onClick: () => {
            // Handle browse all companies
            console.log("Browse all companies");
          },
        }}
      />
    );
  }

  const isGrid = variant === "grid";

  return (
    <div className={cn("space-y-6", className)}>
      {/* Companies Grid/List */}
      <div
        className={cn(
          isGrid
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        )}
      >
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            variant={variant}
            onViewJobs={onViewJobs}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <div className="flex justify-center pt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}

// Company list with filters
interface CompanyListWithFiltersProps extends CompanyListProps {
  filters?: {
    industry?: string;
    size?: string;
    location?: string;
    rating?: number;
  };
  onFiltersChange?: (filters: any) => void;
}

export function CompanyListWithFilters({
  filters,
  onFiltersChange,
  ...props
}: CompanyListWithFiltersProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {props.companies.length} companies
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "grid"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "list"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
          </button>
        </div>
      </div>

      <CompanyList {...props} variant={viewMode} />
    </div>
  );
}
