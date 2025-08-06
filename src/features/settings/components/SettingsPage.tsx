import { useTranslation } from "react-i18next";
import { Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { PageHeader } from "@/components/common";
import { NotificationSettings } from "./NotificationSettings";
import { PrivacySettings } from "./PrivacySettings";
import { AccountSettings } from "./AccountSettings";
import { SettingsTabTrigger } from "./SettingsTabTrigger";

export function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <PageHeader
        icon={Settings}
        title={t("settings.title", "Account Settings")}
        subtitle={t(
          "settings.subtitle",
          "Manage your account preferences and privacy settings"
        )}
      />

      {/* Settings Tabs */}
      <Tabs defaultValue="account" className="space-y-6">
        <div className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 h-auto min-h-[48px] rounded-xl bg-white border border-gray-200 p-0.5 shadow-sm gap-0.5">
            <SettingsTabTrigger value="account">
              {t("settings.tabs.account", "Profile & Security")}
            </SettingsTabTrigger>

            <SettingsTabTrigger value="notifications">
              {t("settings.tabs.notifications", "Thông báo")}
            </SettingsTabTrigger>

            <SettingsTabTrigger value="privacy">
              {t("settings.tabs.privacy", "Quyền riêng tư")}
            </SettingsTabTrigger>
          </TabsList>
        </div>

        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
