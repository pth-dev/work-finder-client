"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useSearchHandler } from "@/hooks/use-jobs";

export function MobileSearchForm() {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const { handleSearch } = useSearchHandler();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle search with both keywords and location
    handleSearch(keywords, { location });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Keywords Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#696969]" />
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Job title, keywords, or company"
            className="w-full h-14 pl-12 pr-4 bg-white rounded-lg border border-[#ecedf2] text-[15px] text-[#202124] placeholder:text-[#696969] outline-none font-normal shadow-sm"
          />
        </div>

        {/* Location Input */}
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#696969]" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or postcode"
            className="w-full h-14 pl-12 pr-4 bg-white rounded-lg border border-[#ecedf2] text-[15px] text-[#202124] placeholder:text-[#696969] outline-none font-normal shadow-sm"
          />
        </div>

        {/* Find Jobs Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full h-14 bg-[#1967d2] hover:bg-[#1557b0] text-white rounded-lg font-medium text-[15px]"
        >
          Find Jobs
        </Button>
      </form>

      {/* Popular Searches - Mobile */}
      <div className="space-y-3">
        <span className="text-sm text-[#696969] block">Popular Searches :</span>
        <div className="flex flex-wrap gap-2">
          {[
            "Designer",
            "Developer",
            "Web",
            "IOS",
            "PHP",
            "Senior",
            "Engineer",
          ].map((tag) => (
            <button
              key={tag}
              className="text-sm text-[#1967d2] hover:text-[#1557b0] underline"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
