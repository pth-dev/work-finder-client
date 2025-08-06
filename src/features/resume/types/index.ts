export interface Resume {
  resume_id: number;
  user_id: number;
  file_name: string;
  file_path: string;
  upload_time: string;
  is_default?: boolean;
  file_size?: number;
  file_type?: string;
  user?: {
    user_id: number;
    full_name: string;
    email: string;
    phone: string;
  };
}

export interface CreateResumeRequest {
  user_id: number;
  file_name: string;
  file_path: string;
}

export interface UploadResumeResponse {
  message: string;
  resume_id: number;
  filename: string;
  url: string;
}

export interface ApiResumesResponse {
  success: boolean;
  status: number;
  data: Resume[];
  message: string;
  timestamp: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview_image: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal';
}

export interface ResumeBuilderData {
  personal_info: {
    full_name: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
  };
  experience: Array<{
    company: string;
    position: string;
    start_date: string;
    end_date?: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    field: string;
    start_date: string;
    end_date?: string;
  }>;
  skills: string[];
  languages: Array<{
    language: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'native';
  }>;
}
