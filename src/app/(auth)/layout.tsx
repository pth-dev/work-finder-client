import { Metadata } from "next";
import Image from "next/image";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthLoading } from "@/components/auth/auth-loading";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: {
      template: "%s - Work Finder",
      default: t("authTitle"),
    },
    description: t("authDescription"),
  };
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLoading>
      <div className="min-h-screen flex">
        {/* Left Side: Illustration (Desktop only) - Fixed position */}
        <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 fixed left-0 top-0 h-screen items-center justify-center">
          <Image
            src="/auth/Login.svg"
            alt="Work Finder Illustration"
            width={895}
            height={860}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Right Side: Form (Full width on mobile, 2/5 on desktop) - Scrollable */}
        <div className="w-full lg:w-2/5 lg:ml-[60%] min-h-screen overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center px-4 py-4 lg:px-6">
            <div className="max-w-md w-full">
              {/* Logo with Page Title */}
              <AuthHeader />

              {/* Auth Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 lg:p-5 transition-all duration-300 hover:shadow-2xl">
                {children}
              </div>

              {/* Mobile: Illustration at bottom */}
              <div className="lg:hidden mt-8 text-center">
                <Image
                  src="/auth/Login.svg"
                  alt="Work Finder Illustration"
                  width={320}
                  height={300}
                  className="w-80 h-auto mx-auto opacity-80"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          {/* <div className="mt-8 text-center text-sm text-gray-600">
          <p>© 2024 Work Finder. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link
              href="/privacy"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/terms"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div> */}
        </div>
      </div>
    </AuthLoading>
  );
}
