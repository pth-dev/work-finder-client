export type UserRole = "job_seeker" | "recruiter" | "admin";

export interface NavigationItem {
  name: string;
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive?: boolean;
}

export interface LogoutItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
  isLogout: true;
}

export type SideNavigationItem = NavigationItem | LogoutItem;
