import { api } from "@/lib/api-client";
import {
  UserProfile,
  UpdateProfileData,
  ChangePasswordData,
  NotificationSettings,
  PrivacySettings,
} from "../types";

// Get user profile
export const getUserProfile = (): Promise<{ data: UserProfile }> => {
  return api.get("/users/me");
};

// Update user profile
export const updateUserProfile = (
  data: UpdateProfileData
): Promise<{ data: UserProfile }> => {
  return api.patch("/users/me", data);
};

// Change password
export const changePassword = (
  data: ChangePasswordData
): Promise<{ data: { message: string } }> => {
  return api.put("/users/change-password", data);
};

// Upload avatar
export const uploadAvatar = (
  file: File
): Promise<{ data: { url: string; message: string; filename: string } }> => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/upload/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Get notification settings
export const getNotificationSettings = (): Promise<{
  data: NotificationSettings;
}> => {
  return api.get("/users/notification-settings");
};

// Update notification settings
export const updateNotificationSettings = (
  settings: NotificationSettings
): Promise<{ data: NotificationSettings }> => {
  return api.put("/users/notification-settings", settings);
};

// Get privacy settings
export const getPrivacySettings = (): Promise<{ data: PrivacySettings }> => {
  return api.get("/users/privacy-settings");
};

// Update privacy settings
export const updatePrivacySettings = (
  settings: PrivacySettings
): Promise<{ data: PrivacySettings }> => {
  return api.put("/users/privacy-settings", settings);
};

// Delete account
export const deleteAccount = (): Promise<{ data: { message: string } }> => {
  return api.delete("/users/account");
};
