export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header Skeleton */}
        <div className="text-center space-y-4">
          <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse" />
        </div>

        {/* Card Skeleton */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          {/* Card Header */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
            </div>

            {/* Additional fields for register */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Remember me / Terms */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
          </div>

          {/* Submit Button */}
          <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Back to homepage */}
        <div className="text-center">
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}
