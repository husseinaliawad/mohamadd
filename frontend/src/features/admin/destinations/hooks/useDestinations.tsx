import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDestinations } from "../api/getDestinations.api";
import { createDestination } from "../api/createDestination.api";
import { updateDestination } from "../api/updateDestination.api";
import { deleteDestination } from "../api/deleteDestination.api";
import toast from "react-hot-toast";

export function useDestinations() {
  const queryClient = useQueryClient();

  const destinationsQuery = useQuery({
    queryKey: ["admin-destinations"],
    queryFn: getDestinations,
  });

  const createMutation = useMutation({
    mutationFn: createDestination,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-destinations"] });
      toast.success("تم إضافة الوجهة السياحية بنجاح");
    },
    onError: () => {
      toast.error("فشل إضافة الوجهة السياحية");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateDestination(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-destinations"] });
      toast.success("تم تحديث الوجهة السياحية بنجاح");
    },
    onError: () => {
      toast.error("فشل تحديث الوجهة السياحية");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDestination,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-destinations"] });
      toast.success("تم حذف الوجهة السياحية بنجاح");
    },
    onError: () => {
      toast.error("فشل حذف الوجهة السياحية");
    },
  });

  return {
    destinations: destinationsQuery.data || [],
    isLoading: destinationsQuery.isLoading,
    createDestination: createMutation.mutate,
    updateDestination: updateMutation.mutate,
    deleteDestination: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
