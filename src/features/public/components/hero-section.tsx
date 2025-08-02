import React from "react";
import { useNavigate } from "react-router-dom";

import {
  HeroSearchForm,
  JobSearchParams,
} from "@/components/ui/search/hero-search-form";
import heroImage from "@/assets/hero_right.png";

interface HeroSectionProps {
  onSearch?: (params: JobSearchParams) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const navigate = useNavigate();

  // Handle search submission
  const handleSearch = (params: JobSearchParams) => {
    // Build URL and navigate
    const queryString = new URLSearchParams();
    if (params.keywords) queryString.set("q", params.keywords);
    if (params.location) queryString.set("location", params.location);

    navigate(`/jobs?${queryString.toString()}`);

    // Call parent callback
    onSearch?.(params);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8faff] to-[#f0f4ff]">
      {/* Background Shapes */}
      <div className="absolute inset-0">
        {/* Main gradient background shape */}
        <div
          className="absolute -left-[675px] -top-[1202px] w-[3546.63px] h-[3368.71px] opacity-20"
          style={{
            background:
              "linear-gradient(135deg, rgba(25, 103, 210, 0.1) 0%, rgba(25, 103, 210, 0.05) 50%, rgba(25, 103, 210, 0.02) 100%)",
            clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)",
            transform: "rotate(-15deg)",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto max-w-7xl relative z-10 px-6 sm:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-32 xl:pb-40">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Main Heading */}
            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-[#202124] leading-tight">
                There Are <span className="text-[#1967d2]">93,178</span>{" "}
                Postings <span className="block">Here For you!</span>
              </h1>
              <p className="text-[#696969] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                Find Jobs, Employment & Career Opportunities
              </p>
            </div>

            {/* Search Form */}
            <div className="w-full">
              <HeroSearchForm onSearch={handleSearch} />
            </div>

            {/* Popular Searches */}
            <div className="space-y-2">
              <p className="text-[#202124] text-xs sm:text-sm md:text-base">
                <span className="font-medium">Popular Searches : </span>
                <span className="text-[#696969] font-normal">
                  Designer, Developer, Web, IOS, PHP, Senior, Engineer
                </span>
              </p>
            </div>
          </div>

          {/* Right Content - Hero Image (Hidden on Mobile) */}
          <div className="relative hidden lg:flex justify-center items-center">
            {/* Hero Image */}
            <div className="w-full max-w-lg xl:max-w-xl relative z-10">
              <img
                src={heroImage}
                alt="Professional team collaboration"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
