import type { BaseSearchParams, JobSearchParams } from './search-types';

/**
 * Build URL search params from search parameters
 */
export const buildSearchQuery = (params: BaseSearchParams): URLSearchParams => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== null) {
      if (Array.isArray(value)) {
        // Handle array values (like salaryRange)
        searchParams.set(key, value.join(','));
      } else {
        searchParams.set(key, String(value));
      }
    }
  });
  
  return searchParams;
};

/**
 * Parse URL search params to job search parameters
 */
export const parseSearchParams = (searchParams: URLSearchParams): JobSearchParams => {
  const params: JobSearchParams = {};

  // Basic search params
  const query = searchParams.get('q');
  if (query) params.query = query;

  const location = searchParams.get('location');
  if (location) params.location = location;

  const category = searchParams.get('category');
  if (category) params.category = category;

  const page = searchParams.get('page');
  if (page) params.page = Number(page);

  const limit = searchParams.get('limit');
  if (limit) params.limit = Number(limit);

  // Job-specific params
  const jobType = searchParams.get('jobType') as JobSearchParams['jobType'];
  if (jobType) params.jobType = jobType;

  const experience = searchParams.get('experience') as JobSearchParams['experience'];
  if (experience) params.experience = experience;

  const remote = searchParams.get('remote');
  if (remote) params.remote = remote === 'true';

  const datePosted = searchParams.get('datePosted') as JobSearchParams['datePosted'];
  if (datePosted) params.datePosted = datePosted;

  const companySize = searchParams.get('companySize') as JobSearchParams['companySize'];
  if (companySize) params.companySize = companySize;

  // Salary range
  const salaryRange = searchParams.get('salaryRange');
  if (salaryRange) {
    const [min, max] = salaryRange.split(',').map(Number);
    if (!isNaN(min) && !isNaN(max)) {
      params.salaryRange = [min, max];
    }
  }

  // Sort params
  const sortBy = searchParams.get('sortBy') as JobSearchParams['sortBy'];
  if (sortBy) params.sortBy = sortBy;

  const sortOrder = searchParams.get('sortOrder') as JobSearchParams['sortOrder'];
  if (sortOrder) params.sortOrder = sortOrder;

  return params;
};

/**
 * Highlight search terms in text
 */
export const highlightSearchTerms = (text: string, query: string): string => {
  if (!query || !text) return text;
  
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
};

/**
 * Escape special regex characters
 */
const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Debounce function for search input
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Format salary range for display
 */
export const formatSalaryRange = (
  min?: number,
  max?: number,
  currency = 'USD',
  period: 'hour' | 'month' | 'year' = 'year'
): string => {
  if (!min && !max) return 'Salary not specified';
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const periodSuffix = period === 'hour' ? '/hr' : period === 'month' ? '/mo' : '/yr';

  if (min && max) {
    return `${formatter.format(min)} - ${formatter.format(max)}${periodSuffix}`;
  } else if (min) {
    return `From ${formatter.format(min)}${periodSuffix}`;
  } else if (max) {
    return `Up to ${formatter.format(max)}${periodSuffix}`;
  }

  return 'Salary not specified';
};

/**
 * Format job type for display
 */
export const formatJobType = (jobType: JobSearchParams['jobType']): string => {
  const jobTypeMap = {
    'full-time': 'Full Time',
    'part-time': 'Part Time',
    'contract': 'Contract',
    'internship': 'Internship',
  };

  return jobType ? jobTypeMap[jobType] || jobType : 'Any';
};

/**
 * Format experience level for display
 */
export const formatExperienceLevel = (experience: JobSearchParams['experience']): string => {
  const experienceMap = {
    'entry': 'Entry Level',
    'mid': 'Mid Level',
    'senior': 'Senior Level',
    'executive': 'Executive',
  };

  return experience ? experienceMap[experience] || experience : 'Any';
};

/**
 * Generate search summary text
 */
export const generateSearchSummary = (params: JobSearchParams, totalResults: number): string => {
  const parts: string[] = [];

  if (totalResults === 0) {
    return 'No jobs found';
  }

  parts.push(`${totalResults.toLocaleString()} job${totalResults === 1 ? '' : 's'}`);

  if (params.query) {
    parts.push(`for "${params.query}"`);
  }

  if (params.location) {
    parts.push(`in ${params.location}`);
  }

  if (params.category) {
    parts.push(`in ${params.category}`);
  }

  return parts.join(' ');
};

/**
 * Clean search parameters (remove empty values)
 */
export const cleanSearchParams = (params: JobSearchParams): JobSearchParams => {
  const cleaned: JobSearchParams = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== null) {
      if (Array.isArray(value) && value.length > 0) {
        (cleaned as any)[key] = value;
      } else if (!Array.isArray(value)) {
        (cleaned as any)[key] = value;
      }
    }
  });

  return cleaned;
};
