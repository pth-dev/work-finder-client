export interface NavigationChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavigationChild[];
}

export interface NavigationProps {
  items: NavigationItem[];
  isScrolled?: boolean;
  isMobile?: boolean;
}

export interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavigationItem[];
}

export interface UserMenuProps {
  isScrolled?: boolean;
}
