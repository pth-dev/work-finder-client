import React from "react";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Bookmark,
  Grid3X3,
  List,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { type Job } from "@/types";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface JobListingsProps {
  jobs: Job[];
  totalJobs: number;
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  viewMode: "grid" | "list";
  sortBy: string;
  onViewModeChange: (mode: "grid" | "list") => void;
  onSortChange: (sortBy: string) => void;
  onPageChange: (page: number) => void;
  onSaveJob?: (jobId: string) => void;
}

const JobCard: React.FC<{
  job: Job;
  viewMode: "grid" | "list";
  onSaveJob?: (jobId: string) => void;
  onViewJob: (jobId: string) => void;
}> = ({ job, viewMode, onSaveJob, onViewJob }) => {
  const formatSalary = (salary: Job["salary"]) => {
    if (!salary) return "Salary not specified";
    const { min, max } = salary;
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  const getLocationDisplay = (job: Job) => {
    if (job.location.isRemote) return "Remote";
    return `${job.location.city}, ${job.location.state}`;
  };

  const isListView = viewMode === "list";

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white cursor-pointer ${
        isListView ? "mb-4" : ""
      }`}
      onClick={() => onViewJob(job.id)}
    >
      <CardContent
        className={`p-6 ${isListView ? "flex items-center space-x-6" : ""}`}
      >
        {/* Company Logo and Header */}
        <div
          className={`${
            isListView
              ? "flex-shrink-0"
              : "flex items-start justify-between mb-4"
          }`}
        >
          <div
            className={`flex items-center ${
              isListView ? "space-x-4" : "space-x-3"
            }`}
          >
            {job.companyLogo && (
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className={`${
                  isListView ? "w-16 h-16" : "w-12 h-12"
                } rounded-lg object-cover border`}
              />
            )}
            <div>
              <h3
                className={`font-semibold ${
                  isListView ? "text-xl" : "text-lg"
                } text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1`}
              >
                {job.title}
              </h3>
              <p
                className={`text-gray-600 ${
                  isListView ? "text-base" : "text-sm"
                }`}
              >
                {job.companyName}
              </p>
              {isListView && (
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{getLocationDisplay(job)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {formatDistanceToNow(new Date(job.postedAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {!isListView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSaveJob?.(job.id);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bookmark className="h-4 w-4 text-gray-400 hover:text-blue-600" />
            </button>
          )}
        </div>

        {/* Job Details */}
        <div className={`${isListView ? "flex-1" : "space-y-3 mb-4"}`}>
          {isListView ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Salary</div>
                <div className="font-medium">{formatSalary(job.salary)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Type</div>
                <Badge variant="secondary" className="text-xs">
                  {job.type}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Experience</div>
                <Badge variant="secondary" className="text-xs">
                  {job.experienceLevel}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Applicants</div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{job.applicationsCount}</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{getLocationDisplay(job)}</span>
                {job.workLocation !== "on-site" && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {job.workLocation}
                  </Badge>
                )}
              </div>

              <div className="flex items-center text-gray-600 text-sm">
                <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{formatSalary(job.salary)}</span>
              </div>

              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>
                  {formatDistanceToNow(new Date(job.postedAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <div className="flex items-center text-gray-600 text-sm">
                <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{job.applicationsCount} applicants</span>
              </div>
            </>
          )}
        </div>

        {/* Summary and Skills */}
        {!isListView && (
          <>
            <p className="text-gray-700 text-sm mb-4 line-clamp-2">
              {job.summary}
            </p>

            {job.skills && job.skills.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {job.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  {job.type}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {job.experienceLevel}
                </Badge>
                {job.featured && (
                  <Badge className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                    Featured
                  </Badge>
                )}
                {job.urgent && (
                  <Badge className="text-xs bg-red-100 text-red-800 border-red-200">
                    Urgent
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}

        {/* Actions for List View */}
        {isListView && (
          <div className="flex items-center space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSaveJob?.(job.id);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bookmark className="h-5 w-5 text-gray-400 hover:text-blue-600" />
            </button>
            <div className="flex flex-col gap-1">
              {job.featured && (
                <Badge className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                  Featured
                </Badge>
              )}
              {job.urgent && (
                <Badge className="text-xs bg-red-100 text-red-800 border-red-200">
                  Urgent
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const JobCardSkeleton: React.FC<{ viewMode: "grid" | "list" }> = ({
  viewMode,
}) => {
  const isListView = viewMode === "list";

  return (
    <Card className={`border-0 shadow-md bg-white ${isListView ? "mb-4" : ""}`}>
      <CardContent
        className={`p-6 ${isListView ? "flex items-center space-x-6" : ""}`}
      >
        <div
          className={`${
            isListView
              ? "flex-shrink-0"
              : "flex items-start justify-between mb-4"
          }`}
        >
          <div
            className={`flex items-center ${
              isListView ? "space-x-4" : "space-x-3"
            }`}
          >
            <div
              className={`${
                isListView ? "w-16 h-16" : "w-12 h-12"
              } bg-gray-200 rounded-lg animate-pulse`}
            ></div>
            <div>
              <div
                className={`${
                  isListView ? "w-48 h-6" : "w-32 h-5"
                } bg-gray-200 rounded animate-pulse mb-2`}
              ></div>
              <div
                className={`${
                  isListView ? "w-32 h-5" : "w-24 h-4"
                } bg-gray-200 rounded animate-pulse`}
              ></div>
            </div>
          </div>
          {!isListView && (
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          )}
        </div>

        {isListView ? (
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div className="w-20 h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 mb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        )}

        {!isListView && (
          <>
            <div className="w-full h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="flex gap-2 mb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-6 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </>
        )}

        {isListView && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const JobListings: React.FC<JobListingsProps> = ({
  jobs,
  totalJobs,
  currentPage,
  totalPages,
  isLoading = false,
  viewMode,
  sortBy,
  onViewModeChange,
  onSortChange,
  onPageChange,
  onSaveJob,
}) => {
  const navigate = useNavigate();

  const handleViewJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "date", label: "Most Recent" },
    { value: "salary", label: "Highest Salary" },
    { value: "company", label: "Company A-Z" },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {totalJobs.toLocaleString()} Jobs Found
          </h2>
          <p className="text-gray-600">
            Showing {(currentPage - 1) * 20 + 1} -{" "}
            {Math.min(currentPage * 20, totalJobs)} of{" "}
            {totalJobs.toLocaleString()} results
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort By */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <Select value={sortBy} onValueChange={onSortChange}>
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
              onClick={() => onViewModeChange("grid")}
              className="px-3"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
            : "space-y-0"
        }
      >
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <JobCardSkeleton key={index} viewMode={viewMode} />
            ))
          : jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                viewMode={viewMode}
                onSaveJob={onSaveJob}
                onViewJob={handleViewJob}
              />
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-3"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page =
              Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => onPageChange(page)}
                className="px-3"
              >
                {page}
              </Button>
            );
          })}

          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-3"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* No Results */}
      {!isLoading && jobs.length === 0 && (
        <div className="text-center py-12">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No jobs found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters to see more results.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobListings;
