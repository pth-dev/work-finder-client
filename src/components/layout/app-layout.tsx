import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useAuth } from "hooks/use-auth";
import { useAppStore } from "stores/app-store";
import AppSidebar from "./app-sidebar";
import AppHeader from "./app-header";
import NotificationContainer from "./notification-container";

const { Content } = Layout;

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { sidebarCollapsed } = useAppStore();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppSidebar />
      <Layout
        style={{
          marginLeft: sidebarCollapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <AppHeader />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            borderRadius: 8,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <NotificationContainer />
    </Layout>
  );
};

export default AppLayout;
