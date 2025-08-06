import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePrivacySettings, useUpdatePrivacySettings } from "../hooks";
import { PrivacySettings as PrivacySettingsType } from "../types";

// Mock privacy settings
const mockPrivacySettings: PrivacySettingsType = {
  profile_visibility: 'recruiters_only',
  show_contact_info: true,
  allow_messages: true,
};

export function PrivacySettings() {
  const { t } = useTranslation();
  
  // Use mock data for now
  const { data: privacySettings, isLoading } = usePrivacySettings();
  const { mutate: updateSettings, isPending } = useUpdatePrivacySettings();
  
  const settings = privacySettings?.data || mockPrivacySettings;

  const handleVisibilityChange = (value: PrivacySettingsType['profile_visibility']) => {
    const newSettings = { ...settings, profile_visibility: value };
    updateSettings(newSettings);
  };

  const handleSettingChange = (key: keyof Omit<PrivacySettingsType, 'profile_visibility'>, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    updateSettings(newSettings);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            {Array.from({ length: 2 }).map((_, i) => (
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

  const visibilityOptions = [
    {
      value: 'public' as const,
      label: t("settings.privacy.visibility.public", "Public"),
      description: t("settings.privacy.visibility.publicDesc", "Anyone can view your profile"),
    },
    {
      value: 'recruiters_only' as const,
      label: t("settings.privacy.visibility.recruitersOnly", "Recruiters Only"),
      description: t("settings.privacy.visibility.recruitersOnlyDesc", "Only verified recruiters can view your profile"),
    },
    {
      value: 'private' as const,
      label: t("settings.privacy.visibility.private", "Private"),
      description: t("settings.privacy.visibility.privateDesc", "Your profile is hidden from search results"),
    },
  ];

  const selectedVisibility = visibilityOptions.find(option => option.value === settings.profile_visibility);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>{t("settings.privacy.title", "Privacy Settings")}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Profile Visibility */}
        <div className="space-y-3">
          <Label className="text-base font-medium">
            {t("settings.privacy.profileVisibility", "Profile Visibility")}
          </Label>
          
          <Select
            value={settings.profile_visibility}
            onValueChange={handleVisibilityChange}
            disabled={isPending}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {visibilityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs text-gray-500">{option.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedVisibility && (
            <p className="text-sm text-gray-600">
              {selectedVisibility.description}
            </p>
          )}
        </div>

        {/* Contact Information */}
        <div className="flex items-center justify-between">
          <div className="space-y-1 flex-1">
            <Label 
              htmlFor="show_contact_info"
              className="text-base font-medium cursor-pointer"
            >
              {t("settings.privacy.showContactInfo", "Show Contact Information")}
            </Label>
            <p className="text-sm text-gray-600">
              {t("settings.privacy.showContactInfoDesc", "Allow others to see your email and phone number")}
            </p>
          </div>
          
          <Switch
            id="show_contact_info"
            checked={settings.show_contact_info}
            onCheckedChange={(checked) => handleSettingChange('show_contact_info', checked)}
            disabled={isPending}
          />
        </div>

        {/* Allow Messages */}
        <div className="flex items-center justify-between">
          <div className="space-y-1 flex-1">
            <Label 
              htmlFor="allow_messages"
              className="text-base font-medium cursor-pointer"
            >
              {t("settings.privacy.allowMessages", "Allow Messages")}
            </Label>
            <p className="text-sm text-gray-600">
              {t("settings.privacy.allowMessagesDesc", "Allow recruiters and employers to send you messages")}
            </p>
          </div>
          
          <Switch
            id="allow_messages"
            checked={settings.allow_messages}
            onCheckedChange={(checked) => handleSettingChange('allow_messages', checked)}
            disabled={isPending}
          />
        </div>

        {/* Privacy Notice */}
        <div className="pt-4 border-t">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">
              {t("settings.privacy.dataUsage", "Data Usage")}
            </h4>
            <p className="text-sm text-yellow-700">
              {t("settings.privacy.dataUsageDesc", "We use your information to match you with relevant job opportunities and improve our services. Your data is never sold to third parties.")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
