import { Button } from "@/components/ui/button";
import { Smartphone, Download } from "lucide-react";

export function MobileAppSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#202124] mb-4">
                Get the Superio Job Search App
              </h2>
              <p className="text-lg text-[#696969] leading-relaxed">
                Search through millions of jobs and find the right fit. Simply
                swipe right to apply.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#1967d2] rounded-full"></div>
                <span className="text-[#202124]">Browse jobs on the go</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#1967d2] rounded-full"></div>
                <span className="text-[#202124]">Apply with one tap</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#1967d2] rounded-full"></div>
                <span className="text-[#202124]">
                  Get instant notifications
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#1967d2] rounded-full"></div>
                <span className="text-[#202124]">Track application status</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-black" />
                </div>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </button>

              <button className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <Download className="w-4 h-4 text-black" />
                </div>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Side - Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-64 h-[520px] bg-black rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Screen Content */}
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-[#202124]">
                        Superio
                      </div>
                      <div className="w-8 h-8 bg-[#1967d2] rounded-full"></div>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-[#f0f5f7] rounded-lg p-3">
                      <div className="text-sm text-[#696969]">
                        Search jobs...
                      </div>
                    </div>

                    {/* Job Cards */}
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-[#f0f5f7] rounded-lg p-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#1967d2] rounded-lg"></div>
                            <div className="flex-1">
                              <div className="h-3 bg-[#202124] rounded mb-1"></div>
                              <div className="h-2 bg-[#696969] rounded w-2/3"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-[#34a853] text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                50k+ Downloads
              </div>

              <div className="absolute -bottom-4 -left-4 bg-[#f9ab00] text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                4.8★ Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
