import { CompanyMembersManagement } from "@/features/recruiter/company-members";
import { useUserCompany } from "@/features/companies/hooks";
import { useTranslation } from "react-i18next";

export default function RecruiterStaff() {
  const { t } = useTranslation();
  const { data: userCompanyData, isLoading, error } = useUserCompany();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">
          {t("common.error")}: {error.message}
        </div>
      </div>
    );
  }

  // No company associated
  if (!userCompanyData?.data?.company) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t("recruiterStaff.noCompany.title")}
          </h3>
          <p className="text-gray-600 mb-6">
            {t("recruiterStaff.noCompany.description")}
          </p>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              {t("recruiterStaff.noCompany.createCompany")}
            </button>
            <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
              {t("recruiterStaff.noCompany.joinCompany")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const companyId = userCompanyData.data.company.company.company_id;

  return <CompanyMembersManagement companyId={companyId} />;
}
