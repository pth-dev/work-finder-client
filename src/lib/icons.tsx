import {
  Calculator,
  TrendingUp,
  Palette,
  Code,
  Users,
  Banknote,
  Headphones,
  Heart,
  Car,
  Building2,
  Briefcase,
  GraduationCap,
  Shield,
  Zap,
  Globe,
  Camera,
  Music,
  Gamepad2,
  Plane,
  Home,
  Utensils,
  Shirt,
  Wrench,
  LucideIcon,
} from "lucide-react";

// Icon mapping for dynamic icon loading
const iconMap: Record<string, LucideIcon> = {
  Calculator,
  TrendingUp,
  Palette,
  Code,
  Users,
  Banknote,
  Headphones,
  Heart,
  Car,
  Building2,
  Briefcase,
  GraduationCap,
  Shield,
  Zap,
  Globe,
  Camera,
  Music,
  Gamepad2,
  Plane,
  Home,
  Utensils,
  Shirt,
  Wrench,
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className }: DynamicIconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Fallback to a default icon if the specified icon is not found
    const DefaultIcon = iconMap.Briefcase;
    return <DefaultIcon className={className} />;
  }

  return <IconComponent className={className} />;
}

// Export the icon map for type checking
export { iconMap };
export type IconName = keyof typeof iconMap;
