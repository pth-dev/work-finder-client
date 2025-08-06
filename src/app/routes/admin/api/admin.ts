import { api } from "@/lib/api-client";

export interface AdminStats {
  totalUsers: number;
  companies: number;
  jobPosts: number;
  applications: number;
}

export const getAdminStats = async (): Promise<AdminStats> => {
  const [usersRes, companiesRes, jobsRes, appsRes] = await Promise.all([
    api.get("/users/all"),
    api.get("/companies"),
    api.get("/jobs"),
    api.get("/applications"),
  ]);


  return {
    totalUsers: usersRes.data.length,
    companies: companiesRes.data.total,
    jobPosts: jobsRes.data.total,
    applications: appsRes.data.length,
  };
};

export const getAllUsers = async () => {
  const res = await api.get("/users/all");
  return res.data || [];
};

export const getAllCompanies = async () => {
  const res = await api.get("/companies");
  console.log("API /companies response:", res.data);
  return res.data?.companies || []; 
};

export const deleteCompany = (id: number) => {
  return api.delete(`/companies/${id}`);
};
