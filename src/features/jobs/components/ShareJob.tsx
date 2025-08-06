import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Share2, Copy, Check, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components";
import { JobSection } from "./JobSection";

interface ShareJobProps {
  jobTitle: string;
  jobUrl?: string;
}

export function ShareJob({
  jobTitle,
  jobUrl = window.location.href,
}: ShareJobProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(jobUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleSocialShare = (platform: "facebook" | "twitter" | "linkedin") => {
    const encodedUrl = encodeURIComponent(jobUrl);
    const encodedTitle = encodeURIComponent(`Check out this job: ${jobTitle}`);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <JobSection title={t("jobs.details.shareJob")}>
      <div className="space-y-4">
        {/* Copy link section */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={jobUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="flex items-center gap-2 border-[#1967D2] text-[#1967D2] hover:bg-[#1967D2] hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  {t("jobs.details.copied")}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  {t("jobs.details.copy")}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Social media sharing */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#202124]">
            {t("jobs.details.shareOnSocialMedia")}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSocialShare("facebook")}
              className="flex items-center gap-2 bg-[#1877F2] text-white border-[#1877F2] hover:bg-[#166FE5]"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSocialShare("twitter")}
              className="flex items-center gap-2 bg-[#1DA1F2] text-white border-[#1DA1F2] hover:bg-[#1A91DA]"
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSocialShare("linkedin")}
              className="flex items-center gap-2 bg-[#0A66C2] text-white border-[#0A66C2] hover:bg-[#095BB0]"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </JobSection>
  );
}
