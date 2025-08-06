import { useState, useEffect, useRef } from "react";
import { Bell, X, Check, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { enUS, vi } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/utils";
import {
  useNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification,
} from "../api/notifications";
import { Notification } from "../types";

interface NotificationBellProps {
  className?: string;
}

export const NotificationBell = ({ className }: NotificationBellProps) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // API hooks
  const { data: notificationsData, isLoading } = useNotifications({
    limit: 20,
    queryConfig: {
      refetchInterval: 30000, // Refetch every 30 seconds
    },
  });

  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();
  const deleteNotificationMutation = useDeleteNotification();

  const notifications = notificationsData?.data?.notifications || [];
  const unreadCount = notificationsData?.data?.unread_count || 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = (notificationId: number) => {
    markAsReadMutation.mutate({ notification_id: notificationId });
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const handleDeleteNotification = (notificationId: number) => {
    deleteNotificationMutation.mutate(notificationId);
  };

  const formatNotificationTime = (createdAt: string) => {
    const locale = i18n.language === "vi" ? vi : enUS;
    return formatDistanceToNow(new Date(createdAt), {
      addSuffix: true,
      locale,
    });
  };

  const renderNotificationItem = (notification: Notification) => (
    <div
      key={notification.notification_id}
      className={cn(
        "p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0",
        !notification.is_read && "bg-blue-50/50"
      )}
    >
      <div className="flex items-start justify-between space-x-2">
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-sm text-gray-900 line-clamp-2",
              !notification.is_read && "font-medium"
            )}
          >
            {notification.content}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {formatNotificationTime(notification.created_at)}
          </p>
        </div>

        <div className="flex items-center space-x-1">
          {!notification.is_read && (
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
          )}

          <div className="flex space-x-1">
            {!notification.is_read && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-gray-200"
                onClick={() => handleMarkAsRead(notification.notification_id)}
                title={t("header.notifications.markAsRead")}
              >
                <Check className="h-3 w-3" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
              onClick={() =>
                handleDeleteNotification(notification.notification_id)
              }
              title={t("header.notifications.delete")}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Bell Button */}
      <Button
        variant="ghost"
        size="sm"
        className="relative p-2 hover:bg-gray-100 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("header.notifications.title")}
      >
        <Bell className="h-5 w-5 text-gray-600" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 99
              ? t("header.notifications.unreadCount", { count: 99 })
              : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 md:w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-[9999] animate-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">
              {t("header.notifications.title")}
            </h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-blue-600 hover:text-blue-700 p-1 h-auto"
                  onClick={handleMarkAllAsRead}
                  disabled={markAllAsReadMutation.isPending}
                >
                  {t("header.notifications.markAllRead")}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-auto"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="max-h-96">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Spinner size="md" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">
                  {t("header.notifications.noNotifications")}
                </p>
              </div>
            ) : (
              <ScrollArea className="max-h-96">
                {notifications.map(renderNotificationItem)}
              </ScrollArea>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <>
              <Separator />
              <div className="p-3">
                <Button
                  variant="ghost"
                  className="w-full text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => {
                    setIsOpen(false);
                    // Navigate to notifications page if exists
                  }}
                >
                  {t("header.notifications.viewAll")}
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
