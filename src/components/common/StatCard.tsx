import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant: "blue" | "yellow" | "green" | "red";
  subtitle?: string;
  className?: string;
  size?: "default" | "compact";
}

const variantStyles = {
  blue: {
    card: "bg-blue-50 border-blue-200",
    title: "text-blue-700",
    value: "text-blue-900",
    icon: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  yellow: {
    card: "bg-yellow-50 border-yellow-200",
    title: "text-yellow-700",
    value: "text-yellow-900",
    icon: "text-yellow-600",
    iconBg: "bg-yellow-100",
  },
  green: {
    card: "bg-green-50 border-green-200",
    title: "text-green-700",
    value: "text-green-900",
    icon: "text-green-600",
    iconBg: "bg-green-100",
  },
  red: {
    card: "bg-red-50 border-red-200",
    title: "text-red-700",
    value: "text-red-900",
    icon: "text-red-600",
    iconBg: "bg-red-100",
  },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  variant,
  subtitle,
  className,
  size = "default",
}: StatCardProps) {
  const styles = variantStyles[variant];

  const isCompact = size === "compact";
  const padding = isCompact ? "p-3" : "p-4";
  const iconSize = isCompact ? "w-8 h-8" : "w-10 h-10";
  const iconIconSize = isCompact ? "h-4 w-4" : "h-5 w-5";
  const valueSize = isCompact ? "text-xl" : "text-2xl";
  const titleSize = isCompact ? "text-xs" : "text-sm";

  return (
    <Card className={cn(styles.card, padding, className)}>
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className={cn(titleSize, "font-medium mb-1", styles.title)}>
              {title}
            </p>
            <div className={cn(valueSize, "font-bold", styles.value)}>
              {value}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div
            className={cn(
              iconSize,
              "rounded-lg flex items-center justify-center ml-3",
              styles.iconBg
            )}
          >
            <Icon className={cn(iconIconSize, styles.icon)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
