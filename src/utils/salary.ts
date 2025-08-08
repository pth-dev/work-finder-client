/**
 * Format number as Vietnamese currency (VND)
 */
export const formatVND = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN").format(amount);
};

/**
 * Parse formatted VND string back to number
 */
export const parseVND = (value: string): number => {
  return parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
};

/**
 * Convert amount to millions for display
 */
export const formatMillions = (amount: number): string => {
  if (amount >= 1000000) {
    const millions = amount / 1000000;
    return millions % 1 === 0 ? `${millions}` : millions.toFixed(1);
  }
  return (amount / 1000000).toFixed(1);
};

/**
 * Generate salary description based on min/max values
 */
export const generateSalaryDescription = (
  salaryMin?: number,
  salaryMax?: number,
  salaryText?: string
): string => {
  // If custom salary text is provided, use it
  if (salaryText && salaryText.trim()) {
    return salaryText;
  }

  // If both min and max are provided
  if (salaryMin && salaryMax && salaryMin > 0 && salaryMax > 0) {
    const minMillions = formatMillions(salaryMin);
    const maxMillions = formatMillions(salaryMax);
    return `${minMillions}-${maxMillions} triệu VND`;
  }

  // If only min is provided
  if (salaryMin && salaryMin > 0) {
    const minMillions = formatMillions(salaryMin);
    return `Từ ${minMillions} triệu VND`;
  }

  // If only max is provided
  if (salaryMax && salaryMax > 0) {
    const maxMillions = formatMillions(salaryMax);
    return `Lên đến ${maxMillions} triệu VND`;
  }

  // Default case
  return "Thỏa thuận";
};

/**
 * Validate salary range
 */
export const validateSalaryRange = (
  min?: number,
  max?: number
): string | null => {
  if (min && max && min > max) {
    return "Lương tối thiểu không thể lớn hơn lương tối đa";
  }
  return null;
};
