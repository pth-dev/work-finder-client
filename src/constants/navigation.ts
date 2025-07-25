import { Briefcase, Building2, Users, BookOpen } from "lucide-react";

export interface NavigationChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavigationChild[];
}

// Base navigation structure - labels will be translated dynamically
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "find-jobs",
    label: "Find Jobs", // Will be translated
    href: "/jobs",
    icon: Briefcase,
    children: [
      {
        label: "Browse Jobs", // Will be translated
        href: "/jobs",
        description: "Search through all available positions", // Will be translated
      },
      {
        label: "Browse Categories", // Will be translated
        href: "/categories",
        description: "Explore jobs by industry and type", // Will be translated
      },
      {
        label: "Job Alerts", // Will be translated
        href: "/job-alerts",
        description: "Get notified about new opportunities", // Will be translated
      },
      {
        label: "My Bookmarks", // Will be translated
        href: "/bookmarks",
        description: "View your saved job listings", // Will be translated
      },
    ],
  },
  {
    id: "employers",
    label: "Employers", // Will be translated
    href: "/employers",
    icon: Building2,
    children: [
      {
        label: "Browse Companies", // Will be translated
        href: "/companies",
        description: "Discover amazing workplaces", // Will be translated
      },
      {
        label: "Employer Dashboard", // Will be translated
        href: "/employer/dashboard",
        description: "Manage your company profile", // Will be translated
      },
      {
        label: "Add Job", // Will be translated
        href: "/employer/add-job",
        description: "Post new job opportunities", // Will be translated
      },
      {
        label: "Job Packages", // Will be translated
        href: "/employer/packages",
        description: "Choose the right posting plan", // Will be translated
      },
    ],
  },
  {
    id: "candidates",
    label: "Candidates", // Will be translated
    href: "/candidates",
    icon: Users,
    children: [
      {
        label: "Browse Candidates", // Will be translated
        href: "/candidates",
        description: "Search through candidate profiles", // Will be translated
      },
      {
        label: "Candidate Dashboard", // Will be translated
        href: "/candidate/dashboard",
        description: "Manage your professional profile", // Will be translated
      },
    ],
  },
  {
    id: "blog",
    label: "Blog", // Will be translated
    href: "/blog",
    icon: BookOpen,
  },
] as const;

export const COMPANY_INFO = {
  name: "Superio",
  shortName: "S",
  logo: "/logo.svg",
  description: "Find your dream job",
  tagline: "Your career journey starts here",
} as const;

export const SOCIAL_LINKS = [
  { name: "Twitter", href: "https://twitter.com/superio", icon: "Twitter" },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/superio",
    icon: "Linkedin",
  },
  { name: "Facebook", href: "https://facebook.com/superio", icon: "Facebook" },
  {
    name: "Instagram",
    href: "https://instagram.com/superio",
    icon: "Instagram",
  },
] as const;
