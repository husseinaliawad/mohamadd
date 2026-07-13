import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "../api/getCategories.api";
import { createCategory } from "../api/createCategory.api";
import { updateCategory } from "../api/updateCategory.api";
import { deleteCategory } from "../api/deleteCategory.api";
import toast from "react-hot-toast";

export function useCategories() {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["admin-categories"],
    queryFn: getCategories,
  });

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("تم إضافة التصنيف بنجاح");
    },
    onError: () => {
      toast.error("فشل إضافة التصنيف");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("تم تحديث التصنيف بنجاح");
    },
    onError: () => {
      toast.error("فشل تحديث التصنيف");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("تم حذف التصنيف بنجاح");
    },
    onError: () => {
      toast.error("فشل حذف التصنيف");
    },
  });

  return {
    categories: categoriesQuery.data || [],
    isLoading: categoriesQuery.isLoading,
    createCategory: createMutation.mutate,
    updateCategory: updateMutation.mutate,
    deleteCategory: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
