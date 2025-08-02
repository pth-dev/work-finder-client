import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

// Toast service that integrates with i18n
export class ToastService {
  private static t: (key: string, options?: any) => string;

  static init(translateFn: (key: string, options?: any) => string) {
    ToastService.t = translateFn;
  }

  static success(messageKey: string, options?: { data?: any }) {
    const message = ToastService.t ? ToastService.t(messageKey, options?.data) : messageKey;
    toast.success(message);
  }

  static error(messageKey: string, options?: { data?: any }) {
    const message = ToastService.t ? ToastService.t(messageKey, options?.data) : messageKey;
    toast.error(message);
  }

  static info(messageKey: string, options?: { data?: any }) {
    const message = ToastService.t ? ToastService.t(messageKey, options?.data) : messageKey;
    toast.info(message);
  }

  static warning(messageKey: string, options?: { data?: any }) {
    const message = ToastService.t ? ToastService.t(messageKey, options?.data) : messageKey;
    toast.warning(message);
  }

  // For loading states (though we're using global loading now)
  static loading(messageKey: string, options?: { data?: any }) {
    const message = ToastService.t ? ToastService.t(messageKey, options?.data) : messageKey;
    return toast.loading(message);
  }

  static dismiss(toastId?: string | number) {
    toast.dismiss(toastId);
  }
}

// React hook for easier usage in components
export const useToast = () => {
  const { t } = useTranslation();
  
  // Initialize the service with current translation function
  ToastService.init(t);

  return {
    success: (messageKey: string, data?: any) => ToastService.success(messageKey, { data }),
    error: (messageKey: string, data?: any) => ToastService.error(messageKey, { data }),
    info: (messageKey: string, data?: any) => ToastService.info(messageKey, { data }),
    warning: (messageKey: string, data?: any) => ToastService.warning(messageKey, { data }),
    loading: (messageKey: string, data?: any) => ToastService.loading(messageKey, { data }),
    dismiss: ToastService.dismiss,
  };
};