"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TextFormField } from "@/components/ui/form-field";
import { useAuth } from "@/hooks/useAuthRedirect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

// Complete profile validation schema
const completeProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .max(200, "Address must be less than 200 characters")
    .optional()
    .or(z.literal("")),
});

type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;

export default function CompleteProfilePage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  const onSubmit = async (data: CompleteProfileFormData) => {
    try {
      setIsLoading(true);

      // TODO: Call API to update user profile
      console.log("Profile data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to dashboard or home
      router.push("/");
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">
            {t("completeProfile.welcome")}, {user?.username}! 🎉
          </CardTitle>
          <CardDescription>{t("completeProfile.subtitle")}</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <TextFormField
                  control={form.control}
                  name="fullName"
                  label={t("completeProfile.fullName")}
                  placeholder={t("completeProfile.fullNamePlaceholder")}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <TextFormField
                  control={form.control}
                  name="email"
                  label={t("completeProfile.email")}
                  placeholder={t("completeProfile.emailPlaceholder")}
                  type="email"
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <TextFormField
                  control={form.control}
                  name="phone"
                  label={t("completeProfile.phone")}
                  placeholder={t("completeProfile.phonePlaceholder")}
                  type="tel"
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>

              {/* Address */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <TextFormField
                  control={form.control}
                  name="address"
                  label={t("completeProfile.address")}
                  placeholder={t("completeProfile.addressPlaceholder")}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 pt-4">
                <Button
                  type="submit"
                  className="w-full bg-[#1967D2] hover:bg-[#1967D2]/90"
                  disabled={isLoading}
                >
                  {isLoading
                    ? t("completeProfile.saving")
                    : t("completeProfile.completeButton")}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-gray-800"
                  onClick={handleSkip}
                  disabled={isLoading}
                >
                  {t("completeProfile.skipButton")}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                {t("completeProfile.laterNote")}
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
