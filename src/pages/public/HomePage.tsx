import { HeroSection } from '@/shared/components/organisms/HeroSection';
import { FeaturedJobs } from '@/features/jobs/components/FeaturedJobs';
import { FeaturedCompanies } from '@/features/companies/components/FeaturedCompanies';
import { HeroSuspense, JobListSuspense, CompanyListSuspense } from '@/shared/components/organisms/Suspense';
import { recentJobs, featuredCompanies } from '@/lib/mock-data';

export function HomePage() {

  const handleSearch = (query: string, location: string, category: string) => {
    console.log('Search:', { query, location, category });
    // This will be handled by the navigation in HeroSection
  };

  const handleSaveJob = (jobId: string) => {
    console.log('Save job:', jobId);
    // TODO: Implement save job functionality
  };

  return (
    <main className="min-h-screen">      
      {/* Hero Section */}
      <HeroSuspense>
        <HeroSection onSearch={handleSearch} />
      </HeroSuspense>
      
      {/* Featured Jobs Section */}
      <JobListSuspense>
        <FeaturedJobs 
          jobs={recentJobs}
          onSaveJob={handleSaveJob}
          isLoading={false}
        />
      </JobListSuspense>
      
      {/* Featured Companies Section */}
      <CompanyListSuspense>
        <FeaturedCompanies 
          companies={featuredCompanies}
          isLoading={false}
        />
      </CompanyListSuspense>
    </main>
  );
}