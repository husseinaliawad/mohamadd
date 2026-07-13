import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "../api/getUsers.api";
import { updateUserStatus } from "../api/updateUserStatus.api";
import { makeAdmin } from "../api/makeAdmin.api";
import type { UserFilters } from "../types/user.type";
import toast from "react-hot-toast";

export function useUsers(filters?: UserFilters) {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["admin-users", filters],
    queryFn: () => getUsers(filters),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateUserStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("تم تحديث حالة المستخدم بنجاح");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "فشل تحديث حالة المستخدم";
      toast.error(errorMessage);
    },
  });

  const makeAdminMutation = useMutation({
    mutationFn: (id: number) => makeAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("تم تحويل المستخدم إلى مدير نظام بنجاح");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "فشل تحويل المستخدم إلى مدير نظام";
      toast.error(errorMessage);
    },
  });

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    updateUserStatus: updateStatusMutation.mutate,
    makeAdmin: makeAdminMutation.mutate,
    isUpdating: updateStatusMutation.isPending || makeAdminMutation.isPending,
  };
}
