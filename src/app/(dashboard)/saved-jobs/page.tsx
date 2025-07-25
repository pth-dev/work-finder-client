"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Clock, Heart, ExternalLink } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function SavedJobsPage() {
  const { t } = useTranslation();

  const mockSavedJobs = [
    {
      id: "1",
      title: "Senior Backend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$130k - $170k",
      savedDate: "2024-01-20",
      tags: ["Node.js", "PostgreSQL", "AWS"],
      featured: true,
    },
    {
      id: "2",
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $150k",
      savedDate: "2024-01-18",
      tags: ["Docker", "Kubernetes", "CI/CD"],
      featured: false,
    },
    {
      id: "3",
      title: "Full Stack Developer",
      company: "StartupABC",
      location: "New York, NY",
      type: "Contract",
      salary: "$90k - $120k",
      savedDate: "2024-01-15",
      tags: ["React", "Express", "MongoDB"],
      featured: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t('dashboard.savedJobs')}
        </h1>
        <p className="text-gray-600 mt-2">
          Jobs you've saved for later review
        </p>
      </div>

      <div className="space-y-4">
        {mockSavedJobs.map((job) => (
          <Card key={job.id} className={`hover:shadow-lg transition-shadow ${job.featured ? 'border-blue-200 bg-blue-50/30' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2 flex items-center gap-2">
                    {job.title}
                    {job.featured && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Featured
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {job.type}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-600 mb-1">
                    {job.salary}
                  </div>
                  <div className="text-sm text-gray-500">
                    Saved {job.savedDate}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-3">
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t('jobs.applyNow')}
                </Button>
                <Button variant="outline">
                  <Heart className="h-4 w-4 mr-2 fill-red-500 text-red-500" />
                  Saved
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
