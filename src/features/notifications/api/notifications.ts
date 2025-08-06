import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig, QueryConfig } from '@/lib/react-query';
import { 
  Notification, 
  NotificationResponse, 
  MarkAsReadRequest, 
  MarkAllAsReadRequest,
  ApiResponse 
} from '../types';

// Query Keys
export const notificationKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...notificationKeys.lists(), { filters }] as const,
  details: () => [...notificationKeys.all, 'detail'] as const,
  detail: (id: number) => [...notificationKeys.details(), id] as const,
};

// API Functions
export const getNotifications = (
  params?: {
    page?: number;
    limit?: number;
    is_read?: boolean;
  }
): Promise<ApiResponse<NotificationResponse>> => {
  return api.get('/notifications', { params });
};

export const markNotificationAsRead = (
  data: MarkAsReadRequest
): Promise<ApiResponse<Notification>> => {
  return api.patch(`/notifications/${data.notification_id}/read`);
};

export const markAllNotificationsAsRead = (): Promise<ApiResponse<{ updated_count: number }>> => {
  return api.patch('/notifications/mark-all-read');
};

export const deleteNotification = (
  notificationId: number
): Promise<ApiResponse<{ message: string }>> => {
  return api.delete(`/notifications/${notificationId}`);
};

// React Query Hooks
type UseNotificationsOptions = {
  page?: number;
  limit?: number;
  is_read?: boolean;
  queryConfig?: QueryConfig<typeof getNotifications>;
};

export const useNotifications = ({
  page = 1,
  limit = 10,
  is_read,
  queryConfig,
}: UseNotificationsOptions = {}) => {
  return useQuery({
    ...queryConfig,
    queryKey: notificationKeys.list({ page, limit, is_read }),
    queryFn: () => getNotifications({ page, limit, is_read }),
  });
};

type UseMarkAsReadOptions = {
  mutationConfig?: MutationConfig<typeof markNotificationAsRead>;
};

export const useMarkAsRead = ({ mutationConfig }: UseMarkAsReadOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
    ...mutationConfig,
  });
};

type UseMarkAllAsReadOptions = {
  mutationConfig?: MutationConfig<typeof markAllNotificationsAsRead>;
};

export const useMarkAllAsRead = ({ mutationConfig }: UseMarkAllAsReadOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
    ...mutationConfig,
  });
};

type UseDeleteNotificationOptions = {
  mutationConfig?: MutationConfig<typeof deleteNotification>;
};

export const useDeleteNotification = ({ mutationConfig }: UseDeleteNotificationOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
    ...mutationConfig,
  });
};
