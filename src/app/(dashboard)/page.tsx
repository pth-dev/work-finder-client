import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Eye,
  Heart,
  TrendingUp,
  MapPin,
  Clock,
  FileText,
  User,
} from "lucide-react";
import Link from "next/link";
import { DASHBOARD_ROUTES, PUBLIC_ROUTES } from "@/constants/routes";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, John!
        </h1>
        <p className="text-gray-600 mt-2">
          Here&apos;s what&apos;s happening with your job search today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Interview Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              Your latest job applications and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  company: "Google",
                  position: "Senior Frontend Developer",
                  status: "Under Review",
                  appliedDate: "2 days ago",
                  location: "Mountain View, CA",
                },
                {
                  company: "Microsoft",
                  position: "Product Manager",
                  status: "Interview Scheduled",
                  appliedDate: "5 days ago",
                  location: "Seattle, WA",
                },
                {
                  company: "Apple",
                  position: "iOS Developer",
                  status: "Application Sent",
                  appliedDate: "1 week ago",
                  location: "Cupertino, CA",
                },
              ].map((application, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{application.position}</h4>
                    <p className="text-sm text-gray-600">
                      {application.company}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {application.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {application.appliedDate}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant={
                      application.status === "Interview Scheduled"
                        ? "default"
                        : application.status === "Under Review"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {application.status}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href={DASHBOARD_ROUTES.APPLICATIONS}>
                  View All Applications
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>
              Jobs that match your profile and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  company: "Stripe",
                  position: "Full Stack Engineer",
                  location: "San Francisco, CA",
                  type: "Full-time",
                  salary: "$120k - $180k",
                  posted: "2 hours ago",
                },
                {
                  company: "Airbnb",
                  position: "Senior React Developer",
                  location: "Remote",
                  type: "Full-time",
                  salary: "$130k - $170k",
                  posted: "1 day ago",
                },
                {
                  company: "Shopify",
                  position: "Frontend Engineer",
                  location: "Toronto, ON",
                  type: "Full-time",
                  salary: "$100k - $140k",
                  posted: "3 days ago",
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium">{job.position}</h4>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {job.location}
                      </span>
                      <span>{job.salary}</span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {job.posted}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href={PUBLIC_ROUTES.JOBS}>Browse All Jobs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to help you with your job search
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              asChild
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <Link href={DASHBOARD_ROUTES.RESUME}>
                <FileText className="h-6 w-6" />
                <span>Update Resume</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <Link href={DASHBOARD_ROUTES.PROFILE}>
                <User className="h-6 w-6" />
                <span>Edit Profile</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <Link href={PUBLIC_ROUTES.JOBS_SEARCH}>
                <Briefcase className="h-6 w-6" />
                <span>Search Jobs</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
