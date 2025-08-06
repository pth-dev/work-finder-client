import { Button, Card, Badge } from "@/components";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  DollarSign,
  Briefcase,
} from "lucide-react";
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
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#1967D2] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#202124] font-['Jost'] mb-1">
                  {t("common:jobs.datePosted")}
                </p>
                <p className="text-sm text-[#696969] font-['Jost']">
                  {new Date(job.postedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {job.expiresAt && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1967D2] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#202124] font-['Jost'] mb-1">
                    Expiration date:
                  </p>
                  <p className="text-sm text-[#696969] font-['Jost']">
                    {new Date(job.expiresAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#1967D2] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#202124] font-['Jost'] mb-1">
                  Địa điểm:
                </p>
                <p className="text-sm text-[#696969] font-['Jost']">
                  {job.location.isRemote
                    ? "Remote"
                    : `${job.location.city}, ${job.location.country}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#1967D2] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#202124] font-['Jost'] mb-1">
                  Chức danh:
                </p>
                <p className="text-sm text-[#696969] font-['Jost']">
                  {job.title}
                </p>
              </div>
            </div>

            {job.salary && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1967D2] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#202124] font-['Jost'] mb-1">
                    Salary:
                  </p>
                  <p className="text-sm text-[#696969] font-['Jost']">
                    {formatSalary({
                      min: job.salary.min,
                      max: job.salary.max,
                      text: job.salary.text, // ✅ Use pre-formatted text if available
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
                  className="bg-[#F5F7FC] text-white border border-[#1967D2]/20 hover:bg-[#1967D2] hover:text-white px-3 py-2 rounded-md font-medium text-sm"
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
                  {t("common:companies.viewCompanyProfile")}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div>
          <h3 className="text-lg font-bold text-[#202124] mb-6">
            {t("contact.title")}
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder={t("contact.form.namePlaceholder")}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1967D2] focus:border-transparent text-sm"
            />
            <input
              type="email"
              placeholder={t("contact.form.emailPlaceholder")}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1967D2] focus:border-transparent text-sm"
            />
            <textarea
              placeholder={t("contact.form.messagePlaceholder")}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1967D2] focus:border-transparent text-sm resize-none"
            />
            <Button className="w-full bg-[#1967D2] hover:bg-[#1557B8] text-white font-medium py-3">
              {t("contact.form.sendButton")}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
