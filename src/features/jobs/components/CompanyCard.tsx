import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { Button, CompanyLogo } from "@/components";
import { JobSection } from "./JobSection";
import { type ApiCompany } from "../types";

interface CompanyCardProps {
  company: ApiCompany;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <JobSection title={t("common:companies.companyProfile")}>
      <div className="text-center space-y-4">
        <CompanyLogo
          src={company.company_image || undefined}
          companyName={company.company_name}
          size="xl"
          variant="rounded"
          className="h-20 w-20 mx-auto"
        />
        <div>
          <h3 className="text-lg font-bold text-[#202124] mb-2 font-['Jost']">
            {company.company_name}
          </h3>
          <Button
            variant="outline"
            size="sm"
            className="border-[#1967D2] text-[#1967D2] hover:bg-[#1967D2] hover:text-white"
            onClick={() => navigate(`/companies/${company.company_id}`)}
          >
            {t("common:companies.viewCompanyProfile")}
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </JobSection>
  );
}
