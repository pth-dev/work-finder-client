"use client";

import { CompanyListWithFilters } from "@/components/features/companies/company-list-with-filters";
import { PageHeader } from "@/components/shared/page-header";
import { useTranslation } from "@/hooks/useTranslation";

// Mock companies data
const mockCompanies = [
  {
    id: "1",
    name: "Segment",
    logo: "/company-logos/segment.svg",
    description:
      "Leading analytics company helping businesses understand their customers",
    website: "https://segment.com",
    size: "501-1000",
    industry: "Technology",
    location: "London, UK",
    rating: 4.8,
    jobCount: 23,
    featured: true,
  },
  {
    id: "2",
    name: "Dropbox",
    logo: "/company-logos/dropbox.svg",
    description:
      "Cloud storage and collaboration platform used by millions worldwide",
    website: "https://dropbox.com",
    size: "1001-5000",
    industry: "Technology",
    location: "San Francisco, CA",
    rating: 4.5,
    jobCount: 67,
    featured: true,
  },
  {
    id: "3",
    name: "Spotify",
    logo: "/company-logos/spotify.svg",
    description:
      "Music streaming platform connecting artists and fans globally",
    website: "https://spotify.com",
    size: "5001-10000",
    industry: "Entertainment",
    location: "Berlin, Germany",
    rating: 4.7,
    jobCount: 89,
    featured: false,
  },
  {
    id: "4",
    name: "Airbnb",
    logo: "/company-logos/airbnb.svg",
    description: "Online marketplace for lodging and tourism experiences",
    website: "https://airbnb.com",
    size: "1001-5000",
    industry: "Travel",
    location: "San Francisco, CA",
    rating: 4.6,
    jobCount: 45,
    featured: false,
  },
  {
    id: "5",
    name: "Slack",
    logo: "/company-logos/slack.svg",
    description: "Business communication platform for teams and organizations",
    website: "https://slack.com",
    size: "501-1000",
    industry: "Technology",
    location: "San Francisco, CA",
    rating: 4.4,
    jobCount: 32,
    featured: false,
  },
];

export default function CompaniesPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title={t("companies.title")}
          description={t("companies.searchCompanies")}
          breadcrumbs={[
            { label: t("navigation.home"), href: "/" },
            { label: t("companies.title") },
          ]}
        />

        <CompanyListWithFilters
          companies={mockCompanies}
          currentPage={1}
          totalPages={5}
          onPageChange={(page) => console.log(`Go to page: ${page}`)}
          onViewJobs={(companyId) =>
            console.log(`View jobs for company: ${companyId}`)
          }
          onViewProfile={(companyId) =>
            console.log(`View profile for company: ${companyId}`)
          }
        />
      </div>
    </div>
  );
}
