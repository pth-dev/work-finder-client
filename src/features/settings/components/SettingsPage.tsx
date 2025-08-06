import { useTranslation } from "react-i18next";
import { Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "./ProfileSettings";
import { PasswordSettings } from "./PasswordSettings";
import { NotificationSettings } from "./NotificationSettings";
import { PrivacySettings } from "./PrivacySettings";
import { AccountDeletion } from "./AccountDeletion";

export function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <Settings className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("settings.title", "Account Settings")}
          </h1>
          <p className="text-gray-600">
            {t(
              "settings.subtitle",
              "Manage your account preferences and privacy settings"
            )}
          </p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <div className="w-full overflow-x-auto">
          <TabsList className="inline-flex h-12 items-center justify-start rounded-xl bg-white border border-gray-200 p-1 shadow-sm min-w-full sm:min-w-0 sm:w-auto">
            <TabsTrigger
              value="profile"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 data-[state=active]:hover:bg-blue-700 text-gray-600 min-w-0 flex-shrink-0"
            >
              {t("settings.tabs.profile", "Hồ sơ")}
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 data-[state=active]:hover:bg-blue-700 text-gray-600 min-w-0 flex-shrink-0"
            >
              {t("settings.tabs.password", "Mật khẩu")}
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 data-[state=active]:hover:bg-blue-700 text-gray-600 min-w-0 flex-shrink-0"
            >
              {t("settings.tabs.notifications", "Thông báo")}
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 data-[state=active]:hover:bg-blue-700 text-gray-600 min-w-0 flex-shrink-0"
            >
              {t("settings.tabs.privacy", "Quyền riêng tư")}
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-red-50 data-[state=active]:hover:bg-red-700 text-red-600 min-w-0 flex-shrink-0"
            >
              {t("settings.tabs.account", "Tài khoản")}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="password">
          <PasswordSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacySettings />
        </TabsContent>

        <TabsContent value="account">
          <AccountDeletion />
        </TabsContent>
      </Tabs>
    </div>
  );
}
