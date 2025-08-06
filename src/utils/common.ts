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
 * Format a single salary amount to Vietnamese format
 */
const formatSalaryAmount = (amount: number): string => {
  if (amount >= 1000000000) {
    // Billions - format as "X.X tỷ"
    const billions = amount / 1000000000;
    return `${billions.toFixed(1).replace(".0", "")} tỷ`;
  } else if (amount >= 1000000) {
    // Millions - format as "X triệu" or "XX triệu"
    const millions = amount / 1000000;
    return `${millions.toFixed(0)} triệu`;
  } else if (amount >= 1000) {
    // Thousands - format as "X.XXX"
    return amount.toLocaleString("vi-VN");
  } else {
    return amount.toString();
  }
};

/**
 * Format salary range or single salary with i18n support
 * @param job - Job object with salary information OR salary values
 * @param t - Optional translation function for i18n
 * @param currency - Currency code (default: VND)
 * @param period - Salary period (default: month)
 * @returns Formatted salary string
 */
export const formatSalary = (
  job:
    | {
        salary?: string;
        salary_min?: number | string;
        salary_max?: number | string;
      }
    | {
        min?: number;
        max?: number;
        text?: string; // ✅ Support text field from Job salary object
      },
  t?: TFunction
): string => {
  // Handle different input formats
  let salaryString: string | undefined;
  let minSalary: number | undefined;
  let maxSalary: number | undefined;

  if ("salary" in job) {
    salaryString = job.salary;
    // Convert string to number if needed
    minSalary =
      typeof job.salary_min === "string"
        ? parseFloat(job.salary_min)
        : job.salary_min;
    maxSalary =
      typeof job.salary_max === "string"
        ? parseFloat(job.salary_max)
        : job.salary_max;
  } else {
    const jobWithMinMax = job as { min?: number; max?: number; text?: string };
    minSalary = jobWithMinMax.min;
    maxSalary = jobWithMinMax.max;
    salaryString = jobWithMinMax.text; // ✅ Use text field if available
  }

  // If there's a pre-formatted salary string, use it
  if (salaryString) {
    return salaryString;
  }

  // If there's a salary range (exclude dummy 0 values and NaN)
  if (
    minSalary &&
    maxSalary &&
    !isNaN(minSalary) &&
    !isNaN(maxSalary) &&
    minSalary > 0 &&
    maxSalary > 0
  ) {
    const formattedMin = formatSalaryAmount(minSalary);
    const formattedMax = formatSalaryAmount(maxSalary);

    if (minSalary === maxSalary) {
      return `${formattedMin}`;
    }

    return `${formattedMin} - ${formattedMax}`;
  }

  // If there's only minimum salary (exclude dummy 0 values and NaN)
  if (minSalary && !isNaN(minSalary) && minSalary > 0) {
    const formattedMin = formatSalaryAmount(minSalary);
    return t
      ? t("business.salary.from", { amount: formattedMin })
      : `Từ ${formattedMin}`;
  }

  // If there's only maximum salary (exclude dummy 0 values and NaN)
  if (maxSalary && !isNaN(maxSalary) && maxSalary > 0) {
    const formattedMax = formatSalaryAmount(maxSalary);
    return t
      ? t("business.salary.upTo", { amount: formattedMax })
      : `Lên đến ${formattedMax}`;
  }

  // Default case - negotiable
  return t ? t("business.salary.negotiable") : "Thỏa thuận";
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
