import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  uploadAvatar,
  getNotificationSettings,
  updateNotificationSettings,
  getPrivacySettings,
  updatePrivacySettings,
  deleteAccount,
} from "../api";
import {
  UpdateProfileData,
  ChangePasswordData,
  NotificationSettings,
  PrivacySettings,
} from "../types";
import { toast } from "react-hot-toast";

// Hook to get user profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to update profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileData) => updateUserProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });
};

// Hook to change password
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => changePassword(data),
    onSuccess: () => {
      toast.success("Password changed successfully!");
    },
    onError: () => {
      toast.error("Failed to change password");
    },
  });
};

// Hook to upload avatar
export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: (response) => {
      toast.success("Avatar updated successfully!");

      // Update user profile cache with new avatar URL immediately
      // No need to refetch since upload already updated the database
      queryClient.setQueryData(["user-profile"], (oldData: any) => {
        if (oldData?.data) {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              avatar: response.data.url,
            },
          };
        }
        return oldData;
      });
    },
    onError: () => {
      toast.error("Failed to upload avatar");
    },
  });
};

// Hook to get notification settings
export const useNotificationSettings = () => {
  return useQuery({
    queryKey: ["notification-settings"],
    queryFn: getNotificationSettings,
  });
};

// Hook to update notification settings
export const useUpdateNotificationSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: NotificationSettings) =>
      updateNotificationSettings(settings),
    onSuccess: () => {
      toast.success("Notification settings updated!");
      queryClient.invalidateQueries({ queryKey: ["notification-settings"] });
    },
    onError: () => {
      toast.error("Failed to update settings");
    },
  });
};

// Hook to get privacy settings
export const usePrivacySettings = () => {
  return useQuery({
    queryKey: ["privacy-settings"],
    queryFn: getPrivacySettings,
  });
};

// Hook to update privacy settings
export const useUpdatePrivacySettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: PrivacySettings) => updatePrivacySettings(settings),
    onSuccess: () => {
      toast.success("Privacy settings updated!");
      queryClient.invalidateQueries({ queryKey: ["privacy-settings"] });
    },
    onError: () => {
      toast.error("Failed to update settings");
    },
  });
};

// Hook to delete account
export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Account deleted successfully");
      // Redirect to login or home page
      window.location.href = "/";
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });
};
