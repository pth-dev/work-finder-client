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
import {
  Eye,
  EyeOff,
  User,
  Shield,
  ChevronDown,
  ChevronUp,
  Camera,
  Edit3,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  useChangePassword,
  useUserProfile,
  useUpdateProfile,
  useUploadAvatar,
} from "../hooks";

import { formatRelativeTime } from "@/utils";
import { LoadingSpinner } from "@/components/common";

const createPasswordSchema = (t: any) =>
  z
    .object({
      current_password: z
        .string()
        .min(
          1,
          t(
            "settings.account.password.validation.currentRequired",
            "Current password is required"
          )
        ),
      new_password: z
        .string()
        .min(
          8,
          t(
            "settings.account.password.validation.minLength",
            "New password must be at least 8 characters"
          )
        )
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          t(
            "settings.account.password.validation.complexity",
            "Password must contain uppercase, lowercase, number and special character"
          )
        ),
      confirm_password: z
        .string()
        .min(
          1,
          t(
            "settings.account.password.validation.confirmRequired",
            "Please confirm your new password"
          )
        ),
    })
    .refine((data) => data.new_password === data.confirm_password, {
      message: t(
        "settings.account.password.validation.mismatch",
        "Passwords don't match"
      ),
      path: ["confirm_password"],
    });

const createProfileSchema = (t: any) =>
  z.object({
    full_name: z
      .string()
      .min(
        2,
        t(
          "settings.profile.validation.fullNameMin",
          "Full name must be at least 2 characters"
        )
      ),
    phone: z.string().optional(),
    address: z.string().optional(),
  });

type PasswordFormData = z.infer<ReturnType<typeof createPasswordSchema>>;
type ProfileFormData = z.infer<ReturnType<typeof createProfileSchema>>;

interface PasswordFieldProps {
  field: any;
  label: string;
  placeholder: string;
  showPassword: boolean;
  onTogglePassword: () => void;
}

function PasswordField({
  field,
  label,
  placeholder,
  showPassword,
  onTogglePassword,
}: PasswordFieldProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            {...field}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={onTogglePassword}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export function AccountSettings() {
  const { t } = useTranslation();

  // State for toggling sections
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  // Password form states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch user profile data
  const { data: userProfile, isLoading: profileLoading } = useUserProfile();
  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();
  const { mutate: uploadAvatar, isPending: isUploadingAvatar } =
    useUploadAvatar();
  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword();

  const user = userProfile?.data;

  // Forms
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(createPasswordSchema(t)),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(createProfileSchema(t)),
    defaultValues: {
      full_name: user?.full_name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  // Update profile form when user data changes
  useEffect(() => {
    if (user) {
      profileForm.reset({
        full_name: user.full_name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user, profileForm]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewAvatar) {
        URL.revokeObjectURL(previewAvatar);
      }
    };
  }, [previewAvatar]);

  const onPasswordSubmit = (data: PasswordFormData) => {
    changePassword(
      {
        current_password: data.current_password,
        new_password: data.new_password,
      },
      {
        onSuccess: () => {
          passwordForm.reset();
          setShowPasswordForm(false);
        },
      }
    );
  };

  const onProfileSubmit = (data: ProfileFormData) => {
    updateProfile(data, {
      onSuccess: () => {
        setIsEditingProfile(false);
      },
    });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create preview URL immediately
      const previewUrl = URL.createObjectURL(file);
      setPreviewAvatar(previewUrl);

      // Upload file
      uploadAvatar(file);
    }
  };

  // Clear preview when upload completes
  useEffect(() => {
    if (!isUploadingAvatar && previewAvatar) {
      const timer = setTimeout(() => {
        URL.revokeObjectURL(previewAvatar);
        setPreviewAvatar(null);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isUploadingAvatar, previewAvatar]);

  return (
    <div className="space-y-6">
      {/* Profile Information Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{t("settings.profile.title", "Thông tin hồ sơ")}</span>
            </div>
            {!isEditingProfile && (
              <Button
                variant="outline"
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>{t("common.edit", "Chỉnh sửa")}</span>
              </Button>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {profileLoading ? (
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-48"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
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

                  {isEditingProfile && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                      {isUploadingAvatar ? (
                        <LoadingSpinner size="sm" />
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
                    {user?.full_name || t("common.notSet", "Chưa thiết lập")}
                  </h3>
                  <p className="text-gray-600">{user?.email}</p>
                  <div className="text-sm text-gray-500 mt-1">
                    <span>
                      {t(
                        "settings.account.info.accountCreated",
                        "Tạo tài khoản"
                      )}
                      :{" "}
                    </span>
                    <span>
                      {user?.created_at
                        ? formatRelativeTime(user.created_at)
                        : t("common.notAvailable", "Không có")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              {isEditingProfile ? (
                <Form {...profileForm}>
                  <form
                    onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={profileForm.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t("settings.profile.fullName", "Họ và tên")}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t("settings.profile.phone", "Số điện thoại")}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={profileForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("settings.profile.address", "Địa chỉ")}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" disabled={isUpdatingProfile}>
                        {isUpdatingProfile ? (
                          <LoadingSpinner className="mr-2" />
                        ) : (
                          t("common.save", "Lưu")
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          profileForm.reset();
                          setIsEditingProfile(false);
                        }}
                      >
                        {t("common.cancel", "Hủy")}
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("settings.profile.fullName", "Họ và tên")}
                    </label>
                    <p className="text-sm text-gray-600">
                      {user?.full_name || t("common.notSet", "Chưa thiết lập")}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("settings.profile.phone", "Số điện thoại")}
                    </label>
                    <p className="text-sm text-gray-600">
                      {user?.phone || t("common.notSet", "Chưa thiết lập")}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("settings.profile.address", "Địa chỉ")}
                    </label>
                    <p className="text-sm text-gray-600">
                      {user?.address || t("common.notSet", "Chưa thiết lập")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Password & Security Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>
                {t("settings.account.password.title", "Mật khẩu & Bảo mật")}
              </span>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Security Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    {t(
                      "settings.account.info.lastUpdated",
                      "Cập nhật lần cuối"
                    )}
                  </label>
                  <p className="text-sm text-blue-600">
                    {user?.updated_at
                      ? formatRelativeTime(user.updated_at)
                      : t("common.notAvailable", "Không có")}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    {t("settings.account.info.email", "Email")}
                  </label>
                  <p className="text-sm text-blue-600">
                    {user?.email || t("common.notAvailable", "Không có")}
                  </p>
                </div>
              </div>
            </div>

            {/* Password Actions */}
            <div className="flex justify-center">
              <Button
                variant={showPasswordForm ? "secondary" : "default"}
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="flex items-center space-x-2 px-8 py-3 text-base font-medium"
                size="lg"
              >
                {showPasswordForm ? (
                  <>
                    <ChevronUp className="h-5 w-5" />
                    <span>
                      {t("settings.account.password.hideForm", "Ẩn form")}
                    </span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-5 w-5" />
                    <span>
                      {t(
                        "settings.account.password.changePassword",
                        "Đổi mật khẩu"
                      )}
                    </span>
                  </>
                )}
              </Button>
            </div>

            {/* Password Change Form - Only show when toggled */}
            {showPasswordForm && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="current_password"
                      render={({ field }) => (
                        <PasswordField
                          field={field}
                          label={t(
                            "settings.account.password.currentPassword",
                            "Mật khẩu hiện tại"
                          )}
                          placeholder={t(
                            "settings.account.password.enterCurrentPassword",
                            "Nhập mật khẩu hiện tại"
                          )}
                          showPassword={showCurrentPassword}
                          onTogglePassword={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        />
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="new_password"
                      render={({ field }) => (
                        <PasswordField
                          field={field}
                          label={t(
                            "settings.account.password.newPassword",
                            "Mật khẩu mới"
                          )}
                          placeholder={t(
                            "settings.account.password.enterNewPassword",
                            "Nhập mật khẩu mới"
                          )}
                          showPassword={showNewPassword}
                          onTogglePassword={() =>
                            setShowNewPassword(!showNewPassword)
                          }
                        />
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirm_password"
                      render={({ field }) => (
                        <PasswordField
                          field={field}
                          label={t(
                            "settings.account.password.confirmPassword",
                            "Xác nhận mật khẩu mới"
                          )}
                          placeholder={t(
                            "settings.account.password.confirmNewPassword",
                            "Xác nhận mật khẩu mới"
                          )}
                          showPassword={showConfirmPassword}
                          onTogglePassword={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        />
                      )}
                    />

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" disabled={isChangingPassword}>
                        {isChangingPassword ? (
                          <LoadingSpinner className="mr-2" />
                        ) : (
                          t(
                            "settings.account.password.updatePassword",
                            "Cập nhật mật khẩu"
                          )
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          passwordForm.reset();
                          setShowPasswordForm(false);
                        }}
                      >
                        {t("common.cancel", "Hủy")}
                      </Button>
                    </div>
                  </form>
                </Form>

                {/* Password Requirements */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">
                    {t(
                      "settings.account.password.requirements",
                      "Yêu cầu mật khẩu"
                    )}
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      •{" "}
                      {t(
                        "settings.account.password.requirement1",
                        "Ít nhất 8 ký tự"
                      )}
                    </li>
                    <li>
                      •{" "}
                      {t(
                        "settings.account.password.requirement2",
                        "Chứa ít nhất một chữ hoa"
                      )}
                    </li>
                    <li>
                      •{" "}
                      {t(
                        "settings.account.password.requirement3",
                        "Chứa ít nhất một chữ thường"
                      )}
                    </li>
                    <li>
                      •{" "}
                      {t(
                        "settings.account.password.requirement4",
                        "Chứa ít nhất một số"
                      )}
                    </li>
                    <li>
                      •{" "}
                      {t(
                        "settings.account.password.requirement5",
                        "Chứa ít nhất một ký tự đặc biệt (@$!%*?&)"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
