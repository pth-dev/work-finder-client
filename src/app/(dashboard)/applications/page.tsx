"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Clock, Eye } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ApplicationsPage() {
  const { t } = useTranslation();

  const mockApplications = [
    {
      id: "1",
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      appliedDate: "2024-01-15",
      status: "reviewed",
      salary: "$120k - $160k",
    },
    {
      id: "2",
      jobTitle: "Product Manager",
      company: "StartupXYZ",
      location: "Remote",
      appliedDate: "2024-01-10",
      status: "pending",
      salary: "$100k - $140k",
    },
    {
      id: "3",
      jobTitle: "UX Designer",
      company: "DesignStudio",
      location: "New York, NY",
      appliedDate: "2024-01-08",
      status: "interviewed",
      salary: "$80k - $100k",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "interviewed":
        return "bg-purple-100 text-purple-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t('dashboard.myApplications')}
        </h1>
        <p className="text-gray-600 mt-2">
          Track your job applications and their status
        </p>
      </div>

      <div className="space-y-4">
        {mockApplications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">
                    {application.jobTitle}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {application.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {application.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Applied {application.appliedDate}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(application.status)}>
                  {t(`dashboard.${application.status}`)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold text-green-600">
                  {application.salary}
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
