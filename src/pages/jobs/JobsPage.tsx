import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Input, Button } from "@/shared/components";
import { JobFilters } from "@/features/jobs/components/JobFilters";
import { JobListings } from "@/features/jobs/components/JobListings";
import { JobListSuspense } from "@/shared/components/organisms/Suspense";
import { JobListErrorBoundary } from "@/shared/components/organisms/ErrorBoundary";
import { useTransition } from "@/shared/hooks/useTransition";
import { mockJobs } from "@/lib/mock-data";
import { type Job, type JobFilter } from "@/shared/types";

export function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [searchLocation, setSearchLocation] = useState(
    searchParams.get("location") || ""
  );
  const [filters, setFilters] = useState<JobFilter>({
    query: searchParams.get("q") || undefined,
    location: searchParams.get("location") || undefined,
    categories: searchParams.get("category")
      ? [searchParams.get("category")!]
      : undefined,
    page: 1,
    limit: 20,
    sortBy: "relevance",
    sortOrder: "desc",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [isLoading] = useState(false);
  
  // React 18 transitions for non-urgent updates
  const { isPending, startFilterUpdate, startSortUpdate, startPaginationUpdate } = useTransition();

  // Mock data filtering (in a real app, this would be API calls)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [totalJobs, setTotalJobs] = useState(mockJobs.length);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalJobs / 20);

  useEffect(() => {
    // Filter jobs based on current filters
    let jobs = [...mockJobs];

    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.companyName.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    // Location filter
    if (filters.location) {
      jobs = jobs.filter((job) => {
        if (filters.location === "remote") {
          return job.workLocation === "remote" || job.location.isRemote;
        }
        return (
          `${job.location.city}, ${job.location.state}` === filters.location
        );
      });
    }

    // Job type filter
    if (filters.type?.length) {
      jobs = jobs.filter((job) => filters.type!.includes(job.type));
    }

    // Experience level filter
    if (filters.experienceLevel?.length) {
      jobs = jobs.filter((job) =>
        filters.experienceLevel!.includes(job.experienceLevel)
      );
    }

    // Work location filter
    if (filters.workLocation?.length) {
      jobs = jobs.filter((job) =>
        filters.workLocation!.includes(job.workLocation)
      );
    }

    // Categories filter
    if (filters.categories?.length) {
      jobs = jobs.filter((job) =>
        job.categories.some((category) =>
          filters.categories!.includes(category)
        )
      );
    }

    // Salary filter
    if (filters.salaryMin && filters.salaryMax) {
      jobs = jobs.filter((job) => {
        if (!job.salary) return false;
        return (
          job.salary.min >= filters.salaryMin! &&
          job.salary.max <= filters.salaryMax!
        );
      });
    }

    // Date posted filter
    if (filters.postedWithin) {
      const now = new Date();
      const filterDate = new Date();

      switch (filters.postedWithin) {
        case "day":
          filterDate.setDate(now.getDate() - 1);
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }

      jobs = jobs.filter((job) => new Date(job.postedAt) >= filterDate);
    }

    // Sort jobs
    switch (sortBy) {
      case "date":
        jobs.sort(
          (a, b) =>
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        );
        break;
      case "salary":
        jobs.sort((a, b) => {
          const aSalary = a.salary?.max || 0;
          const bSalary = b.salary?.max || 0;
          return bSalary - aSalary;
        });
        break;
      case "company":
        jobs.sort((a, b) => a.companyName.localeCompare(b.companyName));
        break;
      default: // relevance
        jobs.sort((a, b) => {
          // Featured jobs first, then by applications count (lower = more relevant)
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.applicationsCount - b.applicationsCount;
        });
    }

    setFilteredJobs(jobs);
    setTotalJobs(jobs.length);
  }, [filters, sortBy]);

  const handleSearch = () => {
    const newFilters = {
      ...filters,
      query: searchQuery || undefined,
      location: searchLocation || undefined,
      page: 1,
    };
    setFilters(newFilters);
    setCurrentPage(1);

    // Update URL params
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (searchLocation) params.set("location", searchLocation);
    setSearchParams(params);
  };

  const handleFiltersChange = (newFilters: JobFilter) => {
    startFilterUpdate(() => {
      setFilters(newFilters);
      setCurrentPage(1);
    });
  };

  const handleClearFilters = () => {
    startFilterUpdate(() => {
      const clearedFilters: JobFilter = {
        query: filters.query,
        location: filters.location,
        page: 1,
        limit: 20,
        sortBy: "relevance",
        sortOrder: "desc",
      };
      setFilters(clearedFilters);
      setCurrentPage(1);
    });
  };

  const handleSaveJob = (jobId: string) => {
    console.log("Save job:", jobId);
    // TODO: Implement save job functionality
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Get current page jobs
  const startIndex = (currentPage - 1) * 20;
  const endIndex = startIndex + 20;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Jobs</h1>
          <p className="text-lg text-gray-600">
            Discover your next career opportunity from thousands of job listings
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Job title, keywords, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
              <Input
                placeholder="Location or 'Remote'"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 h-12"
              />
            </div>
            <Button onClick={handleSearch} className="h-12 px-8 font-semibold">
              Search Jobs
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <JobFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              className="sticky top-4"
            />
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            <JobListErrorBoundary>
              <JobListSuspense>
                <JobListings
                  jobs={currentJobs}
                  totalJobs={totalJobs}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  isLoading={isLoading || isPending}
                  viewMode={viewMode}
                  sortBy={sortBy}
                  onViewModeChange={setViewMode}
                  onSortChange={(newSortBy) => startSortUpdate(() => setSortBy(newSortBy))}
                  onPageChange={(page) => startPaginationUpdate(() => setCurrentPage(page))}
                  onSaveJob={handleSaveJob}
                />
              </JobListSuspense>
            </JobListErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
