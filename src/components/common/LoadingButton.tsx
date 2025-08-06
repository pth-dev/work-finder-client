import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

/**
 * Reusable loading button component with spinner
 * Follows DRY principle to avoid duplicating loading button logic
 */
export function LoadingButton({
  loading = false,
  loadingText = "Đang tải...",
  children,
  className,
  disabled,
  type = "button",
  onClick,
}: LoadingButtonProps) {
  return (
    <Button
      type={type}
      disabled={loading || disabled}
      className={cn(
        "w-full h-12 lg:h-14 bg-[#2971ff] hover:bg-[#1967d2] text-white font-semibold text-sm lg:text-base rounded-lg",
        className
      )}
      onClick={onClick}
    >
      {loading ? (
        <div className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {loadingText}
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
