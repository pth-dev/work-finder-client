"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const scrollToTop = () => {
    if (isHydrated && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const footerLinks = {
    forCandidates: {
      title: "For Candidates",
      links: [
        { label: "Browse Jobs", href: "/jobs" },
        { label: "Browse Categories", href: "/categories" },
        { label: "Candidate Dashboard", href: "/candidate/dashboard" },
        { label: "Job Alerts", href: "/job-alerts" },
        { label: "My Bookmarks", href: "/bookmarks" },
      ],
    },
    forEmployers: {
      title: "For Employers",
      links: [
        { label: "Browse Candidates", href: "/candidates" },
        { label: "Employer Dashboard", href: "/employer/dashboard" },
        { label: "Add Job", href: "/employer/add-job" },
        { label: "Job Packages", href: "/employer/packages" },
      ],
    },
    aboutUs: {
      title: "About Us",
      links: [
        { label: "Job Page", href: "/jobs" },
        { label: "Job Page Alternative", href: "/jobs/alternative" },
        { label: "Resume Page", href: "/resume" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    helpfulResources: {
      title: "Helpful Resources",
      links: [
        { label: "Site Map", href: "/sitemap" },
        { label: "Terms of Use", href: "/terms" },
        { label: "Privacy Center", href: "/privacy" },
        { label: "Security Center", href: "/security" },
        { label: "Accessibility Center", href: "/accessibility" },
      ],
    },
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Superio</span>
            </Link>

            <div className="space-y-4 text-gray-600">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Call us</h4>
                <p className="text-blue-600 font-medium">123 456 7890</p>
              </div>

              <div>
                <p className="text-sm leading-relaxed">
                  329 Queensberry Street, North Melbourne VIC 3051,
                  <br />
                  Australia.
                </p>
              </div>

              <div>
                <p className="text-sm">
                  <Link
                    href="mailto:support@superio.com"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    support@superio.com
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* For Candidates */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">
              {footerLinks.forCandidates.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.forCandidates.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">
              {footerLinks.forEmployers.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.forEmployers.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">
              {footerLinks.aboutUs.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.aboutUs.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpful Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">
              {footerLinks.helpfulResources.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.helpfulResources.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2023 Superio. All Right Reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  aria-label={social.label}
                >
                  <IconComponent className="w-5 h-5" />
                </Link>
              );
            })}

            {/* Scroll to Top Button */}
            <Button
              onClick={scrollToTop}
              variant="ghost"
              size="sm"
              className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
