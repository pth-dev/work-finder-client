import { LucideIcon } from "lucide-react";
import { cn } from "@/utils";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  theme?: "default" | "purple" | "blue" | "green";
}

export function PageHeader({
  icon: Icon,
  title,
  subtitle,
  theme = "default",
}: PageHeaderProps) {
  const themeClasses = {
    default: {
      bg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    purple: {
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    blue: {
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    green: {
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
  };

  const currentTheme = themeClasses[theme];

  return (
    <div className="flex items-center space-x-3">
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          currentTheme.bg
        )}
      >
        <Icon className={cn("h-5 w-5", currentTheme.iconColor)} />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}
