import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLanguages } from "../api/getLanguages.api";
import { createLanguage } from "../api/createLanguage.api";
import { updateLanguage } from "../api/updateLanguage.api";
import { deleteLanguage } from "../api/deleteLanguage.api";
import toast from "react-hot-toast";

export function useLanguages() {
  const queryClient = useQueryClient();

  const languagesQuery = useQuery({
    queryKey: ["admin-languages"],
    queryFn: getLanguages,
  });

  const createMutation = useMutation({
    mutationFn: createLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-languages"] });
      toast.success("تم إضافة اللغة بنجاح");
    },
    onError: () => {
      toast.error("فشل إضافة اللغة");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateLanguage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-languages"] });
      toast.success("تم تحديث اللغة بنجاح");
    },
    onError: () => {
      toast.error("فشل تحديث اللغة");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-languages"] });
      toast.success("تم حذف اللغة بنجاح");
    },
    onError: () => {
      toast.error("فشل حذف اللغة");
    },
  });

  return {
    languages: languagesQuery.data || [],
    isLoading: languagesQuery.isLoading,
    createLanguage: createMutation.mutate,
    updateLanguage: updateMutation.mutate,
    deleteLanguage: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
