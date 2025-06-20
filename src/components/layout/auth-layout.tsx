import React from "react";
import { Outlet } from "react-router-dom";
import authBg from "../../assets/img/auth_bg.png";

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between">
          {/* Logo - Always visible on blue background */}
          <div className="flex items-center space-x-2 lg:w-2/5">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <img src="./logo.png" alt="logo" className="w-6 h-6" />
            </div>
            <span className="text-white font-semibold text-lg">WorkFinder</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen flex">
        {/* Left Side - Background Image (40% width) */}
        <div
          className="hidden lg:flex lg:w-2/5 relative overflow-hidden"
          style={{
            backgroundImage: `url(${authBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Optional overlay for better contrast if needed */}
          <div className="absolute inset-0 bg-black/5"></div>
        </div>

        {/* Right Side - Form Area (60% width) */}
        <div className="w-full lg:w-3/5 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
