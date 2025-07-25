"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface JobActionsProps {
  jobId: string;
  onViewDetails?: (id: string) => void;
  onApply?: (id: string) => void;
}

export function JobActions({ jobId, onViewDetails, onApply }: JobActionsProps) {
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async (id: string) => {
    setIsApplying(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Application submitted successfully!");
      onApply?.(id);
    } catch (error) {
      toast.error("Failed to submit application");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="border-t border-[#ECEDF2] p-4 flex items-center justify-between">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onViewDetails?.(jobId)}
        className="border-[#ECEDF2] text-[#696969] hover:text-[#1967D2]"
      >
        View Details
      </Button>

      <Button
        size="sm"
        onClick={() => handleApply(jobId)}
        className="bg-[#1967D2] hover:bg-[#1967D2]/90 text-white"
        disabled={isApplying}
      >
        {isApplying ? "Applying..." : "Apply Now"}
      </Button>
    </div>
  );
}
