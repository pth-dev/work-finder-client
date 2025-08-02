import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading skeleton for JobDetailPage
 * Matches the layout structure of the actual job detail page
 */
export function JobDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
          {/* Main Content Column */}
          <div className="space-y-6">
            {/* Job Header Card */}
            <Card>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-6">
                  {/* Company Logo */}
                  <Skeleton className="h-20 w-20 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    {/* Job Title */}
                    <Skeleton className="h-8 w-3/4" />
                    {/* Company Name */}
                    <Skeleton className="h-4 w-1/2" />
                    {/* Job Tags */}
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Job Description Card */}
            <Card>
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-40" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
                <Skeleton className="h-4 w-3/4" />
              </div>
            </Card>

            {/* Job Requirements Card */}
            <Card>
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-32" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Job Benefits Card */}
            <Card>
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-28" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Job Overview Card */}
            <Card>
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-32" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-4 w-4 flex-shrink-0" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Apply Button Card */}
            <Card>
              <div className="p-6">
                <Skeleton className="h-12 w-full" />
              </div>
            </Card>

            {/* Company Info Card */}
            <Card>
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-28" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
