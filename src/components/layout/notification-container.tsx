import React, { useEffect } from "react";
import { useAppStore } from "../../stores/app-store";
import { toast } from "@/hooks/use-toast";

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useAppStore();

  useEffect(() => {
    // Display new notifications
    notifications.forEach((notif) => {
      const variant = notif.type === "error" ? "destructive" : "default";

      toast({
        title: notif.title,
        description: notif.message,
        variant,
        duration: 4500,
      });

      // Remove notification from store after showing
      removeNotification(notif.id);
    });
  }, [notifications, removeNotification]);

  return null; // This component doesn't render anything visible
};

export default NotificationContainer;
