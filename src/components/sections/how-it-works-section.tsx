import { UserPlus, Search, UserCheck } from "lucide-react";

const steps = [
  {
    id: "1",
    icon: UserPlus,
    title: "Register an account to start",
    description: "Create your profile and get started with our platform",
  },
  {
    id: "2",
    icon: Search,
    title: "Explore over thousands of resumes",
    description:
      "Browse through our extensive database of qualified candidates",
  },
  {
    id: "3",
    icon: UserCheck,
    title: "Find the most suitable candidate",
    description: "Connect with the perfect match for your job requirements",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#202124] mb-4 font-['Jost']">
            How It Works?
          </h2>
          <p className="text-base text-[#696969] font-['Jost']">
            Job for anyone, anywhere
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="text-center relative">
                {/* Step Number & Icon Container */}
                <div className="relative mb-8">
                  {/* Background Circle - matching Figma dimensions */}
                  <div className="w-[105px] h-[113px] mx-auto bg-[#1967d2] rounded-full flex items-center justify-center relative">
                    {/* Icon */}
                    <IconComponent className="w-12 h-12 text-white" />
                  </div>

                  {/* Step Number - positioned at bottom of circle */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-[#1967d2] text-white rounded-full flex items-center justify-center text-sm font-bold font-['Jost'] border-2 border-white">
                    {step.id}
                  </div>
                </div>

                {/* Step Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-[#202124] font-['Jost'] leading-normal max-w-[200px] mx-auto">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#696969] font-['Jost'] max-w-[250px] mx-auto leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Arrow (hidden on mobile, shown on desktop except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-8 text-[#1967d2]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-[#1967d2]"
                    >
                      <path
                        d="M5 12h14m-7-7l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
