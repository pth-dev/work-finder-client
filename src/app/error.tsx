"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { PUBLIC_ROUTES } from "@/constants/routes";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600">
              We encountered an unexpected error. Don&apos;t worry, our team has
              been notified.
            </p>
          </div>
        </div>

        {/* Error details in development */}
        {process.env.NODE_ENV === "development" && (
          <details className="text-left bg-gray-100 p-4 rounded-lg">
            <summary className="cursor-pointer font-medium text-sm text-gray-700 mb-2">
              Error Details (Development Only)
            </summary>
            <div className="text-xs text-red-600 font-mono bg-white p-2 rounded border overflow-auto max-h-32">
              <div className="font-semibold mb-1">Error: {error.message}</div>
              {error.digest && (
                <div className="text-gray-500 mb-1">Digest: {error.digest}</div>
              )}
              {error.stack && (
                <pre className="whitespace-pre-wrap text-xs">{error.stack}</pre>
              )}
            </div>
          </details>
        )}

        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>

          <Button
            variant="outline"
            asChild
            className="w-full flex items-center justify-center space-x-2"
          >
            <Link href={PUBLIC_ROUTES.HOME}>
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </Link>
          </Button>
        </div>

        <div className="text-xs text-gray-500">
          If this problem persists, please{" "}
          <Link
            href={PUBLIC_ROUTES.CONTACT}
            className="text-blue-600 hover:text-blue-700 underline"
          >
            contact our support team
          </Link>
        </div>
      </div>
    </div>
  );
}
