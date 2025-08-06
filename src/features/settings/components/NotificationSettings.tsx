import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNotificationSettings, useUpdateNotificationSettings } from "../hooks";

// Mock notification settings
const mockNotificationSettings = {
  email_notifications: true,
  job_alerts: true,
  application_updates: true,
  marketing_emails: false,
};

export function NotificationSettings() {
  const { t } = useTranslation();
  
  // Use mock data for now
  const { data: notificationSettings, isLoading } = useNotificationSettings();
  const { mutate: updateSettings, isPending } = useUpdateNotificationSettings();
  
  const settings = notificationSettings?.data || mockNotificationSettings;

  const handleSettingChange = (key: keyof typeof settings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    updateSettings(newSettings);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-48"></div>
                </div>
                <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const notificationOptions = [
    {
      key: 'email_notifications' as const,
      title: t("settings.notifications.emailNotifications", "Email Notifications"),
      description: t("settings.notifications.emailNotificationsDesc", "Receive general notifications via email"),
    },
    {
      key: 'job_alerts' as const,
      title: t("settings.notifications.jobAlerts", "Job Alerts"),
      description: t("settings.notifications.jobAlertsDesc", "Get notified about new job opportunities that match your profile"),
    },
    {
      key: 'application_updates' as const,
      title: t("settings.notifications.applicationUpdates", "Application Updates"),
      description: t("settings.notifications.applicationUpdatesDesc", "Receive updates about your job applications"),
    },
    {
      key: 'marketing_emails' as const,
      title: t("settings.notifications.marketingEmails", "Marketing Emails"),
      description: t("settings.notifications.marketingEmailsDesc", "Receive promotional emails and newsletters"),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>{t("settings.notifications.title", "Notification Preferences")}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {notificationOptions.map((option) => (
          <div key={option.key} className="flex items-center justify-between">
            <div className="space-y-1 flex-1">
              <Label 
                htmlFor={option.key}
                className="text-base font-medium cursor-pointer"
              >
                {option.title}
              </Label>
              <p className="text-sm text-gray-600">
                {option.description}
              </p>
            </div>
            
            <Switch
              id={option.key}
              checked={settings[option.key]}
              onCheckedChange={(checked) => handleSettingChange(option.key, checked)}
              disabled={isPending}
            />
          </div>
        ))}

        {/* Additional Info */}
        <div className="pt-4 border-t">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              {t("settings.notifications.importantNote", "Important Note")}
            </h4>
            <p className="text-sm text-blue-700">
              {t("settings.notifications.importantNoteDesc", "You will always receive critical notifications about your account security and important application updates, regardless of these settings.")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
