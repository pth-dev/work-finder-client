import { HeroSection } from "./hero-section";
import { FeaturedJobs } from "@/features/jobs/components/FeaturedJobs";
import { FeaturedCompanies } from "@/features/companies/components/FeaturedCompanies";
import { recentJobs, featuredCompanies } from "@/lib/mock-data";

export function HomePage() {
  const handleSearch = (query: string, location: string, category: string) => {
    console.log("Search:", { query, location, category });
    // This will be handled by the navigation in HeroSection
  };

  const handleSaveJob = (jobId: string) => {
    console.log("Save job:", jobId);
    // TODO: Implement save job functionality
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} />

      {/* Featured Jobs Section */}
      <FeaturedJobs
        jobs={recentJobs}
        onSaveJob={handleSaveJob}
        isLoading={false}
      />

      {/* Featured Companies Section */}
      <FeaturedCompanies companies={featuredCompanies} isLoading={false} />
    </main>
  );
}
