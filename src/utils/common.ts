import { TFunction } from "i18next";

/**
 * Format time ago from a date string using i18n
 * @param dateStr - ISO date string
 * @param t - i18n translation function
 * @returns Formatted time ago string
 */
export const formatTimeAgo = (dateStr: string, t: TFunction): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  
  // Convert to different time units
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  // Return appropriate format based on time difference
  if (diffInMinutes < 1) {
    return t("common.time.justNow");
  } else if (diffInMinutes < 60) {
    return t("common.time.minutesAgo", { count: diffInMinutes });
  } else if (diffInHours < 24) {
    return t("common.time.hoursAgo", { count: diffInHours });
  } else if (diffInDays < 7) {
    return t("common.time.daysAgo", { count: diffInDays });
  } else if (diffInWeeks < 4) {
    return t("common.time.weeksAgo", { count: diffInWeeks });
  } else if (diffInMonths < 12) {
    return t("common.time.monthsAgo", { count: diffInMonths });
  } else {
    return t("common.time.yearsAgo", { count: diffInYears });
  }
};

/**
 * Format salary range or single salary using i18n
 * @param job - Job object with salary information
 * @param t - i18n translation function
 * @returns Formatted salary string
 */
export const formatSalary = (
  job: {
    salary?: string;
    salary_min?: number;
    salary_max?: number;
  },
  t: TFunction
): string => {
  // If there's a pre-formatted salary string, use it
  if (job.salary) {
    return job.salary;
  }

  // If there's a salary range
  if (job.salary_min && job.salary_max) {
    const minInMillions = job.salary_min / 1000000;
    const maxInMillions = job.salary_max / 1000000;
    
    return t("common.salary.range", {
      min: minInMillions,
      max: maxInMillions,
    });
  }

  // If there's only minimum salary
  if (job.salary_min) {
    const minInMillions = job.salary_min / 1000000;
    return t("common.salary.from", { amount: minInMillions });
  }

  // If there's only maximum salary
  if (job.salary_max) {
    const maxInMillions = job.salary_max / 1000000;
    return t("common.salary.upTo", { amount: maxInMillions });
  }

  // Default case - negotiable
  return t("common.salary.negotiable");
};

/**
 * Format job type for display using i18n
 * @param jobType - Job type enum value
 * @param t - i18n translation function
 * @returns Formatted job type string
 */
export const formatJobType = (
  jobType: string | undefined,
  t: TFunction
): string => {
  if (!jobType) return "";

  // Map job type to translation key
  const jobTypeKey = `jobs.jobTypes.${jobType.replace("_", "")}` as const;
  return t(jobTypeKey);
};

/**
 * Format number with locale-specific formatting
 * @param num - Number to format
 * @param locale - Locale string (e.g., 'vi-VN', 'en-US')
 * @returns Formatted number string
 */
export const formatNumber = (num: number, locale: string = "vi-VN"): string => {
  return new Intl.NumberFormat(locale).format(num);
};

/**
 * Format currency with locale-specific formatting
 * @param amount - Amount to format
 * @param currency - Currency code (e.g., 'VND', 'USD')
 * @param locale - Locale string
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = "VND",
  locale: string = "vi-VN"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

/**
 * Capitalize first letter of each word
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export const capitalizeWords = (text: string): string => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Generate initials from a name
 * @param name - Full name
 * @returns Initials (max 2 characters)
 */
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
};
