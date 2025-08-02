import { ReactNode } from "react";
import { Card } from "@/components";

interface JobSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function JobSection({ title, children, className = "" }: JobSectionProps) {
  return (
    <Card className={`border-0 shadow-lg bg-white ${className}`}>
      <div className="p-6 md:p-8">
        {title && (
          <h2 className="text-xl font-bold text-[#202124] mb-6 font-['Jost']">{title}</h2>
        )}
        {children}
      </div>
    </Card>
  );
}