import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MainContentCardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  scrollable?: boolean;
}

export function MainContentCard({
  children,
  className,
  contentClassName,
  scrollable = true,
}: MainContentCardProps) {
  return (
    <div className="h-full p-6 overflow-hidden">
      <Card
        className={cn(
          "bg-white py-0 shadow-lg border border-gray-200 h-full flex flex-col overflow-hidden",
          className
        )}
      >
        <CardContent
          className={cn(
            "p-6 flex-1",
            scrollable &&
              "overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
            contentClassName
          )}
        >
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
