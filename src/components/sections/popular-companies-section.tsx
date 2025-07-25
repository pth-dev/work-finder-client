import { MapPin, ArrowRight } from "lucide-react";

const companies = [
  {
    id: "udemy",
    name: "Udemy",
    location: "London, UK",
    openPositions: 15,
    logo: "/company-logos/udemy.svg",
    featured: true,
  },
  {
    id: "stripe",
    name: "Stripe",
    location: "London, UK",
    openPositions: 22,
    logo: "/company-logos/stripe.svg",
    featured: false,
  },
  {
    id: "dropbox",
    name: "Dropbox",
    location: "London, UK",
    openPositions: 22,
    logo: "/company-logos/dropbox.svg",
    featured: false,
  },
  {
    id: "figma",
    name: "Figma",
    location: "London, UK",
    openPositions: 22,
    logo: "/company-logos/figma.svg",
    featured: false,
  },
];

export function PopularCompaniesSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#f3f7fb]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#202124] mb-4 font-['Jost']">
              Top Company Registered
            </h2>
            <p className="text-base text-[#696969] font-['Jost']">
              Some of the companies we've helped recruit excellent applicants
              over the years.
            </p>
          </div>

          {/* Browse All Button */}
          <div className="flex items-center gap-2 text-[#1967d2] cursor-pointer hover:text-[#1557b0] transition-colors">
            <span className="text-sm font-['Jost']">Browse All</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Company Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-lg border border-[#ecedf2] p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              {/* Company Logo */}
              <div className="flex justify-center mb-6">
                <div className="w-[90px] h-[90px] bg-[#eeece8] rounded-lg flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1967d2] to-[#1557b0] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {company.name.charAt(0)}
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="text-center space-y-3">
                <h3 className="text-lg font-medium text-[#202124] font-['Jost']">
                  {company.name}
                </h3>

                <div className="flex items-center justify-center gap-1 text-sm text-[#696969] font-['Jost']">
                  <MapPin className="w-3 h-3" />
                  <span>{company.location}</span>
                </div>
              </div>

              {/* Open Positions Badge */}
              <div className="mt-6">
                <div
                  className={`
                  rounded-full px-4 py-2 text-center text-sm font-['Jost']
                  ${
                    company.featured
                      ? "bg-[#1967d2] text-white"
                      : "bg-[#1967d2]/7 text-[#1967d2]"
                  }
                `}
                >
                  {company.openPositions} Open Position
                  {company.openPositions !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
