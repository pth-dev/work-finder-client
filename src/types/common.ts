/**
 * Common types used across the application
 */

/**
 * Generic option interface for dropdowns, selects, and other choice components
 * @template T - The type of the value (defaults to string)
 */
export interface IOption<T = string> {
  /** The unique value of the option */
  value: T;
  /** The display label for the option */
  label: string;
  /** Optional description for additional context */
  description?: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Optional icon or element to display with the option */
  icon?: React.ReactNode;
  /** Optional additional data */
  data?: Record<string, any>;
}

/**
 * Generic filter option interface extending IOption
 * Used for filter components with additional metadata
 */
export interface IFilterOption<T = string> extends IOption<T> {
  /** Number of items matching this filter option */
  count?: number;
  /** Whether this option is currently selected */
  selected?: boolean;
  /** Category or group this option belongs to */
  category?: string;
}

/**
 * Time period options for date filtering
 */
export type TimePeriod = "all" | "day" | "week" | "month" | "year";

/**
 * Sort direction options
 */
export type SortDirection = "asc" | "desc";

/**
 * Generic sort option interface
 */
export interface ISortOption {
  /** The field to sort by */
  field: string;
  /** The display label */
  label: string;
  /** The sort direction */
  direction: SortDirection;
  /** Whether this is the default sort option */
  default?: boolean;
}

/**
 * Pagination information
 */
export interface IPagination {
  /** Current page number (1-based) */
  page: number;
  /** Number of items per page */
  limit: number;
  /** Total number of items */
  total: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether there is a next page */
  hasNext: boolean;
  /** Whether there is a previous page */
  hasPrevious: boolean;
}

/**
 * API Response wrapper
 */
export interface IApiResponse<T = any> {
  /** Whether the request was successful */
  success: boolean;
  /** HTTP status code */
  status: number;
  /** Response data */
  data: T;
  /** Response message */
  message: string;
  /** Timestamp of the response */
  timestamp: string;
  /** Error details if any */
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

/**
 * Loading state interface
 */
export interface ILoadingState {
  /** Whether data is currently loading */
  isLoading: boolean;
  /** Whether this is the initial load */
  isInitialLoading?: boolean;
  /** Whether more data is being loaded (pagination) */
  isLoadingMore?: boolean;
  /** Whether data is being refreshed */
  isRefreshing?: boolean;
}

/**
 * Error state interface
 */
export interface IErrorState {
  /** Whether there is an error */
  hasError: boolean;
  /** Error message */
  message?: string;
  /** Error code */
  code?: string;
  /** Additional error details */
  details?: any;
  /** Timestamp when error occurred */
  timestamp?: string;
}

/**
 * Generic form field interface
 */
export interface IFormField<T = any> {
  /** Field name/key */
  name: string;
  /** Field label */
  label: string;
  /** Field type */
  type: "text" | "email" | "password" | "number" | "select" | "checkbox" | "radio" | "textarea" | "date";
  /** Field value */
  value: T;
  /** Whether field is required */
  required?: boolean;
  /** Whether field is disabled */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Help text */
  helpText?: string;
  /** Validation error message */
  error?: string;
  /** Options for select/radio fields */
  options?: IOption<T>[];
}

/**
 * Generic table column interface
 */
export interface ITableColumn<T = any> {
  /** Column key */
  key: string;
  /** Column header label */
  label: string;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Column width */
  width?: string | number;
  /** Whether column is hidden */
  hidden?: boolean;
  /** Custom render function */
  render?: (value: any, row: T) => React.ReactNode;
  /** Column alignment */
  align?: "left" | "center" | "right";
}

/**
 * Generic search/filter state
 */
export interface ISearchState {
  /** Search query */
  query: string;
  /** Applied filters */
  filters: Record<string, any>;
  /** Sort configuration */
  sort: {
    field: string;
    direction: SortDirection;
  };
  /** Pagination state */
  pagination: IPagination;
}
