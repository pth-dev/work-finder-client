import { HeroSection } from "@/components/sections/hero-section";
import { PopularCategoriesSection } from "@/components/sections/popular-categories-section";
import { FeaturedJobsSection } from "@/components/sections/featured-jobs-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { PopularCompaniesSection } from "@/components/sections/popular-companies-section";
import { StatisticsSection } from "@/components/sections/statistics-section";
import { RecentNewsSection } from "@/components/sections/recent-news-section";
import { MobileAppSection } from "@/components/sections/mobile-app-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";

// Mock data for job listings
const mockJobs = [
  {
    id: "1",
    title: "Software Engineer (Android), Libraries",
    description:
      "We are looking for an experienced Android developer to join our team.",
    summary:
      "Join our team to create incredible Android experiences for millions of users.",
    requirements: [
      "5+ years of Android development",
      "Kotlin experience",
      "Experience with modern architecture patterns",
    ],
    benefits: ["Competitive salary", "Health insurance", "Flexible work hours"],
    location: "London, UK",
    workType: "remote" as const,
    employmentType: "full-time" as const,
    experienceLevel: "senior" as const,
    salary: {
      min: 35000,
      max: 45000,
      currency: "$",
      period: "yearly" as const,
    },
    company: {
      id: "c1",
      name: "Segment",
      logo: "/company-logos/segment.svg",
      description: "Leading analytics company",
      website: "https://segment.com",
      size: "large" as const,
      industry: "Technology",
      location: "London, UK",
      rating: 4.8,
      founded: 2011,
      employees: "501-1000",
      benefits: ["Health insurance", "401k", "Flexible PTO"],
      culture: ["Innovation", "Collaboration", "Growth mindset"],
      socialLinks: {
        linkedin: "https://linkedin.com/company/segment",
        twitter: "https://twitter.com/segment",
      },
      verified: true,
      featured: true,
      jobsCount: 15,
      followersCount: 2500,
      reviewsCount: 120,
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
    },
    skills: ["Android", "Kotlin", "Java", "RxJava", "MVVM"],
    tags: ["Android", "Mobile", "Software Development"],
    postedAt: "2024-01-20T10:00:00Z",
    deadline: "2024-02-20T10:00:00Z",
    applicationsCount: 23,
    isBookmarked: false,
    featured: true,
    urgent: false,
    status: "active" as const,
  },
  {
    id: "2",
    title: "Senior Product Designer",
    description:
      "We're seeking a talented Product Designer to join our growing design team.",
    summary:
      "Shape the future of our product with your design expertise and user-centered approach.",
    requirements: [
      "4+ years of product design experience",
      "Proficiency in Figma and design systems",
      "Strong portfolio showcasing UX/UI work",
    ],
    benefits: ["Competitive salary", "Design budget", "Remote work options"],
    location: "San Francisco, CA",
    workType: "hybrid" as const,
    employmentType: "full-time" as const,
    experienceLevel: "senior" as const,
    salary: {
      min: 120000,
      max: 150000,
      currency: "$",
      period: "yearly" as const,
    },
    company: {
      id: "c2",
      name: "Dropbox",
      logo: "/company-logos/dropbox.svg",
      description: "Cloud storage and collaboration platform",
      website: "https://dropbox.com",
      size: "enterprise" as const,
      industry: "Technology",
      location: "San Francisco, CA",
      rating: 4.5,
      founded: 2007,
      employees: "1001-5000",
      benefits: ["Stock options", "Health insurance", "Unlimited PTO"],
      culture: ["Remote-first", "Diversity", "Innovation"],
      socialLinks: {
        linkedin: "https://linkedin.com/company/dropbox",
        twitter: "https://twitter.com/dropbox",
      },
      verified: true,
      featured: true,
      jobsCount: 25,
      followersCount: 5000,
      reviewsCount: 300,
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2024-01-18T14:30:00Z",
    },
    skills: [
      "Figma",
      "Sketch",
      "Prototyping",
      "User Research",
      "Design Systems",
    ],
    tags: ["Design", "UX/UI", "Product"],
    postedAt: "2024-01-18T14:30:00Z",
    deadline: "2024-02-18T14:30:00Z",
    applicationsCount: 67,
    isBookmarked: true,
    featured: true,
    urgent: false,
    status: "active" as const,
  },
  {
    id: "3",
    title: "Frontend Developer",
    description:
      "Join our frontend team to build amazing user experiences with React and TypeScript.",
    summary:
      "Work on cutting-edge web applications used by millions of users worldwide.",
    requirements: [
      "3+ years of React development",
      "TypeScript proficiency",
      "Experience with modern build tools",
    ],
    benefits: ["Flexible hours", "Learning budget", "Health insurance"],
    location: "Berlin, Germany",
    workType: "onsite" as const,
    employmentType: "full-time" as const,
    experienceLevel: "mid" as const,
    salary: {
      min: 60000,
      max: 80000,
      currency: "€",
      period: "yearly" as const,
    },
    company: {
      id: "c3",
      name: "Spotify",
      logo: "/company-logos/spotify.svg",
      description: "Music streaming platform",
      website: "https://spotify.com",
      size: "enterprise" as const,
      industry: "Entertainment",
      location: "Berlin, Germany",
      rating: 4.7,
      founded: 2006,
      employees: "5001-10000",
      benefits: ["Music streaming", "Wellness programs", "Parental leave"],
      culture: ["Music-first", "Creativity", "Agile"],
      socialLinks: {
        linkedin: "https://linkedin.com/company/spotify",
        twitter: "https://twitter.com/spotify",
      },
      verified: true,
      featured: false,
      jobsCount: 40,
      followersCount: 8000,
      reviewsCount: 450,
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2024-01-16T09:15:00Z",
    },
    skills: ["React", "TypeScript", "CSS", "JavaScript", "Git"],
    tags: ["Frontend", "React", "Web Development"],
    postedAt: "2024-01-16T09:15:00Z",
    deadline: "2024-02-16T09:15:00Z",
    applicationsCount: 89,
    isBookmarked: false,
    featured: false,
    urgent: true,
    status: "active" as const,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PopularCategoriesSection />
      <FeaturedJobsSection jobs={mockJobs} />
      <HowItWorksSection />
      <PopularCompaniesSection />
      <StatisticsSection />
      <RecentNewsSection />
      <MobileAppSection />
      <NewsletterSection />
    </main>
  );
}
