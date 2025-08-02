import { Job } from '@/types/job';
import { Company } from '@/types';

/**
 * Generate SEO-friendly slug for job detail URLs
 * Format: "job-title-company-name-jobId"
 * Example: "product-designer-invision-123"
 */
export function generateJobSlug(job: Job): string {
  const title = job.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .substring(0, 40);            // Limit length

  const company = job.companyName
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, '')
    ?.replace(/\s+/g, '-')
    ?.substring(0, 20) || 'company';

  return `${title}-${company}-${job.id}`;
}

/**
 * Generate SEO-friendly slug for company detail URLs
 * Format: "company-name-companyId"
 * Example: "invision-inc-456"
 */
export function generateCompanySlug(company: Company): string {
  const name = company.company_name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);

  return `${name}-${company.company_id}`;
}

/**
 * Extract ID from slug format
 * Works with both numeric IDs and slugged URLs
 */
export function extractIdFromSlug(identifier: string): number {
  // Try parse as numeric ID first
  const numericId = parseInt(identifier);
  if (!isNaN(numericId)) {
    return numericId;
  }

  // Extract ID from slug format: "title-company-123"
  const slugMatch = identifier.match(/-(\d+)$/);
  if (slugMatch) {
    return parseInt(slugMatch[1]);
  }

  throw new Error(`Invalid identifier format: ${identifier}`);
}

/**
 * Check if identifier is a slug or numeric ID
 */
export function isSlugFormat(identifier: string): boolean {
  return !/^\d+$/.test(identifier);
}