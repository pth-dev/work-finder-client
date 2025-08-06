import { TFunction } from "i18next";

/**
 * Business logic i18n helpers for formatting data with proper localization
 */

// Employee count formatting
export const formatEmployeeCount = (t: TFunction, count: number): string => {
  if (count === 0) {
    return t("business.employeeCount.none");
  }
  if (count === 1) {
    return t("business.employeeCount.single");
  }
  if (count < 50) {
    return t("business.employeeCount.small", { count });
  }
  if (count < 200) {
    return t("business.employeeCount.medium", { count });
  }
  if (count < 1000) {
    return t("business.employeeCount.large", { count });
  }
  return t("business.employeeCount.enterprise", { count });
};

// Company size formatting based on employee ranges
export const formatCompanySize = (t: TFunction, size: string): string => {
  const sizeMap: Record<string, string> = {
    startup: "business.companySize.startup",
    small: "business.companySize.small",
    medium: "business.companySize.medium",
    large: "business.companySize.large",
    enterprise: "business.companySize.enterprise",
  };

  return t(sizeMap[size] || "business.companySize.unknown");
};

// Date formatting with localization
export const formatDate = (
  t: TFunction,
  date: string | Date,
  format: "short" | "long" | "relative" = "short"
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return t("business.date.invalid");
  }

  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (format === "relative") {
    if (diffInDays === 0) {
      return t("business.date.today");
    }
    if (diffInDays === 1) {
      return t("business.date.yesterday");
    }
    if (diffInDays < 7) {
      return t("business.date.daysAgo", { days: diffInDays });
    }
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return t("business.date.weeksAgo", { weeks });
    }
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return t("business.date.monthsAgo", { months });
    }
    const years = Math.floor(diffInDays / 365);
    return t("business.date.yearsAgo", { years });
  }

  if (format === "long") {
    return dateObj.toLocaleDateString(t("business.locale"), {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Default short format
  return dateObj.toLocaleDateString(t("business.locale"), {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// Note: formatSalary has been moved to utils/common.ts for better reusability

// Job type formatting
export const formatJobType = (t: TFunction, jobType: string): string => {
  const jobTypeMap: Record<string, string> = {
    full_time: "business.jobType.fullTime",
    part_time: "business.jobType.partTime",
    contract: "business.jobType.contract",
    freelance: "business.jobType.freelance",
    internship: "business.jobType.internship",
    remote: "business.jobType.remote",
    hybrid: "business.jobType.hybrid",
    onsite: "business.jobType.onsite",
  };

  return t(jobTypeMap[jobType] || "business.jobType.unknown");
};

// Experience level formatting
export const formatExperienceLevel = (t: TFunction, level: string): string => {
  const levelMap: Record<string, string> = {
    entry: "business.experience.entry",
    junior: "business.experience.junior",
    mid: "business.experience.mid",
    senior: "business.experience.senior",
    lead: "business.experience.lead",
    manager: "business.experience.manager",
    director: "business.experience.director",
    executive: "business.experience.executive",
  };

  return t(levelMap[level] || "business.experience.unknown");
};

// Application status formatting
export const formatApplicationStatus = (
  t: TFunction,
  status: string
): string => {
  const statusMap: Record<string, string> = {
    pending: "business.applicationStatus.pending",
    reviewing: "business.applicationStatus.reviewing",
    shortlisted: "business.applicationStatus.shortlisted",
    interview: "business.applicationStatus.interview",
    offered: "business.applicationStatus.offered",
    accepted: "business.applicationStatus.accepted",
    rejected: "business.applicationStatus.rejected",
    withdrawn: "business.applicationStatus.withdrawn",
  };

  return t(statusMap[status] || "business.applicationStatus.unknown");
};

// File size formatting
export const formatFileSize = (t: TFunction, bytes: number): string => {
  if (bytes === 0) {
    return t("business.fileSize.zero");
  }

  const k = 1024;
  const sizes = ["bytes", "kb", "mb", "gb"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(1));

  return t(`business.fileSize.${sizes[i]}`, { size });
};

// Pluralization helper
export const formatPlural = (
  t: TFunction,
  count: number,
  singularKey: string,
  pluralKey: string,
  options?: Record<string, any>
): string => {
  const key = count === 1 ? singularKey : pluralKey;
  return t(key, { count, ...options });
};
