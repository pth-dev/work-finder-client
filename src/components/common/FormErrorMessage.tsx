import { cn } from "@/lib/utils";

interface FormErrorMessageProps {
  message?: string;
  className?: string;
  icon?: boolean;
}

export function FormErrorMessage({
  message,
  className,
  icon = true,
}: FormErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "bg-red-50 border border-red-200 rounded-lg p-3 w-full",
        className
      )}
    >
      <div className="flex items-center">
        {icon && (
          <svg
            className="h-4 w-4 text-red-400 mr-2 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  );
}
