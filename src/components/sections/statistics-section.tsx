const stats = [
  {
    number: "4",
    unit: "M",
    label: "4 million daily active users",
    description: "Jobs",
  },
  {
    number: "12",
    unit: "k",
    label: "Over 12k open job positions",
    description: "Companies",
  },
  {
    number: "20",
    unit: "M",
    label: "Over 20 million stories shared",
    description: "Resumes",
  },
];

export function StatisticsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Chart Placeholder */}
              <div className="w-80 h-80 mx-auto relative bg-gradient-to-br from-[#f0f5f7] to-[#e1f2e5] rounded-full flex items-center justify-center">
                {/* Pie Chart Visual Representation */}
                <div className="w-64 h-64 relative">
                  {/* Pie segments using CSS */}
                  <div className="absolute inset-0 rounded-full border-[40px] border-[#1967d2] border-t-[#f9ab00] border-r-[#34a853] border-b-[#ea4335] border-l-transparent transform rotate-45"></div>

                  {/* Center Circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#202124]">
                          93%
                        </div>
                        <div className="text-xs text-[#696969]">
                          Success Rate
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 left-4 bg-[#1967d2] text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                Tech Jobs
              </div>
              <div className="absolute bottom-4 right-4 bg-[#f9ab00] text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                Design Jobs
              </div>
              <div className="absolute top-1/2 -right-4 bg-[#34a853] text-white px-3 py-2 rounded-lg text-sm font-medium transform -translate-y-1/2 shadow-lg">
                Marketing
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#202124] mb-4">
                Millions of Jobs. Find the one that&apos;s right for you.
              </h2>
              <p className="text-lg text-[#696969] leading-relaxed">
                Search all the open positions on the web. Get your own
                personalized salary estimate. Read reviews on over 30,000+
                companies worldwide.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-[#1967d2] mb-2">
                    {stat.number}
                    <span className="text-2xl lg:text-3xl">{stat.unit}</span>
                  </div>
                  <div className="text-sm font-semibold text-[#202124] mb-1">
                    {stat.description}
                  </div>
                  <div className="text-xs text-[#696969]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <button className="bg-[#1967d2] hover:bg-[#1557b0] text-white font-medium px-8 py-3 rounded-lg transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
