import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils";

interface SettingsTabTriggerProps {
  value: string;
  children: React.ReactNode;
  variant?: "default" | "danger";
  className?: string;
}

export function SettingsTabTrigger({
  value,
  children,
  variant = "default",
  className,
}: SettingsTabTriggerProps) {
  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-1 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-w-0 w-full text-center overflow-hidden";

  const variantClasses = {
    default:
      "focus-visible:ring-blue-500 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 data-[state=active]:hover:bg-blue-700 text-gray-600",
    danger:
      "focus-visible:ring-red-500 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-red-50 data-[state=active]:hover:bg-red-700 text-red-600",
  };

  return (
    <TabsTrigger
      value={value}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      <span className="truncate max-w-full">{children}</span>
    </TabsTrigger>
  );
}
