"use client";

import { useState, useEffect } from "react";
import { JobCard } from "@/components/features/jobs/job-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { Job } from "@/types/job";

interface FeaturedJobsSectionProps {
  jobs: Job[];
}

export function FeaturedJobsSection({ jobs }: FeaturedJobsSectionProps) {
  const router = useRouter();

  // Responsive job display: 3 on mobile, 6 on desktop
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show 3 jobs on mobile, 6 on desktop (reduced from 9)
  const jobsToShow = isMobile ? 3 : 6;
  const featuredJobs = jobs.slice(0, jobsToShow);

  const handleLoadMore = () => {
    router.push("/jobs");
  };

  return (
    <section className="py-16 lg:py-24 bg-[#f0f5f7]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-superio-text mb-4">
            Featured Jobs
          </h2>
          <p className="text-lg text-superio-text-muted max-w-2xl mx-auto">
            Know your worth and find the job that qualify your life
          </p>
        </div>

        {/* Jobs Grid - 2 columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featuredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              variant="grid"
              isMobile={isMobile}
              className="hover:shadow-lg transition-shadow duration-300"
              onBookmark={(id) => console.log(`Bookmarked job: ${id}`)}
              onApply={(id) => console.log(`Applied to job: ${id}`)}
              onViewDetails={(id) =>
                console.log(`Viewing details for job: ${id}`)
              }
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button
            onClick={handleLoadMore}
            variant="primary"
            size="lg"
            className="font-medium px-8 py-3 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Load More Listings
          </Button>
        </div>
      </div>
    </section>
  );
}
