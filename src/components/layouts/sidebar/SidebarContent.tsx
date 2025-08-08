import { NavMain } from "./NavMain";
import { NavSecondary } from "./NavSecondary";

type UserRole = "job_seeker" | "recruiter" | "admin";

export interface SidebarContentProps {
  userRole: UserRole;
}

export function SidebarContent({ userRole }: SidebarContentProps) {
  return (
    <nav className="flex-1 px-4 py-6 flex flex-col">
      <div className="space-y-2">
        <NavMain userRole={userRole} />
      </div>
      <NavSecondary userRole={userRole} />
    </nav>
  );
}
