"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);

  // Prevent hydration mismatch by only checking pathname after mount
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Check if current path is an auth route
  const isAuthRoute =
    isHydrated &&
    (pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/forgot-password") ||
      pathname.startsWith("/verify-email") ||
      pathname.startsWith("/reset-password"));

  // During hydration, always render with Header/Footer to match server
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 relative pt-16 lg:pt-0">{children}</main>
        <Footer />
      </div>
    );
  }

  // For auth routes, return children without Header/Footer
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // For all other routes, include Header and Footer
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 relative pt-16 lg:pt-0">{children}</main>
      <Footer />
    </div>
  );
}
