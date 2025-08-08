import React from "react";
import { PublicRoute } from "@/lib/auth";
import AppLayout from "@/components/layouts/app-layout";

const PublicLayoutWrapper: React.FC = () => {
  return (
    <PublicRoute excludeRoles={["recruiter"]}>
      <AppLayout />
    </PublicRoute>
  );
};

export default PublicLayoutWrapper;
