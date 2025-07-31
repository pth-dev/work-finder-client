import {
  type Job,
  type Company,
  type User,
  type Application,
  type JobType,
  type ExperienceLevel,
  type WorkLocation,
  type CompanySize,
  type ApplicationStatus,
} from "@/types";

// Mock Companies Data
export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechFlow Innovations",
    slug: "techflow-innovations",
    description:
      "A leading technology company specializing in AI and machine learning solutions for enterprise clients.",
    mission:
      "To democratize artificial intelligence and make it accessible to businesses of all sizes.",
    vision: "To be the global leader in AI-driven business transformation.",
    values: ["Innovation", "Integrity", "Collaboration", "Excellence"],
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center",
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop",
    size: "medium" as CompanySize,
    type: "private",
    foundedYear: 2018,
    industry: "Technology",
    specialties: [
      "Artificial Intelligence",
      "Machine Learning",
      "Cloud Computing",
      "Data Analytics",
    ],
    locations: [
      {
        id: "1",
        name: "San Francisco HQ",
        address: "123 Innovation Drive",
        city: "San Francisco",
        state: "CA",
        country: "USA",
        postalCode: "94105",
        isHeadquarters: true,
      },
    ],
    socialLinks: {
      website: "https://techflow.com",
      linkedin: "https://linkedin.com/company/techflow",
      twitter: "https://twitter.com/techflow",
    },
    benefits: [
      {
        id: "1",
        name: "Health Insurance",
        description: "Comprehensive health, dental, and vision insurance",
        category: "health",
      },
      {
        id: "2",
        name: "Remote Work",
        description: "Flexible remote work options",
        category: "perks",
      },
    ],
    stats: {
      totalEmployees: 250,
      totalJobs: 15,
      averageRating: 4.2,
      totalReviews: 87,
      responseRate: 85,
      avgResponseTime: 3,
      hiringGrowth: 15,
    },
    isVerified: true,
    isSponsored: false,
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "DataCorp Solutions",
    slug: "datacorp-solutions",
    description:
      "Enterprise data management and analytics company helping businesses make data-driven decisions.",
    mission: "To transform how businesses understand and utilize their data.",
    values: ["Data-Driven", "Customer-Centric", "Innovation", "Transparency"],
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop&crop=center",
    coverImage:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=400&fit=crop",
    size: "large" as CompanySize,
    type: "public",
    foundedYear: 2015,
    industry: "Data & Analytics",
    specialties: [
      "Big Data",
      "Business Intelligence",
      "Data Warehousing",
      "Analytics",
    ],
    locations: [
      {
        id: "2",
        name: "New York Office",
        address: "456 Data Street",
        city: "New York",
        state: "NY",
        country: "USA",
        postalCode: "10001",
        isHeadquarters: true,
      },
    ],
    socialLinks: {
      website: "https://datacorp.com",
      linkedin: "https://linkedin.com/company/datacorp",
    },
    benefits: [
      {
        id: "3",
        name: "Professional Development",
        description: "$3000 annual learning budget",
        category: "development",
      },
    ],
    stats: {
      totalEmployees: 500,
      totalJobs: 8,
      averageRating: 4.0,
      totalReviews: 156,
      responseRate: 78,
      avgResponseTime: 5,
      hiringGrowth: 8,
    },
    isVerified: true,
    isSponsored: true,
    createdAt: "2023-02-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "3",
    name: "GreenTech Dynamics",
    slug: "greentech-dynamics",
    description:
      "Sustainable technology solutions for a cleaner future. Specializing in renewable energy software.",
    mission:
      "To accelerate the transition to sustainable energy through innovative technology.",
    values: ["Sustainability", "Innovation", "Impact", "Collaboration"],
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&crop=center",
    coverImage:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=400&fit=crop",
    size: "startup" as CompanySize,
    type: "private",
    foundedYear: 2020,
    industry: "CleanTech",
    specialties: [
      "Renewable Energy",
      "IoT",
      "Sustainability Software",
      "Smart Grid",
    ],
    locations: [
      {
        id: "3",
        name: "Austin HQ",
        address: "789 Green Way",
        city: "Austin",
        state: "TX",
        country: "USA",
        postalCode: "73301",
        isHeadquarters: true,
      },
    ],
    socialLinks: {
      website: "https://greentechdynamics.com",
      linkedin: "https://linkedin.com/company/greentech-dynamics",
      twitter: "https://twitter.com/greentechd",
    },
    benefits: [
      {
        id: "4",
        name: "Equity Package",
        description: "Competitive equity compensation",
        category: "financial",
      },
    ],
    stats: {
      totalEmployees: 85,
      totalJobs: 12,
      averageRating: 4.5,
      totalReviews: 23,
      responseRate: 92,
      avgResponseTime: 2,
      hiringGrowth: 45,
    },
    isVerified: true,
    isSponsored: false,
    createdAt: "2023-03-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
];

// Mock Jobs Data
export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    description: `We are looking for an experienced Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies like React, Node.js, and cloud platforms.

Key Responsibilities:
• Develop and maintain web applications using React and Node.js
• Collaborate with cross-functional teams to define and implement features
• Write clean, maintainable, and efficient code
• Participate in code reviews and technical discussions
• Ensure applications are scalable and performant

What we offer:
• Competitive salary and equity package
• Comprehensive health benefits
• Flexible work arrangements
• Professional development opportunities
• Modern tech stack and tools`,
    summary:
      "Join our team as a Senior Full Stack Developer working with React, Node.js, and modern cloud technologies.",
    companyId: "1",
    companyName: "TechFlow Innovations",
    companyLogo:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center",
    type: "full-time" as JobType,
    experienceLevel: "senior-level" as ExperienceLevel,
    workLocation: "hybrid" as WorkLocation,
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA",
      isRemote: false,
    },
    salary: {
      min: 140000,
      max: 180000,
      currency: "USD",
      period: "yearly",
    },
    requirements: [
      {
        id: "1",
        type: "skill",
        name: "React",
        level: "advanced",
        required: true,
      },
      {
        id: "2",
        type: "skill",
        name: "Node.js",
        level: "advanced",
        required: true,
      },
      {
        id: "3",
        type: "experience",
        name: "5+ years experience",
        level: "advanced",
        required: true,
      },
    ],
    benefits: [
      {
        id: "1",
        name: "Health Insurance",
        description: "Full health, dental, vision",
      },
      {
        id: "2",
        name: "Remote Work",
        description: "Flexible remote options",
      },
    ],
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"],
    categories: ["Engineering", "Full Stack"],
    postedAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
    isActive: true,
    applicationsCount: 47,
    viewsCount: 234,
    featured: true,
    urgent: false,
    applicationDeadline: "2024-02-20T00:00:00Z",
  },
  {
    id: "2",
    title: "Data Analyst",
    description: `Join our data team as a Data Analyst where you'll help drive business decisions through data insights and analytics.

Responsibilities:
• Analyze large datasets to identify trends and patterns
• Create dashboards and reports for stakeholders
• Collaborate with product teams to define metrics
• Perform statistical analysis and A/B testing
• Present findings to leadership team

Requirements:
• Bachelor's degree in Statistics, Mathematics, or related field
• 3+ years of experience in data analysis
• Proficiency in SQL, Python, or R
• Experience with visualization tools like Tableau or Power BI
• Strong communication skills`,
    summary:
      "Drive business decisions through data analysis and insights using SQL, Python, and visualization tools.",
    companyId: "2",
    companyName: "DataCorp Solutions",
    companyLogo:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop&crop=center",
    type: "full-time" as JobType,
    experienceLevel: "mid-level" as ExperienceLevel,
    workLocation: "remote" as WorkLocation,
    location: {
      city: "New York",
      state: "NY",
      country: "USA",
      isRemote: true,
    },
    salary: {
      min: 85000,
      max: 115000,
      currency: "USD",
      period: "yearly",
    },
    requirements: [
      {
        id: "4",
        type: "skill",
        name: "SQL",
        level: "advanced",
        required: true,
      },
      {
        id: "5",
        type: "skill",
        name: "Python",
        level: "intermediate",
        required: true,
      },
    ],
    benefits: [
      {
        id: "3",
        name: "Learning Budget",
        description: "$3000 annual budget",
      },
    ],
    skills: ["SQL", "Python", "Tableau", "Statistics", "Excel"],
    categories: ["Data", "Analytics"],
    postedAt: "2024-01-18T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
    isActive: true,
    applicationsCount: 23,
    viewsCount: 156,
    featured: false,
    urgent: false,
  },
  {
    id: "3",
    title: "Frontend Developer - React",
    description: `We're seeking a talented Frontend Developer to join our team building the next generation of clean energy software solutions.

What you'll do:
• Build responsive web applications using React and TypeScript
• Collaborate with designers to implement pixel-perfect UIs
• Optimize applications for performance and accessibility
• Work with backend teams to integrate APIs
• Participate in agile development process

What we're looking for:
• 3+ years of frontend development experience
• Strong proficiency in React and modern JavaScript
• Experience with TypeScript, CSS-in-JS, and testing frameworks
• Understanding of web performance optimization
• Passion for clean code and user experience`,
    summary:
      "Build responsive React applications for clean energy solutions with a passionate team.",
    companyId: "3",
    companyName: "GreenTech Dynamics",
    companyLogo:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&crop=center",
    type: "full-time" as JobType,
    experienceLevel: "mid-level" as ExperienceLevel,
    workLocation: "hybrid" as WorkLocation,
    location: {
      city: "Austin",
      state: "TX",
      country: "USA",
      isRemote: false,
    },
    salary: {
      min: 95000,
      max: 125000,
      currency: "USD",
      period: "yearly",
    },
    requirements: [
      {
        id: "6",
        type: "skill",
        name: "React",
        level: "advanced",
        required: true,
      },
      {
        id: "7",
        type: "skill",
        name: "TypeScript",
        level: "intermediate",
        required: true,
      },
    ],
    benefits: [
      {
        id: "4",
        name: "Equity",
        description: "Competitive equity package",
      },
    ],
    skills: ["React", "TypeScript", "CSS", "JavaScript", "Testing"],
    categories: ["Engineering", "Frontend"],
    postedAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    isActive: true,
    applicationsCount: 31,
    viewsCount: 189,
    featured: false,
    urgent: true,
  },
  {
    id: "4",
    title: "Product Manager",
    description: `Lead product strategy and development for our AI-powered enterprise solutions.

Responsibilities:
• Define product roadmap and strategy
• Collaborate with engineering, design, and sales teams
• Conduct market research and competitive analysis
• Manage product launches and go-to-market strategy
• Analyze product metrics and user feedback

Requirements:
• 5+ years of product management experience
• Experience with B2B SaaS products
• Strong analytical and communication skills
• Technical background preferred
• MBA or equivalent experience`,
    summary:
      "Lead product strategy for AI-powered enterprise solutions with cross-functional collaboration.",
    companyId: "1",
    companyName: "TechFlow Innovations",
    companyLogo:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center",
    type: "full-time" as JobType,
    experienceLevel: "senior-level" as ExperienceLevel,
    workLocation: "on-site" as WorkLocation,
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA",
      isRemote: false,
    },
    salary: {
      min: 150000,
      max: 200000,
      currency: "USD",
      period: "yearly",
    },
    requirements: [
      {
        id: "8",
        type: "experience",
        name: "5+ years PM experience",
        level: "advanced",
        required: true,
      },
    ],
    benefits: [
      {
        id: "5",
        name: "Stock Options",
        description: "Competitive equity package",
      },
    ],
    skills: [
      "Product Management",
      "Strategy",
      "Analytics",
      "Agile",
      "Leadership",
    ],
    categories: ["Product", "Management"],
    postedAt: "2024-01-22T00:00:00Z",
    updatedAt: "2024-01-22T00:00:00Z",
    isActive: true,
    applicationsCount: 18,
    viewsCount: 98,
    featured: true,
    urgent: false,
  },
  {
    id: "5",
    title: "UX/UI Designer",
    description: `Join our design team to create beautiful and intuitive user experiences for our sustainability platform.

What you'll do:
• Design user interfaces for web and mobile applications
• Conduct user research and usability testing
• Create wireframes, prototypes, and design systems
• Collaborate with product and engineering teams
• Ensure designs are accessible and inclusive

What we're looking for:
• 4+ years of UX/UI design experience
• Proficiency in Figma, Sketch, or similar tools
• Strong portfolio demonstrating design thinking
• Experience with design systems and prototyping
• Understanding of accessibility principles`,
    summary:
      "Create beautiful and intuitive user experiences for sustainability platform applications.",
    companyId: "3",
    companyName: "GreenTech Dynamics",
    companyLogo:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&crop=center",
    type: "full-time" as JobType,
    experienceLevel: "mid-level" as ExperienceLevel,
    workLocation: "remote" as WorkLocation,
    location: {
      city: "Austin",
      state: "TX",
      country: "USA",
      isRemote: true,
    },
    salary: {
      min: 90000,
      max: 120000,
      currency: "USD",
      period: "yearly",
    },
    requirements: [
      {
        id: "9",
        type: "skill",
        name: "Figma",
        level: "advanced",
        required: true,
      },
      {
        id: "10",
        type: "experience",
        name: "4+ years UX/UI",
        level: "advanced",
        required: true,
      },
    ],
    benefits: [
      {
        id: "6",
        name: "Creative Time",
        description: "20% time for creative projects",
      },
    ],
    skills: [
      "Figma",
      "User Research",
      "Prototyping",
      "Design Systems",
      "Accessibility",
    ],
    categories: ["Design", "UX/UI"],
    postedAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
    isActive: true,
    applicationsCount: 29,
    viewsCount: 167,
    featured: false,
    urgent: false,
  },
];

// Mock User Data
export const mockUser: User = {
  id: "user-1",
  role: "job_seeker",
  profile: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    title: "Senior Frontend Developer",
    summary:
      "Passionate frontend developer with 6+ years of experience building scalable web applications.",
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA",
    },
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    portfolio: "https://johndoe.dev/portfolio",
  },
  workExperience: [
    {
      id: "1",
      companyName: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      description:
        "Led frontend development for multiple web applications using React and TypeScript.",
      startDate: "2022-01-01",
      isCurrent: true,
      location: "San Francisco, CA",
      achievements: [
        "Improved app performance by 40%",
        "Led team of 4 developers",
      ],
      skills: ["React", "TypeScript", "Next.js"],
    },
  ],
  education: [
    {
      id: "1",
      institution: "Stanford University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2014-09-01",
      endDate: "2018-06-01",
      isCurrent: false,
      gpa: 3.8,
      achievements: ["Magna Cum Laude", "Dean's List"],
    },
  ],
  skills: [
    {
      id: "1",
      name: "React",
      level: "expert",
      category: "Frontend",
      yearsOfExperience: 6,
      isEndorsed: true,
      endorsements: 15,
    },
  ],
  languages: [
    {
      id: "1",
      name: "English",
      proficiency: "native",
    },
  ],
  certificates: [],
  preferences: {
    jobTypes: ["full-time"],
    workLocation: ["remote", "hybrid"],
    industries: ["Technology", "Startups"],
    salaryMin: 120000,
    salaryMax: 180000,
    locations: ["San Francisco, CA", "New York, NY"],
    remoteWork: true,
    willingToRelocate: false,
    availabilityDate: "2024-03-01",
    emailNotifications: {
      jobAlerts: true,
      applicationUpdates: true,
      companyUpdates: false,
      newsletter: true,
    },
  },
  profileCompletion: "complete",
  profileCompletionScore: 85,
  isProfilePublic: true,
  isEmailVerified: true,
  isPremium: false,
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2024-01-15T00:00:00Z",
  lastLoginAt: "2024-01-28T00:00:00Z",
};

// Mock Applications Data
export const mockApplications: Application[] = [
  {
    id: "app-1",
    userId: "user-1",
    jobId: "1",
    job: {
      id: "1",
      title: "Senior Full Stack Developer",
      companyName: "TechFlow Innovations",
      companyLogo:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: {
        min: 140000,
        max: 180000,
        currency: "USD",
      },
    },
    status: "interview_scheduled" as ApplicationStatus,
    appliedAt: "2024-01-22T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
    coverLetter:
      "I am excited to apply for the Senior Full Stack Developer position...",
    documents: [
      {
        id: "doc-1",
        name: "John_Doe_Resume.pdf",
        type: "resume",
        url: "/documents/resume.pdf",
        size: 245760,
        uploadedAt: "2024-01-22T00:00:00Z",
      },
    ],
    notes: [],
    interviews: [
      {
        id: "int-1",
        type: "video",
        title: "Technical Interview",
        scheduledAt: "2024-02-01T15:00:00Z",
        duration: 60,
        meetingUrl: "https://zoom.us/j/123456789",
        interviewers: [
          {
            id: "int-1",
            name: "Sarah Johnson",
            title: "Engineering Manager",
            email: "sarah@techflow.com",
          },
        ],
        status: "scheduled",
      },
    ],
    timeline: [
      {
        id: "tl-1",
        status: "submitted",
        timestamp: "2024-01-22T00:00:00Z",
        description: "Application submitted",
        performer: {
          id: "user-1",
          name: "John Doe",
          role: "applicant",
        },
      },
      {
        id: "tl-2",
        status: "under_review",
        timestamp: "2024-01-23T10:00:00Z",
        description: "Application under review",
        performer: {
          id: "hr-1",
          name: "HR Team",
          role: "system",
        },
      },
      {
        id: "tl-3",
        status: "interview_scheduled",
        timestamp: "2024-01-25T14:00:00Z",
        description: "Technical interview scheduled",
        performer: {
          id: "rec-1",
          name: "Sarah Johnson",
          role: "recruiter",
        },
      },
    ],
    isUrgent: false,
    priority: "high",
    tags: ["frontend", "full-stack"],
    customFields: {},
  },
  {
    id: "app-2",
    userId: "user-1",
    jobId: "3",
    job: {
      id: "3",
      title: "Frontend Developer - React",
      companyName: "GreenTech Dynamics",
      companyLogo:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&crop=center",
      location: "Austin, TX",
      type: "Full-time",
      salary: {
        min: 95000,
        max: 125000,
        currency: "USD",
      },
    },
    status: "under_review" as ApplicationStatus,
    appliedAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-21T00:00:00Z",
    coverLetter:
      "I am passionate about clean technology and would love to contribute...",
    documents: [
      {
        id: "doc-2",
        name: "John_Doe_Resume.pdf",
        type: "resume",
        url: "/documents/resume.pdf",
        size: 245760,
        uploadedAt: "2024-01-20T00:00:00Z",
      },
    ],
    notes: [],
    interviews: [],
    timeline: [
      {
        id: "tl-4",
        status: "submitted",
        timestamp: "2024-01-20T00:00:00Z",
        description: "Application submitted",
        performer: {
          id: "user-1",
          name: "John Doe",
          role: "applicant",
        },
      },
      {
        id: "tl-5",
        status: "under_review",
        timestamp: "2024-01-21T09:00:00Z",
        description: "Application under review",
        performer: {
          id: "hr-2",
          name: "HR Team",
          role: "system",
        },
      },
    ],
    isUrgent: false,
    priority: "medium",
    tags: ["frontend", "react"],
    customFields: {},
  },
];

// Categories and Skills Data
export const jobCategories = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Data",
  "Operations",
  "Finance",
  "HR",
  "Customer Success",
  "DevOps",
  "QA",
  "Research",
  "Legal",
  "Consulting",
];

export const jobSkills = [
  "React",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Python",
  "Java",
  "Go",
  "Rust",
  "AWS",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Figma",
  "Sketch",
  "Adobe Creative Suite",
  "Prototyping",
  "Product Management",
  "Agile",
  "Scrum",
  "Analytics",
  "SQL",
  "Machine Learning",
  "Data Analysis",
  "Statistics",
  "Marketing",
  "SEO",
  "Content Marketing",
  "Social Media",
  "Sales",
  "CRM",
  "Lead Generation",
  "Business Development",
];

export const locations = [
  "San Francisco, CA",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Austin, TX",
  "Seattle, WA",
  "Boston, MA",
  "Denver, CO",
  "Atlanta, GA",
  "Miami, FL",
  "Remote",
];

// Featured Companies for homepage
export const featuredCompanies = mockCompanies.slice(0, 6);

// Recent Jobs for homepage
export const recentJobs = mockJobs.slice(0, 6);

// Popular searches
export const popularSearches = [
  "Remote Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "Frontend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Marketing Manager",
];
