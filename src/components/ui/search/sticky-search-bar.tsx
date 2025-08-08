import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SearchInput } from "./search-input";
import { LocationInput } from "./location-input";
import { Filter } from "lucide-react";

// Search form schema
const stickySearchSchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
});

export interface StickySearchParams {
  search?: string;
  location?: string;
}

interface StickySearchBarProps {
  onSearch?: (params: StickySearchParams) => void;
  initialValues?: StickySearchParams;
  className?: string;
  onToggleFilters?: () => void;
  showFiltersButton?: boolean;
}

export const StickySearchBar: React.FC<StickySearchBarProps> = ({
  onSearch,
  initialValues = {},
  className = "",
  onToggleFilters,
  showFiltersButton = true,
}) => {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof stickySearchSchema>>({
    resolver: zodResolver(stickySearchSchema),
    defaultValues: {
      search: initialValues.search || "",
      location: initialValues.location || "",
    },
  });

  const onSubmit = (values: z.infer<typeof stickySearchSchema>) => {
    onSearch?.(values);
  };

  return (
    <div
      className={`sticky top-16 md:top-20 z-30 border-b border-gray-200 shadow-sm ${className}`}
      style={{
        background: "linear-gradient(259deg, #F5F7FC 0.12%, #F5F7FC 99.74%)",
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Mobile Layout */}
            <div className="block lg:hidden space-y-3">
              <SearchInput
                control={form.control}
                name="search"
                placeholder={t("search.jobPlaceholder")}
                size="sm"
              />
              <div className="flex gap-2">
                <div className="flex-1">
                  <LocationInput
                    control={form.control}
                    name="location"
                    placeholder={t("search.locationPlaceholder")}
                    size="sm"
                  />
                </div>
                {showFiltersButton && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onToggleFilters}
                    className="h-9 px-3 border-gray-300"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {t("search.filtersButton")}
                  </Button>
                )}
              </div>
              <Button
                type="submit"
                className="w-full h-9 bg-[#1967d2] hover:bg-[#1557b8] text-white text-sm"
              >
                {t("search.searchJobs")}
              </Button>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <div className="container mx-auto px-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <SearchInput
                      control={form.control}
                      name="search"
                      placeholder={t("search.jobPlaceholder")}
                      size="md"
                    />
                  </div>
                  <div className="w-64">
                    <LocationInput
                      control={form.control}
                      name="location"
                      placeholder={t("search.locationPlaceholder")}
                      size="md"
                    />
                  </div>
                  {showFiltersButton && (
                    <Button
                      type="button"
                      variant="outline"
                      size="default"
                      onClick={onToggleFilters}
                      className="h-12 px-4 border-gray-300"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      {t("search.advancedFilters")}
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="h-12 px-8 bg-[#1967d2] hover:bg-[#1557b8] text-white font-medium"
                  >
                    {t("search.search")}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
