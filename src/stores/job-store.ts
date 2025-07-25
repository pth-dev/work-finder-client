import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { JobFilters } from "@/types/job";

interface JobStore {
  // State
  filters: JobFilters;
  savedJobs: string[]; // Job IDs
  recentSearches: string[];

  // Actions
  updateFilters: (filters: Partial<JobFilters>) => void;
  clearFilters: () => void;
  toggleSaveJob: (jobId: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Computed functions
  hasActiveFilters: () => boolean;
}

const initialFilters: JobFilters = {
  search: "",
  location: "",
  workType: [],
  employmentType: [],
  experienceLevel: [],
  skills: [],
  companySize: [],
  industry: [],
  postedWithin: "all",
};

export const useJobStore = create<JobStore>()(
  devtools(
    immer((set, get) => ({
      // Initial state
      filters: initialFilters,
      savedJobs: [],
      recentSearches: [],

      // Actions
      updateFilters: (newFilters: Partial<JobFilters>) =>
        set((state) => {
          state.filters = { ...state.filters, ...newFilters };
        }),

      clearFilters: () =>
        set((state) => {
          state.filters = initialFilters;
        }),

      toggleSaveJob: (jobId: string) =>
        set((state) => {
          const index = state.savedJobs.indexOf(jobId);
          if (index > -1) {
            state.savedJobs.splice(index, 1);
          } else {
            state.savedJobs.push(jobId);
          }
        }),

      addRecentSearch: (query: string) =>
        set((state) => {
          // Remove if already exists
          const filtered = state.recentSearches.filter(
            (s: string) => s !== query
          );
          // Add to beginning, keep only last 5
          state.recentSearches = [query, ...filtered].slice(0, 5);
        }),

      clearRecentSearches: () =>
        set((state) => {
          state.recentSearches = [];
        }),

      // Computed functions
      hasActiveFilters: () => {
        const state = get();
        if (!state?.filters) return false;

        const filters = state.filters;
        return !!(
          filters.search ||
          filters.location ||
          filters.workType?.length ||
          filters.employmentType?.length ||
          filters.experienceLevel?.length ||
          filters.skills?.length ||
          filters.companySize?.length ||
          filters.industry?.length ||
          (filters.postedWithin && filters.postedWithin !== "all") ||
          filters.salaryRange
        );
      },
    })),
    {
      name: "job-store",
    }
  )
);
