import { ReactNode } from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary";

interface JobDetailLayoutProps {
  header: ReactNode | null;
  content: ReactNode;
  sidebar: ReactNode;
}

export function JobDetailLayout({ header, content, sidebar }: JobDetailLayoutProps) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#F5F7FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-[2fr_1fr] gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 xl:col-span-1 space-y-8">
              {/* Job Header */}
              {header && header}
              
              {/* Job Content */}
              {content}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 xl:col-span-1">
              <div className="lg:sticky lg:top-8 lg:self-start">
                {sidebar}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}