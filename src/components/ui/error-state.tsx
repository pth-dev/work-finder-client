import React from "react";
import { AlertCircle, RefreshCw, WifiOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./button";

export interface ErrorAction {
  label: string;
  onClick: () => void;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link";
  icon?: React.ReactNode;
}

export interface ErrorStateProps {
  type?: "network" | "server" | "not-found" | "generic" | "invalid-id";
  title?: string;
  message?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  actions?: ErrorAction[];
  className?: string;
  iconSize?: "sm" | "md" | "lg";
}

const ERROR_CONFIGS = {
  network: {
    icon: WifiOff,
    color: "text-orange-500",
  },
  server: {
    icon: AlertCircle,
    color: "text-red-500",
  },
  "not-found": {
    icon: AlertCircle,
    color: "text-gray-500",
  },
  "invalid-id": {
    icon: AlertCircle,
    color: "text-gray-400",
  },
  generic: {
    icon: AlertCircle,
    color: "text-red-500",
  },
};

export const ErrorState: React.FC<ErrorStateProps> = ({
  type = "generic",
  title,
  message,
  showRetry = true,
  onRetry,
  actions = [],
  className = "",
  iconSize = "md",
}) => {
  const { t } = useTranslation();
  const config = ERROR_CONFIGS[type];
  const IconComponent = config.icon;

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  // Get translation key based on type
  const getErrorKey = (type: string) => {
    switch (type) {
      case "not-found":
        return "notFound";
      case "invalid-id":
        return "invalidId";
      default:
        return type;
    }
  };

  const errorKey = getErrorKey(type);
  const defaultTitle = t(`common:errorStates.${errorKey}.title`);
  const defaultMessage = t(`common:errorStates.${errorKey}.message`);

  // Icon size classes
  const iconSizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className={`text-center py-12 ${className}`}>
      <IconComponent
        className={`${iconSizeClasses[iconSize]} mx-auto mb-4 ${config.color}`}
      />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title || defaultTitle}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {message || defaultMessage}
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {showRetry && (
          <Button onClick={handleRetry} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {t("common:ui.retry")}
          </Button>
        )}

        {actions.map((action, index) => (
          <Button
            key={index}
            onClick={action.onClick}
            variant={action.variant || "default"}
            className="gap-2"
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

// Wrapper cho section error state
export const ErrorSection: React.FC<
  ErrorStateProps & { sectionClassName?: string }
> = ({ sectionClassName = "py-16 px-4 bg-gray-50", ...props }) => {
  return (
    <section className={sectionClassName}>
      <div className="container mx-auto max-w-7xl">
        <ErrorState {...props} />
      </div>
    </section>
  );
};

// Wrapper cho full-screen error state
export const FullScreenErrorState: React.FC<ErrorStateProps> = (props) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-4">
        <ErrorState {...props} iconSize="lg" className="py-8" />
      </div>
    </div>
  );
};
