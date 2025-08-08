import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/global-loading";
import { useJobStatistics } from "../api/admin-jobs";
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  TrendingUp 
} from "lucide-react";

export function JobStatistics() {
  const { t } = useTranslation();
  const { data: stats, isLoading, error } = useJobStatistics();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <LoadingSpinner size="sm" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-600">Failed to load statistics</p>
        </CardContent>
      </Card>
    );
  }

  const statistics = stats?.data;
  if (!statistics) return null;

  const statCards = [
    {
      title: "Total Jobs",
      value: statistics.total,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Review",
      value: statistics.pendingReview,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Active Jobs",
      value: statistics.activeJobs,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Expiring Soon",
      value: statistics.expiringSoon,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Job Status Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {Object.entries(statistics.byStatus).map(([status, count]) => {
              const statusConfig = getStatusConfig(status);
              return (
                <div key={status} className="text-center">
                  <div className={`p-3 rounded-lg ${statusConfig.bgColor} mb-2`}>
                    <statusConfig.icon className={`h-6 w-6 mx-auto ${statusConfig.color}`} />
                  </div>
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {status}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getStatusConfig(status: string) {
  const configs = {
    draft: {
      icon: Briefcase,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    pending: {
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    active: {
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    inactive: {
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    closed: {
      icon: XCircle,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    rejected: {
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  };

  return configs[status as keyof typeof configs] || configs.draft;
}
