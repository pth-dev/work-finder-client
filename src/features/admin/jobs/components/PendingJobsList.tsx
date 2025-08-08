import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/global-loading";
import { usePendingJobs } from "../api/admin-jobs";
import { PendingJobCard } from "./PendingJobCard";
import { ChevronLeft, ChevronRight, Clock, AlertCircle } from "lucide-react";

export function PendingJobsList() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const {
    data: pendingJobsData,
    isLoading,
    error,
  } = usePendingJobs(currentPage, limit);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t("admin.jobs.pendingJobs.title", "Pending Jobs")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <LoadingSpinner
              message={t(
                "admin.jobs.pendingJobs.loading",
                "Loading pending jobs..."
              )}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t("admin.jobs.pendingJobs.title", "Pending Jobs")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t("admin.jobs.pendingJobs.error.title", "Failed to Load Jobs")}
            </h3>
            <p className="text-gray-600 mb-4">
              {t(
                "admin.jobs.pendingJobs.error.message",
                "There was an error loading pending jobs. Please try again."
              )}
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              {t("common.retry", "Retry")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const pendingJobs = pendingJobsData?.data;
  if (!pendingJobs) return null;

  const { jobs, total, totalPages } = pendingJobs;

  if (jobs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t("admin.jobs.pendingJobs.title", "Pending Jobs")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t("admin.jobs.pendingJobs.empty.title", "No Pending Jobs")}
            </h3>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t(
              "admin.jobs.pendingJobs.titleWithCount",
              "Pending Jobs ({{count}})",
              { count: total }
            )}
          </CardTitle>
          <div className="text-sm text-gray-600">
            {t("common.pagination.pageInfo", "Page {{current}} of {{total}}", {
              current: currentPage,
              total: totalPages,
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Jobs List - 2 columns */}
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <PendingJobCard key={job.job_id} job={job} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-600">
              {t(
                "common.pagination.showing",
                "Showing {{from}} to {{to}} of {{total}} jobs",
                {
                  from: (currentPage - 1) * limit + 1,
                  to: Math.min(currentPage * limit, total),
                  total,
                }
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {t("common.pagination.previous", "Previous")}
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                {t("common.pagination.next", "Next")}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
