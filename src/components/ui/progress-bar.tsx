import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
  label,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        {label && (
          <span className="text-[15px] font-normal text-[#202124]">
            {label}
          </span>
        )}
        {showLabel && (
          <span className="text-[15px] font-normal text-[#202124]">
            {percentage.toFixed(0)}%
          </span>
        )}
      </div>
      <div className="w-[568px] h-2.5 bg-[#d4e1f6] rounded-[10px] overflow-hidden">
        <div
          className="h-full bg-[#1967d2] rounded-[10px] transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
