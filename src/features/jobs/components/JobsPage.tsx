import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FullScreenErrorState, Button } from "@/components";
import { JobListings } from "@/features/jobs/components/JobListings";
import {
  StickySearchBar,
  CompactFilterSidebar,
  type StickySearchParams,
  type CompactFilterParams,
} from "@/components/ui/search";

import { JobListErrorBoundary } from "@/components/errors/error-boundary";
import { useTransition, useDebounce } from "@/hooks";
import { useJobs, useSaveJob } from "@/features/jobs/hooks";
import { type Job } from "@/types";
import {
  type ApiJobSearchFilters,
  type ApiJobPost,
} from "@/features/jobs/types";

export function JobsPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [searchLocation, setSearchLocation] = useState(
    searchParams.get("location") || ""
  );

  // Debounced search to prevent excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const debouncedSearchLocation = useDebounce(searchLocation, 500);
  const isSearching =
    searchQuery !== debouncedSearchQuery ||
    searchLocation !== debouncedSearchLocation;

  const [sortBy, setSortBy] = useState("posted_date");
  const [currentPage, setCurrentPage] = useState(1);

  // Search state for sticky search bar
  const [searchFilters, setSearchFilters] = useState<StickySearchParams>({
    search: searchQuery,
    location: searchLocation,
  });

  // Filter sidebar visibility state
  const [showFilters, setShowFilters] = useState(false);

  // Filter state for compact sidebar
  const [compactFilters, setCompactFilters] = useState<CompactFilterParams>({
    category: "all",
    jobType: [],
    salaryRange: undefined, // No default salary range
  });

  // API filters state
  const [apiFilters, setApiFilters] = useState<ApiJobSearchFilters>({
    search: searchParams.get("q") || undefined,
    location: searchParams.get("location") || undefined,
    category:
      searchParams.get("category") && searchParams.get("category") !== "all"
        ? searchParams.get("category") || undefined
        : undefined,
    company_id: searchParams.get("company")
      ? parseInt(searchParams.get("company")!, 10)
      : undefined,
    page: 1,
    limit: 20,
    sortBy: "posted_date",
    sortOrder: "DESC",
  });
  const {
    isPending,
    startFilterUpdate,
    startSortUpdate,
    startPaginationUpdate,
  } = useTransition();

  // Use real API data instead of mock data
  const {
    data: jobsResponse,
    isLoading,
    error,
    refetch,
  } = useJobs(apiFilters, {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Debug logging
  console.log("🔍 JobsPage Debug:", {
    apiFilters,
    isLoading,
    jobsResponse: jobsResponse?.data,
  });

  // Extract data from API response
  const apiJobs = jobsResponse?.data?.jobs || [];
  const totalJobs = jobsResponse?.data?.total || 0;
  const totalPages = jobsResponse?.data?.totalPages || 1;

  // Handle search changes from sticky search bar
  const handleSearchChange = (newSearch: StickySearchParams) => {
    setSearchFilters(newSearch);

    // Update local search state for debouncing
    setSearchQuery(newSearch.search || "");
    setSearchLocation(newSearch.location || "");

    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (newSearch.search) newParams.set("q", newSearch.search);
    else newParams.delete("q");
    if (newSearch.location) newParams.set("location", newSearch.location);
    else newParams.delete("location");
    setSearchParams(newParams);

    setCurrentPage(1);
  };

  // Handle filter changes from compact sidebar
  const handleCompactFiltersChange = (newFilters: CompactFilterParams) => {
    setCompactFilters(newFilters);

    // Update URL params for filters
    const newParams = new URLSearchParams(searchParams);

    // Category
    if (newFilters.category && newFilters.category !== "all") {
      newParams.set("category", newFilters.category);
    } else {
      newParams.delete("category");
    }

    // Job Type
    if (newFilters.jobType && newFilters.jobType.length > 0) {
      newParams.set("jobType", newFilters.jobType[0]);
    } else {
      newParams.delete("jobType");
    }

    // Salary Range - only set if meaningful values are provided
    if (
      newFilters.salaryRange &&
      (newFilters.salaryRange[0] > 0 || newFilters.salaryRange[1] < 100000)
    ) {
      newParams.set("salaryMin", newFilters.salaryRange[0].toString());
      newParams.set("salaryMax", newFilters.salaryRange[1].toString());
    } else {
      newParams.delete("salaryMin");
      newParams.delete("salaryMax");
    }

    setSearchParams(newParams);
    setCurrentPage(1);
  };

  // Transform ApiJobPost to Job for JobListings component
  const transformApiJobToJob = (apiJob: ApiJobPost): Job => ({
    id: apiJob.job_id.toString(),
    title: apiJob.job_title,
    description: apiJob.description || "",
    summary: apiJob.description?.substring(0, 150) + "..." || "",
    companyId: apiJob.company_id.toString(),
    companyName:
      apiJob.company?.company_name || t("common:jobs.unknownCompany"),
    companyLogo: apiJob.company?.company_image,
    type:
      (apiJob.job_type === "temporary" ? "full_time" : apiJob.job_type) ||
      "full_time",
    experienceLevel: "entry", // Default value since API doesn't provide this
    location: {
      city: apiJob.location || t("common:jobs.remote"),
      state: "",
      country: "",
      isRemote: apiJob.location?.toLowerCase().includes("remote") || false,
    },
    salary:
      apiJob.salary_min && apiJob.salary_max
        ? {
            min: apiJob.salary_min,
            max: apiJob.salary_max,
            currency: "VND",
            period: "monthly" as const,
          }
        : undefined,
    skills: [],
    categories: apiJob.category ? [apiJob.category] : [],
    postedAt: apiJob.posted_date,
    updatedAt: apiJob.updated_at,
    expiresAt: apiJob.expires_at,
    isActive: apiJob.status === "active",
    applicationsCount: apiJob.application_count,
    viewsCount: apiJob.view_count,
    featured: false,
    urgent: false,
  });

  const jobs = apiJobs.map(transformApiJobToJob);

  // Update API filters when debounced search values change
  useEffect(() => {
    const newApiFilters: ApiJobSearchFilters = {
      search: debouncedSearchQuery || undefined,
      location: debouncedSearchLocation || undefined,
      category:
        compactFilters.category && compactFilters.category !== "all"
          ? compactFilters.category
          : undefined,
      job_type: compactFilters.jobType?.[0] as any, // API expects single job type
      salary_min: compactFilters.salaryRange?.[0] || undefined,
      salary_max: compactFilters.salaryRange?.[1] || undefined,
      company_id: searchParams.get("company")
        ? parseInt(searchParams.get("company")!, 10)
        : undefined,
      page: currentPage,
      sortBy: sortBy === "relevance" ? "posted_date" : sortBy,
      sortOrder: "DESC" as const,
    };

    console.log("🔄 Updating API filters:", newApiFilters);
    setApiFilters(newApiFilters);
  }, [
    debouncedSearchQuery,
    debouncedSearchLocation,
    compactFilters.category,
    compactFilters.jobType,
    compactFilters.salaryRange,
    currentPage,
    sortBy,
    searchParams,
  ]);

  // Use centralized save job logic
  const { mutate: saveJobMutation } = useSaveJob();

  const handleSaveJob = (jobId: string, currentlySaved: boolean = false) => {
    saveJobMutation({
      jobId,
      action: currentlySaved ? "unsave" : "save",
    });
  };

  // Error handling
  if (error) {
    return (
      <FullScreenErrorState
        type="server"
        title="Failed to load jobs"
        message="Please try again later"
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Search Bar */}
      <StickySearchBar
        onSearch={handleSearchChange}
        initialValues={searchFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        showFiltersButton={true}
      />

      {/* Main Content with Independent Scrolling */}
      <div className="container mx-auto px-4">
        <div className="flex h-[calc(100vh-80px)] gap-6">
          {/* Compact Filter Sidebar - Toggleable visibility */}
          {showFilters && (
            <div className="hidden lg:block w-80 flex-shrink-0">
              <CompactFilterSidebar
                onFiltersChange={handleCompactFiltersChange}
                initialFilters={compactFilters}
                height="h-full"
              />
            </div>
          )}

          {/* Job Listings with Independent Scroll */}
          <div className="flex-1 overflow-y-auto">
            <div className="py-8">
              {/* Mobile Filter Button - Shown only on mobile */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // TODO: Implement mobile filter drawer
                    alert("Mobile filter drawer - to be implemented");
                  }}
                >
                  Filters & Sort
                </Button>
              </div>

              <JobListErrorBoundary>
                <JobListings
                  jobs={jobs}
                  totalJobs={totalJobs}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  isLoading={isLoading || isPending || isSearching}
                  sortBy={sortBy}
                  onSortChange={(newSortBy) =>
                    startSortUpdate(() => setSortBy(newSortBy))
                  }
                  onPageChange={(page) =>
                    startPaginationUpdate(() => setCurrentPage(page))
                  }
                  onSaveJob={handleSaveJob}
                  showFilters={showFilters}
                />
              </JobListErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
