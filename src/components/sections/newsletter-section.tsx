import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#1967d2]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              New Things Will Always Update Regularly
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Subscribe to our newsletter and get notified about new job
              openings, career tips, and industry insights.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#696969]" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="pl-10 h-12 bg-white border-white text-[#202124] placeholder:text-[#696969]"
                />
              </div>
              <Button className="h-12 px-8 bg-[#f9ab00] hover:bg-[#e69500] text-white font-medium">
                Subscribe
              </Button>
            </div>

            <p className="text-sm text-blue-100 mt-4">
              We care about your data. Read our{" "}
              <a href="#" className="underline hover:text-white">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-12 border-t border-blue-400">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">25K+</div>
              <div className="text-blue-100 text-sm">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-blue-100 text-sm">Open Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">Daily</div>
              <div className="text-blue-100 text-sm">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">Free</div>
              <div className="text-blue-100 text-sm">Forever</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
