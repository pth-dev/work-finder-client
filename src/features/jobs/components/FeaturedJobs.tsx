import React from "react";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  ArrowRight,
  Bookmark,
} from "lucide-react";
import { Button, Card, CardContent, Badge } from "@/components";
import { type Job } from "@/types";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface FeaturedJobsProps {
  jobs: Job[];
  onSaveJob?: (jobId: string) => void;
  isLoading?: boolean;
}

const JobCard: React.FC<{
  job: Job;
  onSaveJob?: (jobId: string) => void;
  onViewJob: (jobId: string) => void;
}> = ({ job, onSaveJob, onViewJob }) => {
  const formatSalary = (salary: Job["salary"]) => {
    if (!salary) return "Salary not specified";
    const { min, max } = salary;
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  const getLocationDisplay = (job: Job) => {
    if (job.location.isRemote) return "Remote";
    return `${job.location.city}, ${job.location.state}`;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {job.companyLogo && (
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="w-12 h-12 rounded-lg object-cover border"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {job.title}
              </h3>
              <p className="text-gray-600 text-sm">{job.companyName}</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSaveJob?.(job.id);
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bookmark className="h-4 w-4 text-gray-400 hover:text-blue-600" />
          </button>
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-4">
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
              {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
            </span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <Users className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{job.applicationsCount} applicants</span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{job.summary}</p>

        {/* Skills */}
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

        {/* Action Button */}
        <Button
          onClick={() => onViewJob(job.id)}
          className="w-full mt-4 group-hover:bg-blue-600 transition-colors"
          variant="outline"
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

const JobCardSkeleton: React.FC = () => (
  <Card className="border-0 shadow-md bg-white">
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          <div>
            <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      <div className="space-y-3 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="w-full h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="flex gap-2 mb-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-16 h-6 bg-gray-200 rounded animate-pulse"
          ></div>
        ))}
      </div>
      <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
    </CardContent>
  </Card>
);

export const FeaturedJobs: React.FC<FeaturedJobsProps> = ({
  jobs,
  onSaveJob,
  isLoading = false,
}) => {
  const navigate = useNavigate();

  const handleViewJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleViewAllJobs = () => {
    navigate("/jobs");
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-blue-600">Jobs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover hand-picked opportunities from top companies actively
            hiring talented professionals
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))
            : jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSaveJob={onSaveJob}
                  onViewJob={handleViewJob}
                />
              ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            onClick={handleViewAllJobs}
            size="lg"
            className="px-8 py-3 text-base font-semibold"
          >
            View All Jobs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
