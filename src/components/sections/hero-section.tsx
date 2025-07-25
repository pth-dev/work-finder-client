"use client";

import { SearchForm } from "@/components/features/search/search-form";
import { MobileSearchForm } from "@/components/features/search/mobile-search-form";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

export function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="relative bg-gradient-to-br from-[#f0f5f7] to-[#e1f2e5] -mt-16 pt-32 pb-16 md:mt-0 md:py-20 lg:py-28 xl:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#202124] leading-tight">
                {t("hero.title", { count: "93,178" })}
              </h1>
              <p className="text-sm md:text-base text-[#696969] max-w-lg">
                {t("hero.subtitle")}
              </p>
            </div>

            {/* Search Form - Desktop */}
            <div className="hidden md:block space-y-4">
              <SearchForm className="max-w-4xl" />

              {/* Popular Searches - Desktop */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-[#696969]">
                  {t("hero.popular")}
                </span>
                {[
                  { key: "designer", label: t("hero.popularTags.designer") },
                  { key: "developer", label: t("hero.popularTags.developer") },
                  { key: "web", label: t("hero.popularTags.web") },
                  { key: "ios", label: t("hero.popularTags.ios") },
                  { key: "php", label: t("hero.popularTags.php") },
                  { key: "senior", label: t("hero.popularTags.senior") },
                  { key: "engineer", label: t("hero.popularTags.engineer") },
                ].map((tag) => (
                  <button
                    key={tag.key}
                    className="text-sm text-[#1967d2] hover:text-[#1557b0] underline"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Search Form */}
            <div className="md:hidden space-y-4">
              <MobileSearchForm />
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main Illustration */}
              <div className="w-full h-80 xl:h-96 bg-gradient-to-br from-[#e1f2e5] to-[#f0f5f7] rounded-2xl flex items-center justify-center p-6 xl:p-8">
                <Image
                  src="/hero_right.png"
                  alt="Job Search Illustration"
                  width={400}
                  height={300}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg p-3 xl:p-4 shadow-lg border border-white/20">
                <div className="text-xs xl:text-sm">
                  <div className="font-medium text-[#202124]">
                    {t("hero.stats.jobsAvailable")}
                  </div>
                  <div className="text-[#696969]">
                    {t("hero.stats.updatedDaily")}
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 xl:p-4 shadow-lg border border-white/20">
                <div className="text-xs xl:text-sm">
                  <div className="font-medium text-[#202124]">
                    500+ Companies
                  </div>
                  <div className="text-[#696969]">Are hiring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
