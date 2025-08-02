import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, Grid3X3, List } from "lucide-react";
import {
  Input,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
  CompanyCard,
  CompanyCardSkeleton,
  CompanyLogo,
} from "@/components";
import { useCompanies, useFollowCompany, useUnfollowCompany } from "../hooks";
import { CompanySearchFilters, ApiCompany } from "../types";
import { useAuthStore } from "@/stores/auth-store";
import { paths } from "@/config/paths";

export function CompaniesPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { isAuthenticated } = useAuthStore();

  // API filters state
  const [filters, setFilters] = useState<CompanySearchFilters>({
    search: searchParams.get("search") || undefined,
    industry: searchParams.get("industry") || undefined,
    page: parseInt(searchParams.get("page") || "1"),
    limit: 12,
    sortBy: searchParams.get("sortBy") || "company_name",
    sortOrder: (searchParams.get("sortOrder") as "ASC" | "DESC") || "ASC",
  });

  // Fetch companies data
  const { data: companiesResponse, isLoading, error } = useCompanies(filters);
  const companies = companiesResponse?.data?.companies || [];
  const totalCompanies = companiesResponse?.data?.total || 0;
  const totalPages = companiesResponse?.data?.totalPages || 1;
  const currentPage = companiesResponse?.data?.page || 1;

  // Follow/unfollow mutations
  const followMutation = useFollowCompany();
  const unfollowMutation = useUnfollowCompany();

  // Available industries (you can expand this list based on your data)
  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Consulting",
    "Media",
    "Real Estate",
    "Transportation",
  ];

  // Helper function to update URL params
  const updateUrlParams = (newFilters: CompanySearchFilters) => {
    const params = new URLSearchParams();
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.industry) params.set("industry", newFilters.industry);
    if (newFilters.page && newFilters.page > 1)
      params.set("page", newFilters.page.toString());
    if (newFilters.sortBy && newFilters.sortBy !== "company_name")
      params.set("sortBy", newFilters.sortBy);
    if (newFilters.sortOrder && newFilters.sortOrder !== "ASC")
      params.set("sortOrder", newFilters.sortOrder);
    setSearchParams(params);
  };

  const handleSearch = () => {
    const newFilters = {
      ...filters,
      search: searchQuery || undefined,
      page: 1,
    };
    setFilters(newFilters);
    updateUrlParams(newFilters);
  };

  const handleFilterChange = (key: keyof CompanySearchFilters, value: any) => {
    const newFilters = {
      ...filters,
      [key]: value,
      page: 1,
    };
    setFilters(newFilters);
    updateUrlParams(newFilters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = {
      ...filters,
      page,
    };
    setFilters(newFilters);
    updateUrlParams(newFilters);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Follow/unfollow handlers
  const handleFollowCompany = (companyId: number, isFollowed: boolean) => {
    if (!isAuthenticated) {
      navigate(paths.auth.login.getHref(window.location.pathname));
      return;
    }

    if (isFollowed) {
      unfollowMutation.mutate(companyId);
    } else {
      followMutation.mutate(companyId);
    }
  };

  // Transform API company to CompanyCard props
  const transformCompanyToCardProps = (company: ApiCompany) => ({
    name: company.company_name,
    industry: company.industry || undefined,
    location: company.location || undefined,
    jobCount: company.job_count || 0,
    followerCount: company.follower_count || 0,
    employeeCount: company.employee_count || undefined,
    isVerified: company.is_verified || false,
    isFollowed: company.is_followed || false,
    logo: (
      <CompanyLogo
        src={company.company_image || undefined}
        alt={`${company.company_name} logo`}
        fallbackText={company.company_name}
        size="md"
      />
    ),
    onFollow: () =>
      handleFollowCompany(company.company_id, company.is_followed || false),
    href: `/companies/${company.company_name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50)}-${company.company_id}`,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar - Single Row */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder={t("common:companies.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pl-10 h-12 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Industry Filter */}
            <div className="w-64">
              <Select
                value={filters.industry || "all"}
                onValueChange={(value) =>
                  handleFilterChange(
                    "industry",
                    value === "all" ? undefined : value
                  )
                }
              >
                <SelectTrigger className="h-12 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="h-12 px-8 bg-[#1967D2] hover:bg-[#1557B8] text-white font-medium"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Results Header and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {String(
                t("common:companies.companiesCount", {
                  count: totalCompanies,
                })
              )}
            </h2>
            <p className="text-gray-600">
              {isLoading ? (
                t("common:companies.loadingCompanies")
              ) : (
                <>
                  Showing {(currentPage - 1) * 12 + 1} -{" "}
                  {Math.min(currentPage * 12, totalCompanies)} of{" "}
                  {totalCompanies.toLocaleString()} results
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="px-3"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {isLoading
            ? Array.from({ length: 12 }).map((_, index) => (
                <CompanyCardSkeleton key={index} />
              ))
            : companies.map((company) => {
                const cardProps = transformCompanyToCardProps(company);
                return <CompanyCard key={company.company_id} {...cardProps} />;
              })}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="text-red-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Error loading companies
            </h3>
            <p className="text-gray-600">
              Please try again later or contact support if the problem persists.
            </p>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && companies.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No companies found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters to see more results.
            </p>
          </div>
        )}

        {/* Active Filters */}
        {(filters.search || filters.industry) && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-gray-700">
                Active Filters:
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newFilters = {
                    page: 1,
                    limit: 12,
                    sortBy: "company_name",
                    sortOrder: "ASC" as const,
                  };
                  setFilters(newFilters);
                  setSearchQuery("");
                  updateUrlParams(newFilters);
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <Badge variant="secondary" className="py-1 px-3">
                  Search: "{filters.search}"
                </Badge>
              )}
              {filters.industry && (
                <Badge variant="secondary" className="py-1 px-3">
                  Industry: {filters.industry}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !error && totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Previous
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum =
                  Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
