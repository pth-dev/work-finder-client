import { ScrollToTop } from "@/components";
import { useAuthStore } from "@/stores/auth-store";
import { LanguageSwitcher } from "./header/language-switcher";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { UserMenu } from "./header/user-menu";
import { Sidebar } from "./sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="h-screen flex bg-gray-50">
      <ScrollToTop />

      {/* Sidebar - Extracted to modular component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Notifications - Only show when authenticated */}
            {isAuthenticated && <NotificationBell />}

            {/* User Menu */}
            {isAuthenticated && <UserMenu />}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container-xl mx-auto p-6 h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
