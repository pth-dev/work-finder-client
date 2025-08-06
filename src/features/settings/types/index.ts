// Settings Types
export interface UserProfile {
  user_id: number;
  email: string;
  full_name?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  full_name?: string;
  phone?: string;
  address?: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface NotificationSettings {
  email_notifications: boolean;
  job_alerts: boolean;
  application_updates: boolean;
  marketing_emails: boolean;
}

export interface PrivacySettings {
  profile_visibility: "public" | "private" | "recruiters_only";
  show_contact_info: boolean;
  allow_messages: boolean;
}
