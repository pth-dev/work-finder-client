import React from "react";
import { Search, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the search form schema
const searchFormSchema = z.object({
  keywords: z.string().optional(),
  location: z.string().optional(),
});

// Define the interface for job search parameters
export interface JobSearchParams {
  keywords: string;
  location: string;
}

interface HeroSearchFormProps {
  onSearch?: (params: JobSearchParams) => void;
  className?: string;
}

export const HeroSearchForm: React.FC<HeroSearchFormProps> = ({
  onSearch,
  className = "",
}) => {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      keywords: "",
      location: "",
    },
  });

  const onSubmit = (values: z.infer<typeof searchFormSchema>) => {
    onSearch?.({
      keywords: values.keywords || "",
      location: values.location || "",
    });
  };

  return (
    <div className={`w-full ${className}`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Mobile Layout - Vertical Stack */}
          <div className="block md:hidden space-y-4 max-w-sm mx-auto">
            {/* Job Title Input */}
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        {...field}
                        placeholder={t("hero.search.jobPlaceholder")}
                        className="pl-10 h-12 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Location Input */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        {...field}
                        placeholder={t("hero.search.locationPlaceholder")}
                        className="pl-10 h-12 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Find Jobs Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#1967d2] hover:bg-[#1557b8] text-white rounded-lg font-medium text-sm transition-colors duration-200"
            >
              {t("hero.search.button")}
            </Button>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden md:block">
            <div className="relative bg-white h-[80px] w-full max-w-[700px] rounded-lg shadow-[0px_6px_15px_0px_rgba(64,79,104,0.05)] border border-[#ecedf2]">
              <div className="h-full flex">
                {/* Keywords section - Equal width */}
                <div className="flex items-center px-[24px] py-[15px] border-r border-[#ecedf2] w-1/2">
                  <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem className="flex-1 min-w-0">
                        <FormControl>
                          <div className="flex items-center w-full min-w-0">
                            <Search className="w-4 h-4 text-[#696969] mr-[15px] flex-shrink-0" />
                            <Input
                              {...field}
                              placeholder={t("hero.search.jobPlaceholder")}
                              className="w-full min-w-0 text-[15px] text-[#696969] placeholder:text-[#696969] bg-transparent border-none outline-none shadow-none p-0 h-auto focus-visible:ring-0"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Location section - Equal width */}
                <div className="flex items-center px-[24px] py-[15px] w-1/2">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="flex-1 min-w-0">
                        <FormControl>
                          <div className="flex items-center w-full min-w-0">
                            <MapPin className="w-4 h-4 text-[#696969] mr-[15px] flex-shrink-0" />
                            <Input
                              {...field}
                              placeholder={t("hero.search.locationPlaceholder")}
                              className="w-full min-w-0 text-[15px] text-[#696969] placeholder:text-[#696969] bg-transparent border-none outline-none shadow-none p-0 h-auto focus-visible:ring-0"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Find Jobs Button */}
                <div className="flex items-center pr-[20px] pl-[8px]">
                  <Button
                    type="submit"
                    className="bg-[#1967d2] hover:bg-[#1557b8] text-white h-[50px] w-[130px] rounded-lg text-[15px] font-medium transition-colors duration-200 border-none shadow-none"
                  >
                    {t("hero.search.button")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
