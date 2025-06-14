import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useAppStore } from '../../stores/app-store';

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useAppStore();

  useEffect(() => {
    // Display new notifications
    notifications.forEach((notif) => {
      const key = notif.id;
      
      notification[notif.type]({
        key,
        message: notif.title,
        description: notif.message,
        placement: 'topRight',
        duration: 4.5,
        onClose: () => removeNotification(notif.id),
      });
    });
  }, [notifications, removeNotification]);

  return null; // This component doesn't render anything visible
};

export default NotificationContainer;
