import React from "react";
import { cn } from "@/utils";

// Section Header Component - Pure UI for homepage sections
export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export const SectionHeader = React.forwardRef<
  HTMLDivElement,
  SectionHeaderProps
>(({ title, subtitle, children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("text-center mb-12", className)} {...props}>
      <h2 className="text-[30px] font-medium text-[#202124] mb-4 font-['Jost']">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[15px] text-[#696969] font-['Jost'] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
});

SectionHeader.displayName = "SectionHeader";
