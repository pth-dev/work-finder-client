"use client";

import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBoxProps {
  type: "info" | "warning" | "error" | "success";
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const messageBoxStyles = {
  info: "bg-[#cde9f6] text-[#4780aa]",
  warning: "bg-[#f7f3d7] text-[#927238]",
  error: "bg-[#ecc8c5] text-[#ab3331]",
  success: "bg-[#def2d7] text-[#5b7052]",
};

const iconColors = {
  info: "text-[#4780aa]",
  warning: "text-[#927238]",
  error: "text-[#ab3331]",
  success: "text-[#5b7052]",
};

export function MessageBox({
  type,
  title,
  children,
  onClose,
  className,
}: MessageBoxProps) {
  return (
    <div
      className={cn(
        "rounded h-[75px] px-[29px] py-[17px] flex items-center justify-between w-[570px] relative",
        messageBoxStyles[type],
        className
      )}
    >
      <div className="font-normal text-[15px] leading-[normal] flex-1">
        {title && <h4 className="font-medium mb-1 text-[15px]">{title}</h4>}
        <div className="text-[15px]">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={cn(
            "shrink-0 w-[21.92px] h-[21.92px] flex items-center justify-center rotate-45 hover:bg-black/10 transition-colors",
            iconColors[type]
          )}
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
