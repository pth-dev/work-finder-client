import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations();

  const stats = [
    { icon: Users, label: "Active Users", value: "50,000+" },
    { icon: Target, label: "Jobs Posted", value: "10,000+" },
    { icon: Award, label: "Success Rate", value: "85%" },
    { icon: Globe, label: "Countries", value: "25+" },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "We continuously innovate to provide the best job search experience.",
    },
    {
      title: "Transparency",
      description:
        "We believe in transparent communication between employers and job seekers.",
    },
    {
      title: "Quality",
      description:
        "We maintain high standards for both job postings and candidate profiles.",
    },
    {
      title: "Community",
      description:
        "We foster a supportive community that helps everyone succeed.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {t("navigation.about")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            WorkFinder is a leading job search platform connecting talented
            professionals with amazing opportunities worldwide. We're passionate
            about helping people find their dream careers.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
                To revolutionize the way people find jobs and companies discover
                talent. We believe that everyone deserves to find meaningful
                work that aligns with their skills, values, and aspirations. Our
                platform uses cutting-edge technology to make job searching more
                efficient, transparent, and successful.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      {index + 1}
                    </Badge>
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Join Our Team
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to join our mission.
            If you're interested in making a difference in people's careers,
            we'd love to hear from you.
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2">
              Remote-First
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Flexible Hours
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Great Benefits
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Growth Opportunities
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
