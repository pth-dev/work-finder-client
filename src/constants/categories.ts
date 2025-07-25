import type { JobCategory } from "@/types/category";

// Categories from Figma design - exact match (9 categories in 3x3 grid)
export const FEATURED_CATEGORIES: JobCategory[] = [
  {
    id: "accounting-finance",
    title: "Accounting / Finance",
    jobCount: "2 open positions",
    iconName: "Calculator",
    href: "/categories/accounting-finance",
  },
  {
    id: "marketing-sale",
    title: "Marketing & Sale",
    jobCount: "86 open positions",
    iconName: "TrendingUp",
    href: "/categories/marketing-sale",
  },
  {
    id: "design-multimedia",
    title: "Design & Multimedia",
    jobCount: "43 open positions",
    iconName: "Palette",
    href: "/categories/design-multimedia",
  },
  {
    id: "development",
    title: "Development",
    jobCount: "12 open positions",
    iconName: "Code",
    href: "/categories/development",
  },
  {
    id: "human-resource",
    title: "Human Resource",
    jobCount: "55 open positions",
    iconName: "Users",
    href: "/categories/human-resource",
  },
  {
    id: "finance",
    title: "Finance",
    jobCount: "23 open positions",
    iconName: "Banknote",
    href: "/categories/finance",
  },
  {
    id: "customer-service",
    title: "Customer Service",
    jobCount: "72 open positions",
    iconName: "Headphones",
    href: "/categories/customer-service",
  },
  {
    id: "health-care",
    title: "Health and Care",
    jobCount: "25 open positions",
    iconName: "Heart",
    href: "/categories/health-care",
  },
  {
    id: "automotive-jobs",
    title: "Automotive Jobs",
    jobCount: "92 open positions",
    iconName: "Car",
    href: "/categories/automotive-jobs",
  },
];

// Category statistics - from Figma design
export const CATEGORY_STATS = {
  totalJobs: FEATURED_CATEGORIES.reduce((sum, category) => {
    const count = parseInt(category.jobCount.split(" ")[0]) || 0;
    return sum + count;
  }, 0),
  totalCategories: FEATURED_CATEGORIES.length,
  newJobsToday: 293, // From Figma design
  liveJobs: 2020, // From Figma design
};
