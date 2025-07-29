import React, { useState } from 'react';
import { Search, MapPin, Briefcase, TrendingUp } from 'lucide-react';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Card, CardContent } from '@/shared/components';
import { popularSearches, locations, jobCategories } from '@/lib/mock-data';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  onSearch?: (query: string, location: string, category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (searchLocation) params.set('location', searchLocation);
    if (searchCategory) params.set('category', searchCategory);
    
    navigate(`/jobs?${params.toString()}`);
    onSearch?.(searchQuery, searchLocation, searchCategory);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePopularSearch = (search: string) => {
    setSearchQuery(search);
    const params = new URLSearchParams();
    params.set('q', search);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-indigo-300 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-32 w-28 h-28 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Dream Job
              </span>{' '}
              Today
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover thousands of job opportunities from top companies. 
              Whether you're looking for remote work, startup culture, or established enterprises, 
              we have the perfect match for your career goals.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">10K+</div>
                <div className="text-sm text-gray-600">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-indigo-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-1">50K+</div>
                <div className="text-sm text-gray-600">Success Stories</div>
              </div>
            </div>
          </div>

          {/* Right Content - Search Card */}
          <div className="lg:pl-8">
            <Card className="p-6 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center lg:text-left">
                  Start Your Job Search
                </h2>

                {/* Search Form */}
                <div className="space-y-4">
                  {/* Job Title Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Job title, keywords, or company"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-10 h-12 text-base"
                    />
                  </div>

                  {/* Location and Category Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                      <Select value={searchLocation} onValueChange={setSearchLocation}>
                        <SelectTrigger className="pl-10 h-12">
                          <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">Remote</SelectItem>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                      <Select value={searchCategory} onValueChange={setSearchCategory}>
                        <SelectTrigger className="pl-10 h-12">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Search Button */}
                  <Button 
                    onClick={handleSearch}
                    size="lg"
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    Search Jobs
                  </Button>
                </div>

                {/* Popular Searches */}
                <div className="mt-6">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600 font-medium">Popular Searches:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.slice(0, 6).map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handlePopularSearch(search)}
                        className="px-3 py-1 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors duration-200 border border-blue-200 hover:border-blue-300"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;