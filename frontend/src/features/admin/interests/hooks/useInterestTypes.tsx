import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getInterests } from "../api/getInterestTypes.api";
import { createInterest } from "../api/createInterestType.api";
import { updateInterest } from "../api/updateInterestType.api";
import { deleteInterest } from "../api/deleteInterestType.api";
import toast from "react-hot-toast";

export function useInterests() {
  const queryClient = useQueryClient();

  const interestsQuery = useQuery({
    queryKey: ["admin-interests"],
    queryFn: getInterests,
  });

  const createMutation = useMutation({
    mutationFn: createInterest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-interests"] });
      toast.success("تم إضافة الاهتمام بنجاح");
    },
    onError: () => {
      toast.error("فشل إضافة الاهتمام");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateInterest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-interests"] });
      toast.success("تم تحديث الاهتمام بنجاح");
    },
    onError: () => {
      toast.error("فشل تحديث الاهتمام");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInterest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-interests"] });
      toast.success("تم حذف الاهتمام بنجاح");
    },
    onError: () => {
      toast.error("فشل حذف الاهتمام");
    },
  });

  return {
    interests: interestsQuery.data || [],
    isLoading: interestsQuery.isLoading,
    createInterest: createMutation.mutate,
    updateInterest: updateMutation.mutate,
    deleteInterest: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
