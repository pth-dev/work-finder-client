import { Briefcase, Heart, Bell } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StatCard } from "@/components/common/StatCard";

interface StatsGridProps {
  totalApplications: number;
  savedJobs: number;
  interviews: number;
}

export function StatsGrid({
  totalApplications,
  savedJobs,
  interviews,
}: StatsGridProps) {
  const { t } = useTranslation();

  const stats = [
    {
      title: t("dashboard.stats.appliedJobs"),
      value: totalApplications,
      icon: Briefcase,
      variant: "blue" as const,
    },
    {
      title: t("dashboard.stats.favoriteJobs"),
      value: savedJobs,
      icon: Heart,
      variant: "yellow" as const,
    },
    {
      title: t("dashboard.stats.jobAlerts"),
      value: interviews,
      icon: Bell,
      variant: "green" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          variant={stat.variant}
          size="compact"
        />
      ))}
    </div>
  );
}
