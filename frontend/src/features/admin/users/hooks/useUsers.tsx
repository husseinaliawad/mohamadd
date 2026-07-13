import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "../api/getUsers.api";
import { updateUserStatus } from "../api/updateUserStatus.api";
import type { UpdateUserStatusData, UserFilters } from "../types/user.type";
import toast from "react-hot-toast";

export function useUsers(filters?: UserFilters) {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["admin-users", filters],
    queryFn: () => getUsers(filters),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserStatusData }) => updateUserStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("تم تحديث حالة المستخدم بنجاح");
    },
    onError: () => {
      toast.error("فشل تحديث حالة المستخدم");
    },
  });

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    updateUserStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
}
