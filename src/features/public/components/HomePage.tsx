import { HeroSection } from "./hero-section";
import { FeaturedJobs } from "@/features/jobs/components/FeaturedJobs";
import { FeaturedCompanies } from "@/features/companies/components/FeaturedCompanies";
import { useFeaturedCompanies } from "@/features/companies/hooks";
// ✅ REMOVED: transformer - using direct backend format
import type { JobSearchParams } from "@/components/ui/search/hero-search-form";

export function HomePage() {
  // Use real API for companies instead of mock data
  const { data: companiesData, isLoading: companiesLoading } =
    useFeaturedCompanies(6);

  // ✅ BACKEND-FIRST: Use API companies directly without transformation
  const companies = companiesData?.data?.companies || [];

  const handleSearch = (params: JobSearchParams) => {
    console.log("Search:", params);
    // This will be handled by the navigation in HeroSection
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} />

      {/* ✅ NEW: Component using backend format directly */}
      <FeaturedJobs />

      {/* ✅ NEW: Companies using backend format directly */}
      <FeaturedCompanies companies={companies} isLoading={companiesLoading} />
    </main>
  );
}
