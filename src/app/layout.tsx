import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import { LanguageLoadingHandler } from "@/components/ui/language-loading";
import { AuthDebug } from "@/components/debug/auth-debug";
import "@/utils/auth-test"; // Import test utilities
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Work Finder - Find Your Dream Job",
  description:
    "Discover thousands of job opportunities and connect with top employers. Your next career move starts here.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${jost.variable} antialiased font-jost`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <AuthProvider>
              <LanguageLoadingHandler />
              <ConditionalLayout>{children}</ConditionalLayout>
              <Toaster
                position="top-right"
                richColors
                closeButton
                duration={4000}
              />
              <AuthDebug />
            </AuthProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
