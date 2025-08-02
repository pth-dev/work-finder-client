import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, Filter, Grid3X3, List, ArrowUpDown } from "lucide-react";
import {
  Input,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
  CardContent,
  Badge,
} from "@/components";
import { FeaturedCompanies } from "@/features/companies/components/FeaturedCompanies";
import { useFeaturedCompanies } from "@/features/companies/hooks";
import { Company, CompanyFilter, CompanySize } from "@/types";

export function CompaniesPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState<CompanyFilter>({
    query: searchParams.get("q") || undefined,
    industry: searchParams.get("industry")
      ? [searchParams.get("industry")!]
      : undefined,
    page: 1,
    limit: 12,
    sortBy: "name",
    sortOrder: "asc",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const [isLoading] = useState(false);

  // Mock data filtering
  const [filteredCompanies, setFilteredCompanies] =
    useState<Company[]>(mockCompanies);
  const [totalCompanies, setTotalCompanies] = useState(mockCompanies.length);
  const [currentPage, setCurrentPage] = useState(1);

  // Available industries from mock data
  const industries = Array.from(
    new Set(mockCompanies.map((c) => c.industry))
  ).sort();
  const companySizes: { value: CompanySize; label: string }[] = [
    { value: "startup", label: "Startup (1-50)" },
    { value: "small", label: "Small (51-200)" },
    { value: "medium", label: "Medium (201-500)" },
    { value: "large", label: "Large (501-1000)" },
    { value: "enterprise", label: "Enterprise (1000+)" },
  ];

  useEffect(() => {
    // Filter companies based on current filters
    let companies = [...mockCompanies];

    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      companies = companies.filter(
        (company) =>
          company.name.toLowerCase().includes(query) ||
          company.description.toLowerCase().includes(query) ||
          company.industry.toLowerCase().includes(query) ||
          company.specialties.some((specialty) =>
            specialty.toLowerCase().includes(query)
          )
      );
    }

    // Industry filter
    if (filters.industry?.length) {
      companies = companies.filter((company) =>
        filters.industry!.includes(company.industry)
      );
    }

    // Size filter
    if (filters.size?.length) {
      companies = companies.filter((company) =>
        filters.size!.includes(company.size)
      );
    }

    // Type filter
    if (filters.type?.length) {
      companies = companies.filter((company) =>
        filters.type!.includes(company.type)
      );
    }

    // Minimum rating filter
    if (filters.minRating) {
      companies = companies.filter(
        (company) => company.stats.averageRating >= filters.minRating!
      );
    }

    // Has jobs filter
    if (filters.hasJobs) {
      companies = companies.filter((company) => company.stats.totalJobs > 0);
    }

    // Verified filter
    if (filters.isVerified) {
      companies = companies.filter((company) => company.isVerified);
    }

    // Sort companies
    switch (sortBy) {
      case "rating":
        companies.sort((a, b) => b.stats.averageRating - a.stats.averageRating);
        break;
      case "jobs":
        companies.sort((a, b) => b.stats.totalJobs - a.stats.totalJobs);
        break;
      case "employees":
        companies.sort(
          (a, b) => b.stats.totalEmployees - a.stats.totalEmployees
        );
        break;
      case "founded":
        companies.sort((a, b) => (b.foundedYear || 0) - (a.foundedYear || 0));
        break;
      default: // name
        companies.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredCompanies(companies);
    setTotalCompanies(companies.length);
  }, [filters, sortBy]);

  const handleSearch = () => {
    const newFilters = {
      ...filters,
      query: searchQuery || undefined,
      page: 1,
    };
    setFilters(newFilters);
    setCurrentPage(1);

    // Update URL params
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    setSearchParams(params);
  };

  const handleFilterChange = (key: keyof CompanyFilter, value: any) => {
    const newFilters = {
      ...filters,
      [key]: value,
      page: 1,
    };
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const sortOptions = [
    { value: "name", label: "Company Name" },
    { value: "rating", label: "Highest Rated" },
    { value: "jobs", label: "Most Jobs" },
    { value: "employees", label: "Most Employees" },
    { value: "founded", label: "Recently Founded" },
  ];

  // Get current page companies
  const startIndex = (currentPage - 1) * 12;
  const endIndex = startIndex + 12;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("companies.title")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("companies.exploreCompanies")}
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-sm border-0 mb-8">
          <CardContent className="p-6">
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search companies, industries, or technologies"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 h-12"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="h-12 px-8 font-semibold"
              >
                Search Companies
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Select
                  value={filters.industry?.[0] || ""}
                  onValueChange={(value) =>
                    handleFilterChange("industry", value ? [value] : undefined)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Industries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Industries</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select
                  value={filters.size?.[0] || ""}
                  onValueChange={(value) =>
                    handleFilterChange("size", value ? [value] : undefined)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Sizes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Sizes</SelectItem>
                    {companySizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select
                  value={filters.minRating?.toString() || ""}
                  onValueChange={(value) =>
                    handleFilterChange(
                      "minRating",
                      value ? parseFloat(value) : undefined
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Ratings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Ratings</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    <SelectItem value="3.0">3.0+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="flex flex-wrap gap-3 mt-4">
              <Button
                variant={filters.hasJobs ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange("hasJobs", !filters.hasJobs)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Actively Hiring
              </Button>
              <Button
                variant={filters.isVerified ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  handleFilterChange("isVerified", !filters.isVerified)
                }
              >
                Verified Companies
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Header and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {totalCompanies.toLocaleString()} Companies
            </h2>
            <p className="text-gray-600">
              Showing {(currentPage - 1) * 12 + 1} -{" "}
              {Math.min(currentPage * 12, totalCompanies)} of{" "}
              {totalCompanies.toLocaleString()} results
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-gray-500" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
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
        <FeaturedCompanies companies={currentCompanies} isLoading={isLoading} />

        {/* No Results */}
        {!isLoading && currentCompanies.length === 0 && (
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
        {(filters.query ||
          filters.industry?.length ||
          filters.size?.length ||
          filters.minRating ||
          filters.hasJobs ||
          filters.isVerified) && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-gray-700">
                Active Filters:
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilters({
                    page: 1,
                    limit: 12,
                    sortBy: "name",
                    sortOrder: "asc",
                  });
                  setSearchQuery("");
                  setSearchParams(new URLSearchParams());
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.query && (
                <Badge variant="secondary" className="py-1 px-3">
                  Search: "{filters.query}"
                </Badge>
              )}
              {filters.industry?.map((industry) => (
                <Badge key={industry} variant="secondary" className="py-1 px-3">
                  Industry: {industry}
                </Badge>
              ))}
              {filters.size?.map((size) => (
                <Badge key={size} variant="secondary" className="py-1 px-3">
                  Size: {companySizes.find((s) => s.value === size)?.label}
                </Badge>
              ))}
              {filters.minRating && (
                <Badge variant="secondary" className="py-1 px-3">
                  Rating: {filters.minRating}+ Stars
                </Badge>
              )}
              {filters.hasJobs && (
                <Badge variant="secondary" className="py-1 px-3">
                  Actively Hiring
                </Badge>
              )}
              {filters.isVerified && (
                <Badge variant="secondary" className="py-1 px-3">
                  Verified Only
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
