import { api } from '@/lib/api-client';
import type {
  JobSearchParams,
  CompanySearchParams,
  SearchResult,
  Job,
  Company,
  SearchSuggestion,
  SearchFacets,
} from './search-types';

/**
 * Centralized search API client
 * Handles all search-related API calls across the application
 */
export class SearchClient {
  /**
   * Search for jobs with given parameters
   */
  async searchJobs(params: JobSearchParams): Promise<SearchResult<Job>> {
    try {
      const response = await api.get('/jobs/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw new Error('Failed to search jobs');
    }
  }

  /**
   * Search for companies with given parameters
   */
  async searchCompanies(params: CompanySearchParams): Promise<SearchResult<Company>> {
    try {
      const response = await api.get('/companies/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching companies:', error);
      throw new Error('Failed to search companies');
    }
  }

  /**
   * Get search suggestions based on query
   */
  async getSearchSuggestions(query: string): Promise<SearchSuggestion[]> {
    if (!query || query.length < 2) {
      return [];
    }

    try {
      const response = await api.get('/search/suggestions', {
        params: { q: query, limit: 10 }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting search suggestions:', error);
      // Return empty array on error to not break UX
      return [];
    }
  }

  /**
   * Get popular/trending searches
   */
  async getTrendingSearches(): Promise<SearchSuggestion[]> {
    try {
      const response = await api.get('/search/trending');
      return response.data;
    } catch (error) {
      console.error('Error getting trending searches:', error);
      return [];
    }
  }

  /**
   * Get search facets for filtering
   */
  async getSearchFacets(params?: Partial<JobSearchParams>): Promise<SearchFacets> {
    try {
      const response = await api.get('/search/facets', { params });
      return response.data;
    } catch (error) {
      console.error('Error getting search facets:', error);
      // Return empty facets on error
      return {
        locations: [],
        categories: [],
        jobTypes: [],
        experienceLevels: [],
        salaryRanges: [],
        companies: [],
      };
    }
  }

  /**
   * Get job by ID (for search result details)
   */
  async getJobById(id: string): Promise<Job> {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting job by ID:', error);
      throw new Error('Failed to get job details');
    }
  }

  /**
   * Get company by ID (for search result details)
   */
  async getCompanyById(id: string): Promise<Company> {
    try {
      const response = await api.get(`/companies/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting company by ID:', error);
      throw new Error('Failed to get company details');
    }
  }

  /**
   * Save search query to user's search history
   */
  async saveSearchHistory(query: string, filters: JobSearchParams): Promise<void> {
    try {
      await api.post('/search/history', { query, filters });
    } catch (error) {
      console.error('Error saving search history:', error);
      // Don't throw error for history saving
    }
  }

  /**
   * Get user's search history
   */
  async getSearchHistory(): Promise<string[]> {
    try {
      const response = await api.get('/search/history');
      return response.data;
    } catch (error) {
      console.error('Error getting search history:', error);
      return [];
    }
  }
}

// Export singleton instance
export const searchClient = new SearchClient();
