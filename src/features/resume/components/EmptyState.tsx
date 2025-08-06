import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  actionLabel: string;
  onAction: () => void;
  theme?: "default" | "purple" | "blue" | "green";
}

export function EmptyState({
  icon: Icon,
  title,
  subtitle,
  actionLabel,
  onAction,
  theme = "default",
}: EmptyStateProps) {
  const themeClasses = {
    default: {
      bg: "bg-gray-100",
      iconColor: "text-gray-400",
      buttonClass: "",
    },
    purple: {
      bg: "bg-purple-50",
      iconColor: "text-purple-300",
      buttonClass: "bg-purple-600 hover:bg-purple-700",
    },
    blue: {
      bg: "bg-blue-50",
      iconColor: "text-blue-300",
      buttonClass: "bg-blue-600 hover:bg-blue-700",
    },
    green: {
      bg: "bg-green-50",
      iconColor: "text-green-300",
      buttonClass: "bg-green-600 hover:bg-green-700",
    },
  };

  const currentTheme = themeClasses[theme];

  return (
    <div className="text-center py-16">
      <div
        className={`mx-auto w-24 h-24 ${currentTheme.bg} rounded-full flex items-center justify-center mb-6`}
      >
        <Icon className={`h-12 w-12 ${currentTheme.iconColor}`} />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>

      <p className="text-gray-600 mb-8 max-w-md mx-auto">{subtitle}</p>

      <Button onClick={onAction} className={currentTheme.buttonClass}>
        <Plus className="h-4 w-4 mr-2" />
        {actionLabel}
      </Button>
    </div>
  );
}
