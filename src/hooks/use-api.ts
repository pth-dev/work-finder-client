import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../services/api";
import { useAppStore } from "../stores/app-store";

// Basic types for API hooks
interface User {
  id: string;
  name: string;
  email: string;
}

// Query keys
export const queryKeys = {
  users: ["users"] as const,
  user: (id: string) => ["users", id] as const,
  profile: ["users", "profile"] as const,
};

// User hooks
export const useProfile = () => {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: async () => {
      const response = await apiService.users.getProfile();
      return response.data.data as User;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: (data: Partial<User>) => apiService.users.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
      addNotification({
        type: "success",
        title: "Success",
        message: "Profile updated successfully",
      });
    },
    onError: (error: any) => {
      addNotification({
        type: "error",
        title: "Error",
        message: error.message || "Failed to update profile",
      });
    },
  });
};
