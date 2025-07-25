"use client";

import { JobCard } from "@/components/features/jobs/job-card";
import type { Job } from "@/types/job";

interface JobListProps {
  jobs: Job[];
  variant?: "list" | "grid";
}

export const JobList = ({ jobs, variant = "grid" }: JobListProps) => {
  if (variant === "list") {
    return (
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            variant="list"
            onBookmark={(id) => console.log(`Bookmarked job: ${id}`)}
            onApply={(id) => console.log(`Applied to job: ${id}`)}
            onViewDetails={(id) =>
              console.log(`Viewing details for job: ${id}`)
            }
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          variant="grid"
          onBookmark={(id) => console.log(`Bookmarked job: ${id}`)}
          onApply={(id) => console.log(`Applied to job: ${id}`)}
          onViewDetails={(id) => console.log(`Viewing details for job: ${id}`)}
        />
      ))}
    </div>
  );
};
