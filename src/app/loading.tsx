import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <div className="space-y-2">
          <h2 className="text-lg font-medium text-gray-900">Loading...</h2>
          <p className="text-sm text-gray-600">
            Please wait while we load the content
          </p>
        </div>
      </div>
    </div>
  );
}
