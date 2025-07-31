import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
 
  Users, 
  Bookmark, 
  Share2, 
  Building2,
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Badge, 
  Separator,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components';
import { mockJobs, mockCompanies } from '@/lib/mock-data';
import { Job, Company } from '@/types';
import { formatDistanceToNow } from 'date-fns';

export function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundJob = mockJobs.find(j => j.id === id);
      if (foundJob) {
        setJob(foundJob);
        const foundCompany = mockCompanies.find(c => c.id === foundJob.companyId);
        setCompany(foundCompany || null);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    // TODO: Implement save job API call
  };

  const handleShareJob = () => {
    navigator.clipboard.writeText(window.location.href);
    // TODO: Show toast notification
  };

  const handleApply = () => {
    setIsApplying(true);
    // Simulate application process
    setTimeout(() => {
      setIsApplying(false);
      setHasApplied(true);
      // TODO: Show success notification
    }, 2000);
  };

  const handleViewCompany = () => {
    if (company) {
      navigate(`/companies/${company.id}`);
    }
  };

  const formatSalary = (salary: Job['salary']) => {
    if (!salary) return 'Salary not disclosed';
    const { min, max, period } = salary;
    const periodText = period === 'yearly' ? '/year' : period === 'monthly' ? '/month' : '/hour';
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k ${periodText}`;
  };

  const getLocationDisplay = (job: Job) => {
    if (job.location.isRemote || job.workLocation === 'remote') return 'Remote';
    return `${job.location.city}, ${job.location.state}, ${job.location.country}`;
  };

  const getWorkLocationBadgeColor = (workLocation: string) => {
    switch (workLocation) {
      case 'remote': return 'bg-green-100 text-green-800 border-green-200';
      case 'hybrid': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on-site': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
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

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
            <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/jobs')}>Browse All Jobs</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 p-0 h-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="shadow-sm border-0">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    {job.companyLogo && (
                      <img 
                        src={job.companyLogo} 
                        alt={job.companyName}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                    )}
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                      <button 
                        onClick={handleViewCompany}
                        className="text-xl text-blue-600 hover:text-blue-700 font-medium mb-2 transition-colors"
                      >
                        {job.companyName}
                      </button>
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{getLocationDisplay(job)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{job.applicationsCount} applicants</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSaveJob}
                      className={isSaved ? 'text-blue-600 border-blue-600' : ''}
                    >
                      <Bookmark className={`h-4 w-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                      {isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShareJob}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Salary</div>
                    <div className="font-semibold text-green-600">{formatSalary(job.salary)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Job Type</div>
                    <Badge variant="secondary" className="capitalize">
                      {job.type.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Experience</div>
                    <Badge variant="secondary" className="capitalize">
                      {job.experienceLevel.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Work Style</div>
                    <Badge className={`capitalize ${getWorkLocationBadgeColor(job.workLocation)}`}>
                      {job.workLocation.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex gap-2 mb-6">
                  {job.featured && (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Featured
                    </Badge>
                  )}
                  {job.urgent && (
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      Urgent Hiring
                    </Badge>
                  )}
                  {job.applicationDeadline && (
                    <Badge variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                    </Badge>
                  )}
                </div>

                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {job.description}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {job.requirements.map((req) => (
                      <div key={req.id} className="flex items-start gap-3">
                        <CheckCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                          req.required ? 'text-red-500' : 'text-green-500'
                        }`} />
                        <div>
                          <div className="font-medium text-gray-900">
                            {req.name}
                            {req.required && <span className="text-red-500 ml-1">*</span>}
                          </div>
                          <div className="text-sm text-gray-600 capitalize">
                            {req.type} - {req.level} level
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Benefits & Perks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {job.benefits.map((benefit) => (
                      <div key={benefit.id} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 mt-0.5 text-green-500 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-gray-900">{benefit.name}</div>
                          {benefit.description && (
                            <div className="text-sm text-gray-600">{benefit.description}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="shadow-sm border-0 sticky top-4">
              <CardContent className="p-6">
                {hasApplied ? (
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Submitted!</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Your application has been sent to {job.companyName}. They typically respond within 3-5 business days.
                    </p>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/applications')}>
                      View Application Status
                    </Button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Apply?</h3>
                    
                    {job.applicationUrl ? (
                      <Button 
                        className="w-full mb-3" 
                        onClick={() => window.open(job.applicationUrl, '_blank')}
                        disabled={isApplying}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply on Company Site
                      </Button>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full mb-3" disabled={isApplying}>
                            {isApplying ? 'Submitting...' : 'Apply Now'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Apply for {job.title}</DialogTitle>
                            <DialogDescription>
                              Submit your application for this position at {job.companyName}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="text-sm text-gray-600">
                              Your profile and resume will be submitted to the employer. 
                              Make sure your profile is complete for the best chance of success.
                            </p>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button onClick={handleApply} disabled={isApplying}>
                              {isApplying ? 'Submitting...' : 'Submit Application'}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}

                    <p className="text-xs text-gray-500 text-center">
                      By applying, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Company Info */}
            {company && (
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    About {company.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {company.description}
                    </p>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Industry</span>
                        <span className="font-medium">{company.industry}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Company Size</span>
                        <span className="font-medium capitalize">{company.size}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Founded</span>
                        <span className="font-medium">{company.foundedYear}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Open Positions</span>
                        <span className="font-medium">{company.stats.totalJobs}</span>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleViewCompany}
                    >
                      View Company Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Similar Jobs */}
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockJobs
                    .filter(j => j.id !== job.id && (
                      j.categories.some(cat => job.categories.includes(cat)) ||
                      j.skills.some(skill => job.skills.includes(skill))
                    ))
                    .slice(0, 3)
                    .map((similarJob) => (
                      <div 
                        key={similarJob.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/jobs/${similarJob.id}`)}
                      >
                        <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">
                          {similarJob.title}
                        </h4>
                        <p className="text-sm text-blue-600 mb-2">{similarJob.companyName}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(similarJob.postedAt), { addSuffix: true })}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {similarJob.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}