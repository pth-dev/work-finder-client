import * as React from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

import { paths } from "@/config/paths";
import { useAuthStore } from "@/stores";
import LoginImage from "@/assets/Login.svg";
type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
};

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // If there's a specific redirectTo, use it
      if (redirectTo) {
        navigate(redirectTo, { replace: true });
        return;
      }

      // Default redirect based on user role
      if (user?.role === 'job_seeker') {
        navigate(paths.home.getHref(), { replace: true });
      } else {
        navigate(paths.app.dashboard.getHref(), { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, redirectTo]);

  return (
    <div
      className="overflow-clip relative rounded-2xl min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), linear-gradient(270deg, rgb(239, 241, 245) 31.806%, rgb(240, 242, 246) 48.854%, rgb(236, 240, 244) 66.558%, rgb(225, 233, 241) 82.624%, rgb(210, 223, 239) 100%)",
      }}
    >
      {/* Left Panel - Login Image (Hidden on mobile) */}
      <div className="hidden lg:absolute lg:box-border lg:flex lg:flex-col lg:h-full lg:items-start lg:justify-start lg:left-0 lg:top-0 lg:w-[60%] xl:w-[65%] 2xl:w-[70%] lg:p-5">
        <div className="flex-1 w-full h-full flex items-center justify-center">
          <img
            src={LoginImage}
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-[20px]"
          />
        </div>
      </div>

      {/* Right Panel - Authentication Form */}
      <div className="bg-[#ffffff] box-border flex flex-col gap-9 h-full items-center justify-center overflow-clip px-6 py-16 w-full lg:absolute lg:px-10 lg:py-32 lg:right-0 lg:top-0 lg:w-[40%] xl:w-[35%] 2xl:w-[30%] lg:min-w-[400px] xl:min-w-[480px]">
        <div className="box-border flex flex-col gap-6 items-center lg:items-start justify-start p-0 relative shrink-0">
          {/* Logo */}
          <Link 
            to={paths.home.getHref()}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            aria-label="WorkFinder Home"
          >
            <div className="relative size-10 lg:size-12">
              <img
                src="/icon.svg"
                alt="WorkFinder Logo"
                className="block max-w-none size-full"
              />
            </div>
            <div className="font-medium text-[20px] lg:text-[25px] text-[#202124]">
              <p className="font-bold leading-[normal]">
                <span className="text-[#1967d2]">Work</span>
                <span className="text-[#4a5568]">Finder</span>
              </p>
            </div>
          </Link>

          {/* Header */}
          <div className="box-border flex flex-col gap-1 items-center lg:items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#36363a] text-center lg:text-left">
            <div className="flex flex-col font-semibold justify-center relative shrink-0 text-[18px] lg:text-[20px] text-nowrap">
              <p className="block leading-[normal] whitespace-pre">{title}</p>
            </div>
            {subtitle && (
              <div className="flex flex-col font-medium justify-center relative shrink-0 text-[12px] lg:text-[14px] w-full max-w-[385px] px-4 lg:px-0">
                <p className="block leading-[normal]">{subtitle}</p>
              </div>
            )}
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg">{children}</div>
      </div>
    </div>
  );
};
