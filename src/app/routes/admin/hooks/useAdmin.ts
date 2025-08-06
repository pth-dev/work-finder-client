import { useQuery } from "@tanstack/react-query";
import { getAdminStats } from "../api/admin";
import { getAllUsers } from "../api/admin";
import { getAllCompanies } from "../api/admin";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: getAdminStats,
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
};

export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getAllCompanies,
  });
};
