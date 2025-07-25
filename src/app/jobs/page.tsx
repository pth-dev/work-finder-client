"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Building2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// Mock jobs data
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    postedDate: "2 days ago",
    description: "We're looking for a senior frontend developer to join our team...",
    tags: ["React", "TypeScript", "Next.js"],
    featured: true,
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $140k",
    postedDate: "1 week ago",
    description: "Join our product team to drive innovation and growth...",
    tags: ["Product Strategy", "Analytics", "Agile"],
    featured: false,
  },
  {
    id: "3",
    title: "UX Designer",
    company: "DesignStudio",
    location: "New York, NY",
    type: "Contract",
    salary: "$80k - $100k",
    postedDate: "3 days ago",
    description: "Create beautiful and intuitive user experiences...",
    tags: ["Figma", "User Research", "Prototyping"],
    featured: true,
  },
];

export default function JobsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('jobs.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('jobs.searchResults')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex gap-4">
            <Input
              placeholder={t('homepage.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button>{t('common.search')}</Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" size="sm">
              {t('jobs.location')}
            </Button>
            <Button variant="outline" size="sm">
              {t('jobs.jobType')}
            </Button>
            <Button variant="outline" size="sm">
              {t('jobs.experience')}
            </Button>
            <Button variant="outline" size="sm">
              {t('jobs.salary')}
            </Button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {mockJobs.map((job) => (
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
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {job.postedDate}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button>{t('jobs.applyNow')}</Button>
                  <Button variant="outline">{t('jobs.saveJob')}</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            {t('jobs.loadMore')}
          </Button>
        </div>
      </div>
    </div>
  );
}
