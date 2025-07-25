"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Form, FormField } from "@/components/ui/form";
import {
  TextFormField,
  TextareaFormField,
  SelectFormField,
} from "@/components/ui/form-field";
import { Camera, Save, User } from "lucide-react";
import { toast } from "sonner";
import { profileSchema, type ProfileFormData } from "@/lib/validations/profile";
import { useTranslation } from "@/hooks/useTranslation";

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  isLoading?: boolean;
}

export function ProfileForm({
  initialData,
  onSubmit,
  isLoading = false,
}: ProfileFormProps) {
  const { t } = useTranslation();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const experienceOptions = [
    { value: "entry", label: t("profile.experience.entry") },
    { value: "junior", label: t("profile.experience.junior") },
    { value: "mid", label: t("profile.experience.mid") },
    { value: "senior", label: t("profile.experience.senior") },
    { value: "lead", label: t("profile.experience.lead") },
    { value: "executive", label: t("profile.experience.executive") },
  ];

  const availabilityOptions = [
    { value: "available", label: t("profile.availability.available") },
    { value: "not_available", label: t("profile.availability.not_available") },
    {
      value: "open_to_offers",
      label: t("profile.availability.open_to_offers"),
    },
  ];

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      phone: "",
      address: "",
      bio: "",
      website: "",
      linkedIn: "",
      github: "",
      twitter: "",
      location: "",
      jobTitle: "",
      company: "",
      ...initialData,
    },
  });

  const handleFormSubmit = async (data: ProfileFormData) => {
    try {
      await onSubmit(data);
      toast.success(t("profile.updateSuccess"));
      form.reset(data); // Reset form with new data to clear dirty state
    } catch (error) {
      toast.error(t("profile.updateError"));
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>{t("profile.title")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            {/* Avatar Section */}
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={avatarPreview || undefined} />
                <AvatarFallback>
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatar" className="cursor-pointer">
                  <div className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                    <Camera className="w-4 h-4" />
                    <span>{t("profile.changePhoto")}</span>
                  </div>
                </Label>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <TextFormField
                      label="Username"
                      placeholder="Enter your username"
                      required
                      {...field}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <TextFormField
                      label="Full Name"
                      placeholder="Enter your full name"
                      required
                      {...field}
                    />
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <TextFormField
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    {...field}
                  />
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <TextFormField
                      label="Phone"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <TextFormField
                      label="Location"
                      placeholder="Enter your location"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            {/* Bio & Professional Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Professional Information</h3>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <TextareaFormField
                    label="Bio"
                    placeholder="Tell us about yourself..."
                    description="Maximum 500 characters"
                    rows={4}
                    {...field}
                  />
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <TextFormField
                      label="Job Title"
                      placeholder="e.g. Software Engineer"
                      {...field}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <TextFormField
                      label="Company"
                      placeholder="e.g. Google"
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <SelectFormField
                      label="Experience Level"
                      placeholder="Select experience level"
                      options={experienceOptions}
                      onValueChange={field.onChange}
                      {...field}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <SelectFormField
                      label="Availability"
                      placeholder="Select availability"
                      options={availabilityOptions}
                      onValueChange={field.onChange}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Social Links</h3>

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <TextFormField
                    label="Website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    {...field}
                  />
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="linkedIn"
                  render={({ field }) => (
                    <TextFormField
                      label="LinkedIn"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      {...field}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <TextFormField
                      label="GitHub"
                      type="url"
                      placeholder="https://github.com/yourusername"
                      {...field}
                    />
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <TextFormField
                    label="Twitter"
                    type="url"
                    placeholder="https://twitter.com/yourusername"
                    {...field}
                  />
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={!form.formState.isDirty || isLoading}
              >
                Reset
              </Button>
              <Button
                type="submit"
                disabled={!form.formState.isDirty || isLoading}
                className="flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isLoading ? "Saving..." : "Save Changes"}</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
