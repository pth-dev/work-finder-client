import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import { ApplicationsFilters } from "./ApplicationsFilters";
import { ApplicationsGrid } from "./ApplicationsGrid";
import { ApplicationDetailModal } from "./ApplicationDetailModal";
// import { useApplications } from "../hooks"; // TODO: Implement this hook

// Mock data for development
const mockApplications = [
  {
    application_id: 1,
    job_id: 101,
    status: "under_review",
    applied_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-16T14:20:00Z",
    job_post: {
      job_id: 101,
      job_title: "Senior Frontend Developer",
      location: "Ho Chi Minh City",
      salary_min: 25000000,
      salary_max: 35000000,
      job_type: "full_time",
      company: {
        company_id: 1,
        company_name: "TechCorp Vietnam",
        company_image: "https://via.placeholder.com/48x48?text=TC",
      },
    },
  },
  {
    application_id: 2,
    job_id: 102,
    status: "interview_scheduled",
    applied_at: "2024-01-14T15:45:00Z",
    updated_at: "2024-01-17T09:15:00Z",
    job_post: {
      job_id: 102,
      job_title: "React Developer",
      location: "Remote",
      salary_min: 20000000,
      salary_max: 30000000,
      job_type: "contract",
      company: {
        company_id: 2,
        company_name: "StartupXYZ",
        company_image: "https://via.placeholder.com/48x48?text=SX",
      },
    },
  },
  {
    application_id: 3,
    job_id: 103,
    status: "pending",
    applied_at: "2024-01-13T09:20:00Z",
    updated_at: "2024-01-13T09:20:00Z",
    job_post: {
      job_id: 103,
      job_title: "UI/UX Designer",
      location: "Hanoi",
      salary_min: 15000000,
      salary_max: 25000000,
      job_type: "full_time",
      company: {
        company_id: 3,
        company_name: "Design Studio",
        company_image: "https://via.placeholder.com/48x48?text=DS",
      },
    },
  },
  {
    application_id: 4,
    job_id: 104,
    status: "rejected",
    applied_at: "2024-01-10T11:00:00Z",
    updated_at: "2024-01-12T16:30:00Z",
    job_post: {
      job_id: 104,
      job_title: "Backend Developer",
      location: "Da Nang",
      salary_min: 22000000,
      salary_max: 32000000,
      job_type: "full_time",
      company: {
        company_id: 4,
        company_name: "CloudTech Solutions",
        company_image: "https://via.placeholder.com/48x48?text=CT",
      },
    },
  },
  {
    application_id: 5,
    job_id: 105,
    status: "accepted",
    applied_at: "2024-01-08T14:15:00Z",
    updated_at: "2024-01-11T10:45:00Z",
    job_post: {
      job_id: 105,
      job_title: "Full Stack Developer",
      location: "Ho Chi Minh City",
      salary_min: 30000000,
      salary_max: 40000000,
      job_type: "full_time",
      company: {
        company_id: 5,
        company_name: "InnovateTech",
        company_image: "https://via.placeholder.com/48x48?text=IT",
      },
    },
  },
];

export function ApplicationsPage() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<{
    page: number;
    limit: number;
    search?: string;
    status?: string;
  }>({
    page: 1,
    limit: 10,
  });
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    number | null
  >(null);

  // Use mock data for now - replace with real API call later
  // const { data, isLoading } = useApplications(filters); // TODO: Implement this hook
  const isLoading = false;

  // Mock response structure with filtering
  const mockResponse = {
    applications: mockApplications.filter((app) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          app.job_post?.job_title.toLowerCase().includes(searchLower) ||
          app.job_post?.company.company_name.toLowerCase().includes(searchLower)
        );
      }
      if (filters.status && app.status !== filters.status) {
        return false;
      }
      return true;
    }),
    pagination: {
      total: mockApplications.length,
      page: filters.page || 1,
      limit: filters.limit || 10,
      totalPages: Math.ceil(mockApplications.length / (filters.limit || 10)),
    },
  };

  const applicationsData = mockResponse;

  const handleFiltersChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      page: 1,
      limit: 10,
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleViewDetails = useCallback((applicationId: number) => {
    setSelectedApplicationId(applicationId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedApplicationId(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <FileText className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("applications.title", "My Applications")}
          </h1>
          <p className="text-gray-600">
            {t(
              "applications.subtitle",
              "Track and manage your job applications"
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <ApplicationsFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      {/* Applications Grid */}
      <ApplicationsGrid
        applications={applicationsData.applications}
        isLoading={isLoading}
        filters={filters}
        totalPages={applicationsData.pagination.totalPages}
        currentPage={applicationsData.pagination.page}
        total={applicationsData.pagination.total}
        onPageChange={handlePageChange}
        onViewDetails={handleViewDetails}
      />

      {/* Application Detail Modal */}
      <ApplicationDetailModal
        isOpen={selectedApplicationId !== null}
        onClose={handleCloseModal}
        applicationId={selectedApplicationId || undefined}
      />
    </div>
  );
}
