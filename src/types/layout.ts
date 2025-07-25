export interface LayoutProps {
  children: React.ReactNode;
}

export interface HeaderProps {
  className?: string;
}

export interface FooterProps {
  className?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}
