"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CategoryCard } from "./category-card";
import { Pagination } from "@/components/ui/pagination";
import type { JobCategory } from "@/types/category";
import { cn } from "@/lib/utils";

interface CategoryGridProps {
  categories: JobCategory[];
  className?: string;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  enablePagination?: boolean;
  itemsPerPageMobile?: number;
  itemsPerPageDesktop?: number;
}

export function CategoryGrid({
  categories,
  className,
  columns = { md: 2, lg: 3 },
  enablePagination = false,
  itemsPerPageMobile = 3,
  itemsPerPageDesktop = 9,
}: CategoryGridProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (category?.href) {
      router.push(category.href);
    } else {
      // Fallback navigation
      router.push(`/jobs?category=${categoryId}`);
    }
  };

  // Pagination logic
  const itemsPerPage = isMobile ? itemsPerPageMobile : itemsPerPageDesktop;
  const totalPages = enablePagination
    ? Math.ceil(categories.length / itemsPerPage)
    : 1;
  const startIndex = enablePagination ? (currentPage - 1) * itemsPerPage : 0;
  const endIndex = enablePagination
    ? startIndex + itemsPerPage
    : categories.length;
  const displayedCategories = enablePagination
    ? categories.slice(startIndex, endIndex)
    : categories;

  const gridClasses = cn(
    "grid gap-6",
    columns.sm && `grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
    className
  );

  return (
    <div className="space-y-8">
      <div className={gridClasses}>
        {displayedCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={handleCategoryClick}
          />
        ))}
      </div>

      {/* Pagination - Only show if enabled and has multiple pages */}
      {enablePagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          variant={isMobile ? "dots" : "numbered"}
          size={isMobile ? "sm" : "default"}
          showPrevNext={!isMobile}
          className="justify-center"
        />
      )}
    </div>
  );
}
