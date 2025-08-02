import React from "react";
import { AlertCircle, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { Button } from "./button";

export interface ErrorStateProps {
  type?: "network" | "server" | "not-found" | "generic";
  title?: string;
  message?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  className?: string;
}

const ERROR_CONFIGS = {
  network: {
    icon: WifiOff,
    title: "Không thể kết nối",
    message: "Vui lòng kiểm tra kết nối mạng và thử lại.",
    color: "text-orange-500",
  },
  server: {
    icon: AlertCircle,
    title: "Lỗi máy chủ",
    message: "Đã xảy ra lỗi từ phía máy chủ. Vui lòng thử lại sau.",
    color: "text-red-500",
  },
  "not-found": {
    icon: AlertCircle,
    title: "Không tìm thấy dữ liệu",
    message: "Không có dữ liệu để hiển thị.",
    color: "text-gray-500",
  },
  generic: {
    icon: AlertCircle,
    title: "Đã xảy ra lỗi",
    message: "Vui lòng thử lại sau hoặc liên hệ hỗ trợ.",
    color: "text-red-500",
  },
};

export const ErrorState: React.FC<ErrorStateProps> = ({
  type = "generic",
  title,
  message,
  showRetry = true,
  onRetry,
  className = "",
}) => {
  const config = ERROR_CONFIGS[type];
  const IconComponent = config.icon;

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={`text-center py-12 ${className}`}>
      <IconComponent className={`h-12 w-12 mx-auto mb-4 ${config.color}`} />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title || config.title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {message || config.message}
      </p>
      {showRetry && (
        <Button onClick={handleRetry} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Thử lại
        </Button>
      )}
    </div>
  );
};

// Wrapper cho section error state
export const ErrorSection: React.FC<ErrorStateProps & { sectionClassName?: string }> = ({
  sectionClassName = "py-16 px-4 bg-gray-50",
  ...props
}) => {
  return (
    <section className={sectionClassName}>
      <div className="container mx-auto max-w-7xl">
        <ErrorState {...props} />
      </div>
    </section>
  );
};
