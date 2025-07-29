import React, { Suspense, ReactNode } from 'react';

interface LoadingSuspenseProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// Loading skeleton components
export const JobCardSkeleton = () => (
  <div className="border-0 shadow-md bg-white rounded-lg p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        <div>
          <div className="w-32 h-5 bg-gray-200 rounded mb-2"></div>
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
    </div>
    
    <div className="space-y-3 mb-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
    
    <div className="w-full h-10 bg-gray-200 rounded mb-4"></div>
    <div className="flex gap-2 mb-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="w-16 h-6 bg-gray-200 rounded"></div>
      ))}
    </div>
    <div className="w-full h-10 bg-gray-200 rounded"></div>
  </div>
);

export const CompanyCardSkeleton = () => (
  <div className="border-0 shadow-md bg-white rounded-lg p-6 animate-pulse">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
      <div className="flex-1">
        <div className="w-32 h-6 bg-gray-200 rounded mb-2"></div>
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
    
    <div className="space-y-2 mb-4">
      <div className="w-full h-4 bg-gray-200 rounded"></div>
      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
    </div>
    
    <div className="flex gap-2 mb-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="w-16 h-6 bg-gray-200 rounded"></div>
      ))}
    </div>
    
    <div className="w-full h-10 bg-gray-200 rounded"></div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 px-4 animate-pulse">
    <div className="container mx-auto max-w-4xl text-center">
      <div className="w-96 h-12 bg-white/20 rounded mx-auto mb-6"></div>
      <div className="w-80 h-6 bg-white/20 rounded mx-auto mb-8"></div>
      
      <div className="max-w-2xl mx-auto bg-white/10 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 h-12 bg-white/20 rounded"></div>
          <div className="flex-1 h-12 bg-white/20 rounded"></div>
          <div className="w-32 h-12 bg-white/20 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

// Default fallback component
const DefaultFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2 text-gray-600">Loading...</span>
  </div>
);

// Generic suspense wrapper
export const LoadingSuspense: React.FC<LoadingSuspenseProps> = ({ 
  children, 
  fallback = <DefaultFallback /> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

// Specialized suspense wrappers
export const JobListSuspense: React.FC<{ children: ReactNode }> = ({ children }) => {
  const fallback = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  );
  
  return <LoadingSuspense fallback={fallback}>{children}</LoadingSuspense>;
};

export const CompanyListSuspense: React.FC<{ children: ReactNode }> = ({ children }) => {
  const fallback = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <CompanyCardSkeleton key={index} />
      ))}
    </div>
  );
  
  return <LoadingSuspense fallback={fallback}>{children}</LoadingSuspense>;
};

export const HeroSuspense: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <LoadingSuspense fallback={<HeroSkeleton />}>{children}</LoadingSuspense>;
};