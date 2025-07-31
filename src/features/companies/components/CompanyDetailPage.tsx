import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Users,
  Calendar,
  Building2,
  Star,
  Globe,
  Linkedin,
  Twitter,
  ArrowLeft,
  ExternalLink,
  Briefcase,
  Award,
  TrendingUp,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components";
import { FeaturedJobs } from "@/features/jobs/components/FeaturedJobs";
import { mockCompanies, mockJobs } from "@/lib/mock-data";
import { Company, Job, CompanyReview } from "@/types";

export function CompanyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock reviews data
  const mockReviews: CompanyReview[] = [
    {
      id: "1",
      userId: "user-1",
      userName: "Sarah Chen",
      userAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      title: "Amazing company culture and growth opportunities",
      content:
        "Working at this company has been an incredible experience. The team is supportive, the projects are challenging, and there are plenty of opportunities to learn and grow.",
      pros: [
        "Great work-life balance",
        "Supportive management",
        "Learning opportunities",
        "Competitive salary",
      ],
      cons: ["Fast-paced environment", "Limited remote work options"],
      advice:
        "Come prepared to learn and grow. The company invests heavily in employee development.",
      position: "Senior Software Engineer",
      employmentType: "current",
      workLocation: "hybrid",
      yearsWorked: 2,
      createdAt: "2024-01-15T00:00:00Z",
      helpful: 12,
      notHelpful: 1,
      isVerified: true,
    },
    {
      id: "2",
      userId: "user-2",
      userName: "Michael Rodriguez",
      userAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      title: "Solid company with good benefits",
      content:
        "Overall a good place to work. The benefits are competitive and the team is friendly. Some processes could be improved but management is open to feedback.",
      pros: [
        "Good benefits",
        "Friendly team",
        "Open to feedback",
        "Stable company",
      ],
      cons: ["Some outdated processes", "Could use more innovation"],
      advice:
        "Be proactive about suggesting improvements. Management is receptive to new ideas.",
      position: "Product Manager",
      employmentType: "former",
      workLocation: "on-site",
      yearsWorked: 3,
      createdAt: "2024-01-10T00:00:00Z",
      helpful: 8,
      notHelpful: 2,
      isVerified: true,
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundCompany = mockCompanies.find((c) => c.id === id);
      if (foundCompany) {
        setCompany(foundCompany);
        // Get jobs for this company
        const jobs = mockJobs.filter(
          (job) => job.companyId === foundCompany.id
        );
        setCompanyJobs(jobs);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleFollowCompany = () => {
    setIsFollowing(!isFollowing);
    // TODO: Implement follow company API call
  };

  const handleSaveJob = (jobId: string) => {
    console.log("Save job:", jobId);
    // TODO: Implement save job functionality
  };

  const getEmployeeCountDisplay = (size: string, count: number) => {
    const sizeLabels = {
      startup: "1-50",
      small: "51-200",
      medium: "201-500",
      large: "501-1000",
      enterprise: "1000+",
    };
    return sizeLabels[size as keyof typeof sizeLabels] || `${count}+`;
  };

  const getHQLocation = (company: Company) => {
    const hq = company.locations.find((loc) => loc.isHeadquarters);
    return hq ? `${hq.city}, ${hq.state}, ${hq.country}` : "Multiple Locations";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>
                  <div>
                    <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
                    <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center py-16">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Company Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The company you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/companies")}>
              Browse All Companies
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 p-0 h-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Companies
        </Button>

        {/* Company Header */}
        <Card className="shadow-sm border-0 mb-8">
          {/* Cover Image */}
          {company.coverImage && (
            <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative overflow-hidden rounded-t-lg">
              <img
                src={company.coverImage}
                alt={company.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          )}

          <CardContent className="p-8 -mt-12 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Company Info */}
              <div className="flex items-start gap-6">
                {company.logo && (
                  <div className="relative flex-shrink-0">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg bg-white"
                    />
                    {company.isVerified && (
                      <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1">
                        <Award className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {company.name}
                    </h1>
                    {company.isSponsored && (
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        Sponsored
                      </Badge>
                    )}
                  </div>
                  <p className="text-xl text-gray-600 mb-4">
                    {company.industry}
                  </p>
                  <div className="flex flex-wrap items-center gap-6 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{getHQLocation(company)}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>
                        {getEmployeeCountDisplay(
                          company.size,
                          company.stats.totalEmployees
                        )}{" "}
                        employees
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Founded {company.foundedYear}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span>{company.stats.totalJobs} open positions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 lg:flex-shrink-0">
                <Button
                  variant="outline"
                  onClick={handleFollowCompany}
                  className={isFollowing ? "text-blue-600 border-blue-600" : ""}
                >
                  {isFollowing ? "Following" : "Follow Company"}
                </Button>
                {company.socialLinks.website && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open(company.socialLinks.website, "_blank")
                    }
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Company Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="flex items-center">
                    {renderStars(company.stats.averageRating)}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {company.stats.averageRating}
                </div>
                <div className="text-sm text-gray-600">
                  {company.stats.totalReviews} reviews
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {company.stats.responseRate}%
                </div>
                <div className="text-sm text-gray-600">Response Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {company.stats.avgResponseTime}d
                </div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
                  <span className="text-2xl font-bold text-green-600">
                    {company.stats.hiringGrowth}%
                  </span>
                </div>
                <div className="text-sm text-gray-600">Hiring Growth</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Jobs ({companyJobs.length})</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({mockReviews.length})
            </TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Company Description */}
                <Card className="shadow-sm border-0">
                  <CardHeader>
                    <CardTitle>About {company.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {company.description}
                    </p>

                    {company.mission && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Mission
                        </h4>
                        <p className="text-gray-700">{company.mission}</p>
                      </div>
                    )}

                    {company.vision && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Vision
                        </h4>
                        <p className="text-gray-700">{company.vision}</p>
                      </div>
                    )}

                    {company.values && company.values.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Values
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {company.values.map((value, index) => (
                            <Badge key={index} variant="outline">
                              {value}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Jobs */}
                {companyJobs.length > 0 && (
                  <Card className="shadow-sm border-0">
                    <CardHeader>
                      <CardTitle>Open Positions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FeaturedJobs
                        jobs={companyJobs.slice(0, 3)}
                        onSaveJob={handleSaveJob}
                        isLoading={false}
                      />
                      {companyJobs.length > 3 && (
                        <div className="text-center mt-6">
                          <Button
                            onClick={() =>
                              navigate(`/jobs?company=${company.id}`)
                            }
                          >
                            View All {companyJobs.length} Jobs
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Company Details */}
                <Card className="shadow-sm border-0">
                  <CardHeader>
                    <CardTitle>Company Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industry</span>
                      <span className="font-medium">{company.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company Size</span>
                      <span className="font-medium capitalize">
                        {company.size}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company Type</span>
                      <span className="font-medium capitalize">
                        {company.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded</span>
                      <span className="font-medium">{company.foundedYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Headquarters</span>
                      <span className="font-medium">
                        {getHQLocation(company)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Specialties */}
                {company.specialties && company.specialties.length > 0 && (
                  <Card className="shadow-sm border-0">
                    <CardHeader>
                      <CardTitle>Specialties</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {company.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Social Links */}
                <Card className="shadow-sm border-0">
                  <CardHeader>
                    <CardTitle>Connect</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {company.socialLinks.website && (
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() =>
                          window.open(company.socialLinks.website, "_blank")
                        }
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </Button>
                    )}
                    {company.socialLinks.linkedin && (
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() =>
                          window.open(company.socialLinks.linkedin, "_blank")
                        }
                      >
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </Button>
                    )}
                    {company.socialLinks.twitter && (
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() =>
                          window.open(company.socialLinks.twitter, "_blank")
                        }
                      >
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            {companyJobs.length > 0 ? (
              <FeaturedJobs
                jobs={companyJobs}
                onSaveJob={handleSaveJob}
                isLoading={false}
              />
            ) : (
              <Card className="shadow-sm border-0">
                <CardContent className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No Open Positions
                  </h3>
                  <p className="text-gray-600">
                    {company.name} doesn't have any open positions at the
                    moment. Follow them to get notified when new jobs are
                    posted.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="space-y-6">
              {mockReviews.map((review) => (
                <Card key={review.id} className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.userAvatar} />
                        <AvatarFallback>
                          {review.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">
                                {review.userName}
                              </span>
                              {review.isVerified && (
                                <Badge variant="outline" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{review.position}</span>
                              <span>•</span>
                              <span className="capitalize">
                                {review.employmentType} employee
                              </span>
                              <span>•</span>
                              <span>
                                {review.yearsWorked} year
                                {review.yearsWorked !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                        </div>

                        <h4 className="font-semibold text-gray-900 mb-2">
                          {review.title}
                        </h4>
                        <p className="text-gray-700 mb-4">{review.content}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="font-medium text-green-700 mb-2">
                              Pros
                            </h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {review.pros.map((pro, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-green-500 mr-2">+</span>
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-red-700 mb-2">
                              Cons
                            </h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {review.cons.map((con, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-red-500 mr-2">-</span>
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {review.advice && (
                          <div className="bg-blue-50 p-4 rounded-lg mb-4">
                            <h5 className="font-medium text-blue-900 mb-2">
                              Advice to Management
                            </h5>
                            <p className="text-sm text-blue-800">
                              {review.advice}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                          <div className="flex items-center gap-4">
                            <span>{review.helpful} found this helpful</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Benefits */}
              {company.benefits && company.benefits.length > 0 && (
                <Card className="shadow-sm border-0">
                  <CardHeader>
                    <CardTitle>Benefits & Perks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {company.benefits.map((benefit) => (
                        <div
                          key={benefit.id}
                          className="flex items-start gap-3"
                        >
                          <Award className="h-5 w-5 mt-0.5 text-blue-500 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {benefit.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {benefit.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Locations */}
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {company.locations.map((location) => (
                      <div key={location.id} className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 mt-0.5 text-gray-500 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-gray-900 flex items-center gap-2">
                            {location.name}
                            {location.isHeadquarters && (
                              <Badge variant="outline" className="text-xs">
                                HQ
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {location.address}, {location.city},{" "}
                            {location.state} {location.postalCode}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
