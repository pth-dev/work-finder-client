import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { paths } from "@/config/paths";

interface ProfileCompletionAlertProps {
  isProfileComplete: boolean;
}

export function ProfileCompletionAlert({
  isProfileComplete,
}: ProfileCompletionAlertProps) {
  const { t } = useTranslation();

  if (isProfileComplete) {
    return null;
  }

  return (
    <Card className="bg-red-50 border-red-200">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-5 w-5 text-red-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-red-900 truncate">
              {t("dashboard.profileCompletion.title")}
            </h3>
            <p className="text-sm text-red-700 mt-1">
              {t("dashboard.profileCompletion.subtitle")}
            </p>
          </div>
        </div>
        <Button
          asChild
          size="sm"
          className="bg-white text-red-600 border-red-600 hover:bg-red-50 flex-shrink-0 ml-4"
        >
          <Link to={paths.app.settings.getHref()}>
            {t("dashboard.profileCompletion.action")}
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
