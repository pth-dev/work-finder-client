"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Responsive layout props
interface ResponsiveLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarPosition?: "left" | "right";
  sidebarWidth?: "sm" | "md" | "lg";
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

/**
 * ResponsiveLayout - Flexible layout with optional sidebar
 * Automatically handles responsive behavior and sidebar collapse
 */
const ResponsiveLayout = React.forwardRef<
  HTMLDivElement,
  ResponsiveLayoutProps
>(
  (
    {
      className,
      children,
      sidebar,
      sidebarPosition = "left",
      sidebarWidth = "md",
      collapsible = false,
      defaultCollapsed = false,
      ...props
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

    const sidebarWidthVariants = {
      sm: "w-64",
      md: "w-72",
      lg: "w-80",
    };

    const collapsedWidth = "w-16";

    const sidebarClasses = cn(
      "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50",
      collapsible && isCollapsed
        ? collapsedWidth
        : sidebarWidthVariants[sidebarWidth],
      sidebarPosition === "right" ? "lg:right-0" : "lg:left-0",
      "bg-background border-r transition-all duration-300"
    );

    const mainClasses = cn(
      "flex-1 flex flex-col",
      sidebar &&
        (sidebarPosition === "left"
          ? cn(
              "lg:pl-64",
              collapsible && isCollapsed && "lg:pl-16",
              sidebarWidth === "sm" && !isCollapsed && "lg:pl-64",
              sidebarWidth === "md" && !isCollapsed && "lg:pl-72",
              sidebarWidth === "lg" && !isCollapsed && "lg:pl-80"
            )
          : cn(
              "lg:pr-64",
              collapsible && isCollapsed && "lg:pr-16",
              sidebarWidth === "sm" && !isCollapsed && "lg:pr-64",
              sidebarWidth === "md" && !isCollapsed && "lg:pr-72",
              sidebarWidth === "lg" && !isCollapsed && "lg:pr-80"
            ))
    );

    return (
      <div ref={ref} className={cn("flex h-screen", className)} {...props}>
        {sidebar && (
          <div className={sidebarClasses}>
            {collapsible && (
              <div className="flex items-center justify-between p-4 border-b">
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-2 rounded-md hover:bg-accent transition-colors"
                  aria-label={
                    isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
                >
                  <svg
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isCollapsed && "rotate-180"
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div
              className={cn("flex-1 overflow-y-auto", isCollapsed && "px-2")}
            >
              {sidebar}
            </div>
          </div>
        )}

        <main className={mainClasses}>{children}</main>
      </div>
    );
  }
);

ResponsiveLayout.displayName = "ResponsiveLayout";

// Two column layout
interface TwoColumnLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  leftColumn?: React.ReactNode;
  rightColumn?: React.ReactNode;
  leftWidth?: "1/3" | "1/4" | "2/5" | "1/2";
  gap?: "none" | "sm" | "md" | "lg";
  stackOnMobile?: boolean;
}

const TwoColumnLayout = React.forwardRef<HTMLDivElement, TwoColumnLayoutProps>(
  (
    {
      className,
      children,
      leftColumn,
      rightColumn,
      leftWidth = "1/3",
      gap = "md",
      stackOnMobile = true,
      ...props
    },
    ref
  ) => {
    const leftWidthVariants = {
      "1/4": "lg:w-1/4",
      "1/3": "lg:w-1/3",
      "2/5": "lg:w-2/5",
      "1/2": "lg:w-1/2",
    };

    const rightWidthVariants = {
      "1/4": "lg:w-3/4",
      "1/3": "lg:w-2/3",
      "2/5": "lg:w-3/5",
      "1/2": "lg:w-1/2",
    };

    const gapVariants = {
      none: "gap-0",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    };

    const containerClasses = cn(
      "flex",
      stackOnMobile ? "flex-col lg:flex-row" : "flex-row",
      gapVariants[gap],
      className
    );

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {leftColumn && (
          <div className={cn("flex-shrink-0", leftWidthVariants[leftWidth])}>
            {leftColumn}
          </div>
        )}

        <div
          className={cn(
            "flex-1 min-w-0",
            !leftColumn && !rightColumn && "w-full"
          )}
        >
          {children}
        </div>

        {rightColumn && (
          <div className={cn("flex-shrink-0", rightWidthVariants[leftWidth])}>
            {rightColumn}
          </div>
        )}
      </div>
    );
  }
);

TwoColumnLayout.displayName = "TwoColumnLayout";

// Three column layout
interface ThreeColumnLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  leftColumn?: React.ReactNode;
  rightColumn?: React.ReactNode;
  leftWidth?: "1/4" | "1/5";
  rightWidth?: "1/4" | "1/5";
  gap?: "none" | "sm" | "md" | "lg";
  stackOnMobile?: boolean;
}

const ThreeColumnLayout = React.forwardRef<
  HTMLDivElement,
  ThreeColumnLayoutProps
>(
  (
    {
      className,
      children,
      leftColumn,
      rightColumn,
      leftWidth = "1/4",
      rightWidth = "1/4",
      gap = "md",
      stackOnMobile = true,
      ...props
    },
    ref
  ) => {
    const widthVariants = {
      "1/5": "lg:w-1/5",
      "1/4": "lg:w-1/4",
    };

    const gapVariants = {
      none: "gap-0",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    };

    const containerClasses = cn(
      "flex",
      stackOnMobile ? "flex-col lg:flex-row" : "flex-row",
      gapVariants[gap],
      className
    );

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {leftColumn && (
          <div className={cn("flex-shrink-0", widthVariants[leftWidth])}>
            {leftColumn}
          </div>
        )}

        <div className="flex-1 min-w-0">{children}</div>

        {rightColumn && (
          <div className={cn("flex-shrink-0", widthVariants[rightWidth])}>
            {rightColumn}
          </div>
        )}
      </div>
    );
  }
);

ThreeColumnLayout.displayName = "ThreeColumnLayout";

// Export all components
export { ResponsiveLayout as default, TwoColumnLayout, ThreeColumnLayout };
