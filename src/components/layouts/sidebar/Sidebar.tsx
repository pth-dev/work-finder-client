import { useAuthStore } from "@/stores/auth-store";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarContent } from "./SidebarContent";

import { cn } from "@/utils";

type UserRole = "job_seeker" | "recruiter" | "admin";

export interface SidebarProps {
  className?: string;
  children?: React.ReactNode;
}

export function Sidebar({ className, children }: SidebarProps) {
  const { user } = useAuthStore();

  // Safe type casting with default fallback
  const userRole: UserRole = (user?.role as UserRole) || "job_seeker";

  return (
    <aside
      className={cn(
        "w-64 bg-white border-r border-gray-200 flex flex-col",
        className
      )}
    >
      <SidebarHeader />
      <SidebarContent userRole={userRole} />
      {children}
    </aside>
  );
}
