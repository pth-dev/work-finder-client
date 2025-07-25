import { CategoryGrid } from "@/components/features/categories/category-grid";
import { FEATURED_CATEGORIES, CATEGORY_STATS } from "@/constants/categories";

export function PopularCategoriesSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#202124] mb-4 font-jost">
            Popular Job Categories
          </h2>
          <p className="text-lg text-[#696969] max-w-2xl mx-auto font-jost">
            {CATEGORY_STATS.liveJobs} jobs live - {CATEGORY_STATS.newJobsToday}{" "}
            added today.
          </p>
        </div>

        {/* Categories Grid - Following Figma Design with Mobile Pagination */}
        <CategoryGrid
          categories={FEATURED_CATEGORIES}
          enablePagination={true}
          itemsPerPageMobile={3}
          itemsPerPageDesktop={9}
        />
      </div>
    </section>
  );
}
