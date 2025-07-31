import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Calendar,
  Eye,
  Trash2,
  ExternalLink,
  FileText,
  Users,
  CheckCircle,
} from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import { mockApplications } from "@/lib/mock-data";
import { type Application, type ApplicationStatus } from "@/types";
import { formatDistanceToNow } from "date-fns";

export function ApplicationsPage() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setApplications(mockApplications);
      setIsLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "submitted":
      case "under_review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "interview_scheduled":
      case "interview_completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "offer_pending":
      case "offer_accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
      case "withdrawn":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: ApplicationStatus) => {
    switch (status) {
      case "submitted":
        return "Submitted";
      case "under_review":
        return "Under Review";
      case "screening":
        return "Screening";
      case "interview_scheduled":
        return "Interview Scheduled";
      case "interview_completed":
        return "Interview Completed";
      case "reference_check":
        return "Reference Check";
      case "offer_pending":
        return "Offer Pending";
      case "offer_accepted":
        return "Offer Accepted";
      case "offer_declined":
        return "Offer Declined";
      case "rejected":
        return "Rejected";
      case "withdrawn":
        return "Withdrawn";
      default:
        return "Draft";
    }
  };

  const filteredApplications = applications.filter((app) => {
    switch (activeTab) {
      case "in-review":
        return ["submitted", "under_review", "screening"].includes(app.status);
      case "interviews":
        return ["interview_scheduled", "interview_completed"].includes(
          app.status
        );
      case "offers":
        return ["offer_pending", "offer_accepted", "offer_declined"].includes(
          app.status
        );
      default:
        return true;
    }
  });

  const stats = {
    total: applications.length,
    inReview: applications.filter((app) =>
      ["submitted", "under_review", "screening"].includes(app.status)
    ).length,
    interviews: applications.filter((app) =>
      ["interview_scheduled", "interview_completed"].includes(app.status)
    ).length,
    offers: applications.filter((app) =>
      ["offer_pending", "offer_accepted"].includes(app.status)
    ).length,
  };

  const handleViewApplication = (appId: string) => {
    // Navigate to application detail page (would need to be created)
    console.log("View application:", appId);
  };

  const handleViewJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleWithdrawApplication = (appId: string) => {
    // TODO: Implement withdraw functionality
    console.log("Withdraw application:", appId);
  };

  const ApplicationCard = ({ application }: { application: Application }) => (
    <Card className="shadow-sm border-0 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {application.job.companyLogo && (
                <img
                  src={application.job.companyLogo}
                  alt={application.job.companyName}
                  className="w-10 h-10 rounded-lg object-cover border"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {application.job.title}
                </h3>
                <p className="text-blue-600 font-medium">
                  {application.job.companyName}
                </p>
              </div>
            </div>
            <p className="text-gray-600 mb-2">{application.job.location}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  Applied{" "}
                  {formatDistanceToNow(new Date(application.appliedAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              {application.job.salary && (
                <div className="text-green-600 font-medium">
                  ${(application.job.salary.min / 1000).toFixed(0)}k - $
                  {(application.job.salary.max / 1000).toFixed(0)}k
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <Badge className={`${getStatusColor(application.status)} mb-2`}>
              {getStatusLabel(application.status)}
            </Badge>
            {application.priority === "high" && (
              <Badge variant="outline" className="block text-xs">
                High Priority
              </Badge>
            )}
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <FileText className="h-4 w-4 mr-1" />
            <span>Application Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            {application.timeline.slice(-3).map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    index === application.timeline.length - 1
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                ></div>
                {index < 2 && <div className="w-8 h-px bg-gray-300 mx-1"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Interview Information */}
        {application.interviews.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center text-blue-800 text-sm mb-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="font-medium">Upcoming Interview</span>
            </div>
            <p className="text-blue-700 text-sm">
              {application.interviews[0].title} -{" "}
              {new Date(
                application.interviews[0].scheduledAt
              ).toLocaleDateString()}{" "}
              at{" "}
              {new Date(
                application.interviews[0].scheduledAt
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        )}

        {/* Tags */}
        {application.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {application.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewApplication(application.id)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewJob(application.jobId)}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              View Job
            </Button>
          </div>
          <div className="flex space-x-2">
            {application.status === "interview_scheduled" && (
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Join Interview
              </Button>
            )}
            {application.status === "offer_pending" && (
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                View Offer
              </Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw Application</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to withdraw your application for{" "}
                    {application.job.title} at {application.job.companyName}?
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleWithdrawApplication(application.id)}
                  >
                    Withdraw Application
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            My Applications
          </h1>
          <p className="text-lg text-gray-600">
            Track your job applications and their status
          </p>
        </div>

        {/* Application Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {stats.total}
              </div>
              <div className="text-gray-600">Total Applications</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {stats.inReview}
              </div>
              <div className="text-gray-600">In Review</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {stats.interviews}
              </div>
              <div className="text-gray-600">Interviews</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {stats.offers}
              </div>
              <div className="text-gray-600">Offers</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All Applications ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="in-review">
              In Review ({stats.inReview})
            </TabsTrigger>
            <TabsTrigger value="interviews">
              Interviews ({stats.interviews})
            </TabsTrigger>
            <TabsTrigger value="offers">Offers ({stats.offers})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="shadow-sm border-0">
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                            <div>
                              <div className="w-48 h-6 bg-gray-200 rounded mb-2"></div>
                              <div className="w-32 h-4 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                          <div className="w-24 h-6 bg-gray-200 rounded"></div>
                        </div>
                        <div className="w-full h-16 bg-gray-200 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredApplications.length > 0 ? (
              <div className="space-y-4">
                {filteredApplications.map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                  />
                ))}
              </div>
            ) : (
              <Card className="shadow-sm border-0">
                <CardContent className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No applications yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start applying to jobs to see your applications here
                  </p>
                  <Button onClick={() => navigate("/jobs")}>Browse Jobs</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="in-review" className="mt-6">
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interviews" className="mt-6">
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offers" className="mt-6">
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
