/**
 * API Hooks - Modern Implementation
 * Re-exports from specific hook files for backward compatibility
 */

// Re-export all hooks from specific files
export * from "./use-jobs";
export * from "./use-companies";
export * from "./use-applications";

// Legacy compatibility exports (deprecated - use specific hooks instead)
import {
  useJobs as useJobsNew,
  useJob as useJobNew,
  useApplyJob as useApplyJobNew,
  useSaveJob as useSaveJobNew,
  useUnsaveJob as useUnsaveJobNew,
} from "./use-jobs";

import {
  useCompanies as useCompaniesNew,
  useCompany as useCompanyNew,
  useFollowCompany as useFollowCompanyNew,
  useUnfollowCompany as useUnfollowCompanyNew,
} from "./use-companies";

import {
  useApplications as useApplicationsNew,
  useApplication as useApplicationNew,
  useCreateApplication as useCreateApplicationNew,
  useUpdateApplication as useUpdateApplicationNew,
  useWithdrawApplication as useWithdrawApplicationNew,
} from "./use-applications";

// Legacy hook aliases for backward compatibility
export const useJobs = useJobsNew;
export const useJob = useJobNew;
export const useApplyJob = useApplyJobNew;
export const useSaveJob = useSaveJobNew;
export const useUnsaveJob = useUnsaveJobNew;

export const useCompanies = useCompaniesNew;
export const useCompany = useCompanyNew;
export const useFollowCompany = useFollowCompanyNew;
export const useUnfollowCompany = useUnfollowCompanyNew;

export const useApplications = useApplicationsNew;
export const useApplication = useApplicationNew;
export const useCreateApplication = useCreateApplicationNew;
export const useUpdateApplication = useUpdateApplicationNew;
export const useWithdrawApplication = useWithdrawApplicationNew;
