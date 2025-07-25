"use client";

import { Button } from "@/components/ui/button";
import { Search, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PUBLIC_ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/useTranslation";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="space-y-4">
          <div className="text-6xl font-bold text-gray-300">404</div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {t("notFound.title")}
            </h1>
            <p className="text-gray-600">{t("notFound.description")}</p>
          </div>
        </div>

        {/* Search Suggestions */}
        <div className="bg-white p-6 rounded-lg border space-y-4">
          <h2 className="font-medium text-gray-900">What you can do:</h2>
          <ul className="text-sm text-gray-600 space-y-2 text-left">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Check the URL for any typos</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Go back to the previous page</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Search for jobs or companies</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Visit our homepage</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            asChild
            className="w-full flex items-center justify-center space-x-2"
          >
            <Link href={PUBLIC_ROUTES.HOME}>
              <Home className="w-4 h-4" />
              <span>Go to Homepage</span>
            </Link>
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              asChild
              className="flex items-center justify-center space-x-2"
            >
              <Link href={PUBLIC_ROUTES.JOBS}>
                <Search className="w-4 h-4" />
                <span>Find Jobs</span>
              </Link>
            </Button>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </Button>
          </div>
        </div>

        {/* Popular Links */}
        <div className="text-sm">
          <p className="text-gray-500 mb-3">{t("notFound.popularPages")}</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href={PUBLIC_ROUTES.JOBS}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              {t("notFound.browseJobs")}
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href={PUBLIC_ROUTES.COMPANIES}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              {t("notFound.companies")}
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href={PUBLIC_ROUTES.SALARY}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              {t("notFound.salaryGuide")}
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href={PUBLIC_ROUTES.CONTACT}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              {t("notFound.contactUs")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
