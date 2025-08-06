import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils";

interface ResumeTabTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function ResumeTabTrigger({
  value,
  children,
  className,
}: ResumeTabTriggerProps) {
  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-w-0 w-full text-center overflow-hidden focus-visible:ring-blue-500 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 data-[state=active]:hover:bg-blue-700 text-gray-600";

  return (
    <TabsTrigger value={value} className={cn(baseClasses, className)}>
      <span className="truncate max-w-full">{children}</span>
    </TabsTrigger>
  );
}
