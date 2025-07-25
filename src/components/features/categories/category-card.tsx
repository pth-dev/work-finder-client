"use client";

import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/lib/icons";
import type { JobCategory } from "@/types/category";

interface CategoryCardProps {
  category: JobCategory;
  className?: string;
  onClick?: (categoryId: string) => void;
}

export const CategoryCard = memo(function CategoryCard({
  category,
  className,
  onClick,
}: CategoryCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(category.id);
    } else if (category.href) {
      window.location.href = category.href;
    }
  };

  return (
    <Card
      className={cn(
        "group transition-all duration-300 cursor-pointer border-[#ecedf2] hover:shadow-[0px_6px_15px_0px_rgba(64,79,104,0.05)] bg-white h-[110px]",
        className
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Browse ${category.title} jobs - ${category.jobCount}`}
    >
      <CardContent className="p-6 h-full">
        <div className="flex items-center space-x-4 h-full">
          {/* Icon Circle - Exact Figma Match: 70px circle with 35px icon */}
          <div className="w-[70px] h-[70px] rounded-lg bg-[#ecedf2] group-hover:bg-[#1967d2] flex items-center justify-center transition-all duration-300">
            <DynamicIcon
              name={category.iconName}
              className="w-[35px] h-[35px] text-[#696969] group-hover:text-white transition-colors duration-300"
            />
          </div>

          {/* Content - Exact Figma Match */}
          <div className="flex-1">
            <h3 className="font-medium text-[18px] leading-normal text-[#202124] group-hover:text-[#1967d2] transition-colors duration-300 font-jost mb-1">
              {category.title}
            </h3>
            <p className="text-[14px] leading-normal text-[#696969] font-jost">
              ({category.jobCount})
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

CategoryCard.displayName = "CategoryCard";
