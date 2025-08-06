import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Camera, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserProfile, useUpdateProfile, useUploadAvatar } from "../hooks";

const profileSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileSettings() {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const { data: userProfile, isLoading } = useUserProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: uploadAvatar, isPending: isUploadingAvatar } =
    useUploadAvatar();

  const user = userProfile?.data;

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user?.full_name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        full_name: user.full_name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user, form]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewAvatar) {
        URL.revokeObjectURL(previewAvatar);
      }
    };
  }, [previewAvatar]);

  const onSubmit = (data: ProfileFormData) => {
    updateProfile(data, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create preview URL immediately
      const previewUrl = URL.createObjectURL(file);
      setPreviewAvatar(previewUrl);

      // Upload file immediately (no need to wait for save button)
      uploadAvatar(file);
    }
  };

  // Clear preview when upload completes
  useEffect(() => {
    // Only clear preview if upload was in progress and now finished
    if (!isUploadingAvatar && previewAvatar) {
      const timer = setTimeout(() => {
        URL.revokeObjectURL(previewAvatar);
        setPreviewAvatar(null);
      }, 1500); // Clear preview after upload completes

      return () => clearTimeout(timer);
    }
  }, [isUploadingAvatar, previewAvatar]);

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-48"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <p>Không thể tải thông tin người dùng</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t("settings.profile.title", "Profile Information")}</span>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              {t("common.edit", "Edit")}
            </Button>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={previewAvatar || user?.avatar || ""}
                alt={user?.full_name || "User avatar"}
              />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>

            {isEditing && (
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                {isUploadingAvatar ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Camera className="h-5 w-5 text-white" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  disabled={isUploadingAvatar}
                />
              </label>
            )}

            {/* Upload progress indicator */}
            {isUploadingAvatar && (
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                Uploading...
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              {user?.full_name || "Chưa cập nhật"}
            </h3>
            <p className="text-gray-600">{user?.email}</p>
            {isUploadingAvatar && (
              <p className="text-sm text-blue-600">
                {t("settings.profile.uploadingAvatar", "Uploading avatar...")}
              </p>
            )}
          </div>
        </div>

        {/* Profile Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("settings.profile.fullName", "Họ và tên")}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("settings.profile.phone", "Số điện thoại")}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("settings.profile.address", "Địa chỉ")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isEditing && (
              <div className="flex space-x-3 pt-6">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {isUpdating ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Đang lưu...</span>
                    </div>
                  ) : (
                    t("common.save", "Lưu")
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-6 py-2.5 rounded-lg transition-all duration-200"
                >
                  {t("common.cancel", "Hủy")}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
