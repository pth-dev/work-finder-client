import React from "react";
import { Outlet } from "react-router-dom";
import { useAppStore } from "stores/app-store";
import AppSidebar from "./app-sidebar";
import AppHeader from "./app-header";
import NotificationContainer from "./notification-container";
import { cn } from "@/lib/utils";

const AppLayout: React.FC = () => {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div
        className={cn(
          "transition-all duration-200 ease-in-out",
          sidebarCollapsed ? "ml-20" : "ml-50"
        )}
      >
        <AppHeader />
        <main className="m-6 p-6 bg-card rounded-lg shadow-sm min-h-[280px]">
          <Outlet />
        </main>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default AppLayout;
