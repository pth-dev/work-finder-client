import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("text-center py-12", className)}>
      {Icon && <Icon className="mx-auto h-12 w-12 text-gray-400 mb-4" />}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  );
}

interface EmptySearchResultsProps {
  searchTerm?: string;
  onClearSearch?: () => void;
  suggestions?: string[];
}

export function EmptySearchResults({
  searchTerm,
  onClearSearch,
  suggestions = [],
}: EmptySearchResultsProps) {
  const { t } = useTranslation();

  return (
    <div className="text-center py-12">
      <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          className="h-full w-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {searchTerm
          ? t("emptyState.noResultsFor", { searchTerm })
          : t("emptyState.noResults")}
      </h3>
      <p className="text-gray-600 mb-6">
        {t("emptyState.tryDifferentKeywords")}
      </p>

      {suggestions.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Try searching for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  // This would typically trigger a new search
                  console.log(`Search for: ${suggestion}`);
                }}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {onClearSearch && (
        <Button onClick={onClearSearch} variant="primary">
          Clear search
        </Button>
      )}
    </div>
  );
}
