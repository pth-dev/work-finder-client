export interface Notification {
  notification_id: number;
  recipient_id: number;
  content: string;
  is_read: boolean;
  notification_type?: string;
  priority: string;
  read_at?: string;
  expires_at?: string;
  related_entity_type?: string;
  related_entity_id?: number;
  created_at: string;
  updated_at: string;
}

export interface NotificationResponse {
  notifications: Notification[];
  total: number;
  unread_count: number;
}

export interface MarkAsReadRequest {
  notification_id: number;
}

export interface MarkAllAsReadRequest {
  user_id: number;
}

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  message: string;
  timestamp: string;
  meta?: {
    pagination?: PaginationMeta;
    [key: string]: any;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
