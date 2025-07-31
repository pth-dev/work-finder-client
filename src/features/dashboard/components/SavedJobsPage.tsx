import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  MapPin,
  Clock,
  DollarSign,
  Eye,
  Trash2,
  ExternalLink,
  Share2,
} from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  Badge,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import { mockJobs } from "@/lib/mock-data";
import { Job, SavedJob } from "@/types";
import { formatDistanceToNow } from "date-fns";

export function SavedJobsPage() {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - create saved jobs from mock data
    setTimeout(() => {
      const mockSavedJobs: SavedJob[] = mockJobs
        .slice(0, 3)
        .map((job, index) => ({
          id: `saved-${index + 1}`,
          userId: "user-1",
          jobId: job.id,
          job: job,
          savedAt: new Date(
            Date.now() - (index + 1) * 24 * 60 * 60 * 1000
          ).toISOString(),
          notes:
            index === 0
              ? "Interested in this role for the tech stack"
              : undefined,
        }));
      setSavedJobs(mockSavedJobs);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleViewJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleApplyToJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleUnsaveJob = (savedJobId: string) => {
    setSavedJobs((prev) => prev.filter((saved) => saved.id !== savedJobId));
  };

  const handleShareJob = (job: Job) => {
    const url = `${window.location.origin}/jobs/${job.id}`;
    navigator.clipboard.writeText(url);
    // TODO: Show toast notification
  };

  const formatSalary = (salary: Job["salary"]) => {
    if (!salary) return "Salary not specified";
    const { min, max } = salary;
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  const getLocationDisplay = (job: Job) => {
    if (job.location.isRemote || job.workLocation === "remote") return "Remote";
    return `${job.location.city}, ${job.location.state}`;
  };

  const SavedJobCard = ({ savedJob }: { savedJob: SavedJob }) => {
    const { job } = savedJob;

    return (
      <Card className="shadow-sm border-0 hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {job.companyLogo && (
                  <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="w-12 h-12 rounded-lg object-cover border"
                  />
                )}
                <div>
                  <h3
                    className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors"
                    onClick={() => handleViewJob(job.id)}
                  >
                    {job.title}
                  </h3>
                  <p className="text-blue-600 font-medium">{job.companyName}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{getLocationDisplay(job)}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>{formatSalary(job.salary)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    Posted{" "}
                    {formatDistanceToNow(new Date(job.postedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                {job.summary}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <div className="text-right text-sm text-gray-500">
                <div className="flex items-center mb-1">
                  <Bookmark className="h-4 w-4 mr-1 text-blue-500" />
                  <span>
                    Saved{" "}
                    {formatDistanceToNow(new Date(savedJob.savedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                {job.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs mb-1">
                    Featured
                  </Badge>
                )}
                {job.urgent && (
                  <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                    Urgent
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Job Type</div>
              <Badge variant="secondary" className="text-xs capitalize">
                {job.type.replace("-", " ")}
              </Badge>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Experience</div>
              <Badge variant="secondary" className="text-xs capitalize">
                {job.experienceLevel.replace("-", " ")}
              </Badge>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Work Style</div>
              <Badge variant="secondary" className="text-xs capitalize">
                {job.workLocation.replace("-", " ")}
              </Badge>
            </div>
          </div>

          {/* Skills */}
          {job.skills && job.skills.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {job.skills.slice(0, 5).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {job.skills.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{job.skills.length - 5} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {savedJob.notes && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-blue-800 text-sm font-medium mb-1">
                Your Notes
              </div>
              <p className="text-blue-700 text-sm">{savedJob.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleViewJob(job.id)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShareJob(job)}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={() => handleApplyToJob(job.id)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Apply Now
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Remove Saved Job</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to remove "{job.title}" at{" "}
                      {job.companyName} from your saved jobs?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleUnsaveJob(savedJob.id)}
                    >
                      Remove
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Saved Jobs</h1>
          <p className="text-lg text-gray-600">
            Keep track of jobs you're interested in and apply when you're ready
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Bookmark className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {savedJobs.length}
              </div>
              <div className="text-gray-600">Saved Jobs</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {
                  savedJobs.filter((saved) => {
                    const postedDate = new Date(saved.job.postedAt);
                    const weekAgo = new Date(
                      Date.now() - 7 * 24 * 60 * 60 * 1000
                    );
                    return postedDate > weekAgo;
                  }).length
                }
              </div>
              <div className="text-gray-600">Recently Posted</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <ExternalLink className="h-8 w-8 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {savedJobs.filter((saved) => saved.job.urgent).length}
              </div>
              <div className="text-gray-600">Urgent Hiring</div>
            </CardContent>
          </Card>
        </div>

        {/* Saved Jobs List */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="shadow-sm border-0">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                        <div>
                          <div className="w-48 h-6 bg-gray-200 rounded mb-2"></div>
                          <div className="w-32 h-4 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div className="w-24 h-6 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-full h-16 bg-gray-200 rounded mb-4"></div>
                    <div className="flex gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-16 h-6 bg-gray-200 rounded"
                        ></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : savedJobs.length > 0 ? (
          <div className="space-y-4">
            {savedJobs.map((savedJob) => (
              <SavedJobCard key={savedJob.id} savedJob={savedJob} />
            ))}
          </div>
        ) : (
          <Card className="shadow-sm border-0">
            <CardContent className="text-center py-12">
              <Bookmark className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No saved jobs yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start saving jobs you're interested in to keep track of them and
                apply later
              </p>
              <Button onClick={() => navigate("/jobs")}>Browse Jobs</Button>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        {savedJobs.length > 0 && (
          <Card className="shadow-sm border-0 mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Pro Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Set up job alerts</strong> to get notified when
                    similar positions are posted
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Apply within 48 hours</strong> of a job being posted
                    for better chances
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Research the company</strong> before applying to
                    tailor your application
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Keep your profile updated</strong> to match with
                    relevant opportunities
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
