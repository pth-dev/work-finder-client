import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useInterviews } from "../hooks";
import { InterviewFilters } from "../types";
import { InterviewsTable } from "./InterviewsTable";

export function InterviewsManagement() {
  const { t } = useTranslation();
  const [filters] = useState<InterviewFilters>({
    page: 1,
    limit: 20,
    sortBy: "scheduled_at",
    sortOrder: "desc",
  });

  // Data fetching - now using real API
  const {
    data: interviewsData,
    isLoading: interviewsLoading,
    error: interviewsError,
  } = useInterviews(filters);

  if (interviewsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (interviewsError) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading interviews: {interviewsError.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          {t("recruiterInterviews.title")}
        </h1>
        <p className="text-gray-600">{t("recruiterInterviews.subtitle")}</p>
      </div>

      {/* Interviews List */}
      <InterviewsTable
        interviews={interviewsData?.interviews || []}
        selectedInterviews={[]}
        onSelectInterview={() => {}}
        onSelectAll={() => {}}
        onViewDetail={() => {}}
        onStatusChange={() => {}}
        onEdit={() => {}}
        isLoading={interviewsLoading}
      />
    </div>
  );
}
