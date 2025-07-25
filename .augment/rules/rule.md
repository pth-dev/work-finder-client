---
type: "manual"
---

no demo page , Core Framework Requirements

Always use Next.js 14 App Router (not Pages Router) for all new features
Default to Server Components unless client-side interactivity is explicitly required
Use TypeScript for all components, pages, API routes, and utilities
Follow the app directory structure with proper file conventions (page.tsx, layout.tsx, loading.tsx, error.tsx)
Implement React Server Components patterns and avoid unnecessary client components

Project Structure & Organization

Place page components in app/[route]/page.tsx files
Use layout.tsx files for shared layouts and nested layouts
Create reusable components in /components directory with proper TypeScript interfaces
Organize API routes in app/api directory following RESTful conventions
Use /lib directory for utilities, database connections, and shared logic
Store types and interfaces in /types directory or co-located with components

Performance & Optimization

Always use Next.js Image component with proper width, height, and alt attributes
Implement proper metadata using the Metadata API for SEO optimization
Prefer Static Site Generation (SSG) with generateStaticParams for dynamic routes
Use dynamic imports with Next.js dynamic() for code splitting when needed
Implement proper loading states with loading.tsx and Suspense boundaries
Use proper error boundaries with error.tsx files

Data Fetching Patterns

Use async Server Components for data fetching on the server
Implement proper error handling with try/catch blocks
Use fetch() with Next.js caching strategies (force-cache, no-store, revalidate)
For client-side data fetching, use React Query or SWR with proper TypeScript types
Implement proper loading and error states for all data fetching scenarios

Styling & UI Guidelines

Use Tailwind CSS utility classes for styling (avoid custom CSS unless necessary)
Implement responsive design with Tailwind's responsive prefixes (sm:, md:, lg:, xl:)
Create consistent design tokens for colors, spacing, and typography
Use shadcn/ui components when available and customize with CSS variables
Implement dark mode support using next-themes or Tailwind's dark: prefix

API Development

Create API routes in app/api directory with proper HTTP methods
Use Zod for request validation and TypeScript type generation
Implement proper error handling with appropriate HTTP status codes
Use middleware for authentication, CORS, and request validation
Follow RESTful API design principles with proper resource naming

Authentication & Security

Implement authentication using NextAuth.js v5 (Auth.js) or similar
Use middleware.ts for route protection and authentication checks
Secure API routes with proper authentication and authorization checks
Implement CSRF protection and rate limiting for sensitive endpoints
Use environment variables for all sensitive configuration

Code Quality & Testing

Write comprehensive TypeScript interfaces and types for all data structures
Use ESLint and Prettier with Next.js recommended configurations
Implement unit tests for utilities and integration tests for API routes
Use React Testing Library for component testing
Follow consistent naming conventions (camelCase for variables, PascalCase for components)

Development Workflow

Always run the development server and test changes before completion
Use Next.js built-in TypeScript checking and fix all type errors
Implement proper error handling and user feedback for all user interactions
Test responsive design across different screen sizes
Verify that all images, links, and interactive elements work correctly

Deployment & Production

Optimize bundle size and check for unnecessary dependencies
Implement proper environment variable configuration for different stages
Use Next.js built-in analytics and performance monitoring
Configure proper caching headers for static assets
Implement proper sitemap.xml and robots.txt generation

Common Anti-patterns to Avoid

Don't use client components unnecessarily (avoid "use client" unless required)
Don't use deprecated Next.js features from previous versions
Avoid mixing Server and Client Component patterns incorrectly
Don't implement custom routing when Next.js file-based routing suffices
Avoid using useState for data that should be managed server-side
Don't skip proper TypeScript typing for quick fixes

Debugging & Troubleshooting

Use Next.js built-in error reporting and debugging tools
Implement proper logging for server-side operations
Use React DevTools and Next.js DevTools for component debugging
Check Network tab for API calls and performance issues
Verify hydration issues between server and client renderin
