import { Button, Card, Badge } from "@/components";
import { Calendar, Clock, MapPin, User, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { type Job } from "@/types";
import { type ApiCompany } from "../types";
import { CompanyLogo } from "@/components";
import { formatSalary } from "@/utils/common";
import { generateCompanySlug } from "@/utils/slug-utils";

interface JobSidebarProps {
  job: Job;
  company?: ApiCompany;
}

export function JobSidebar({ job, company }: JobSidebarProps) {
  const { t } = useTranslation();

  return (
    <Card className="border-0 shadow-lg bg-white">
      <div className="p-6 space-y-8">
        {/* Job Overview */}
        <div>
          <h3 className="text-lg font-bold text-[#202124] mb-6 font-['Jost']">
            {t("common:jobs.jobOverview")}
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#1967D2] bg-opacity-10 rounded-md flex items-center justify-center mt-0.5">
                <Calendar className="h-4 w-4 text-[#1967D2]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#202124] font-['Jost']">
                  {t("common:jobs.datePosted")}
                </p>
                <p className="text-sm text-[#696969] font-['Jost']">
                  {new Date(job.postedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {job.expiresAt && (
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#1967D2] bg-opacity-10 rounded-md flex items-center justify-center mt-0.5">
                  <Clock className="h-4 w-4 text-[#1967D2]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#202124] font-['Jost']">
                    Expiration date:
                  </p>
                  <p className="text-sm text-[#696969] font-['Jost']">
                    {new Date(job.expiresAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#1967D2] bg-opacity-10 rounded-md flex items-center justify-center mt-0.5">
                <MapPin className="h-4 w-4 text-[#1967D2]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#202124] font-['Jost']">
                  {t("common:jobs.location")}
                </p>
                <p className="text-sm text-[#696969] font-['Jost']">
                  {job.location.isRemote
                    ? "Remote"
                    : `${job.location.city}, ${job.location.country}`}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#1967D2] bg-opacity-10 rounded-md flex items-center justify-center mt-0.5">
                <User className="h-4 w-4 text-[#1967D2]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#202124] font-['Jost']">
                  {t("common:jobs.jobTitle")}
                </p>
                <p className="text-sm text-[#696969] font-['Jost']">
                  {job.title}
                </p>
              </div>
            </div>

            {job.salary && (
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#1967D2] bg-opacity-10 rounded-md flex items-center justify-center mt-0.5">
                  <DollarSign className="h-4 w-4 text-[#1967D2]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#202124] font-['Jost']">
                    Salary:
                  </p>
                  <p className="text-sm text-[#696969] font-['Jost']">
                    {formatSalary({
                      salary_min: job.salary.min,
                      salary_max: job.salary.max,
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Job Skills */}
        {job.skills && job.skills.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-[#202124] mb-6 font-['Jost']">
              Job Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-[#F5F7FC] text-[#1967D2] border border-[#1967D2]/20 hover:bg-[#1967D2] hover:text-white px-3 py-2 rounded-md font-medium text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Company Information */}
        {company && (
          <div>
            <div className="flex items-center gap-4 p-4 bg-[#1967D2] rounded-lg">
              <div className="bg-white rounded-lg p-1">
                <CompanyLogo
                  src={company.company_image}
                  companyName={company.company_name}
                  size="md"
                  variant="rounded"
                  className="w-10 h-10"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white text-lg">
                  {company.company_name}
                </h4>
                <Link
                  to={`/companies/${generateCompanySlug(company)}`}
                  className="text-white underline font-normal text-sm hover:text-white/80 transition-colors"
                >
                  View Company Profile
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div>
          <h3 className="text-lg font-bold text-[#202124] mb-6 font-['Jost']">
            Contact Us
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1967D2] focus:border-transparent text-sm"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1967D2] focus:border-transparent text-sm"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1967D2] focus:border-transparent text-sm resize-none"
            />
            <Button className="w-full bg-[#1967D2] hover:bg-[#1557B8] text-white font-medium py-3">
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
