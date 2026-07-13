import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCities } from "../api/getCities.api";
import { createCity } from "../api/createCity.api";
import { updateCity } from "../api/updateCity.api";
import { deleteCity } from "../api/deleteCity.api";
import toast from "react-hot-toast";

export function useCities() {
  const queryClient = useQueryClient();

  const citiesQuery = useQuery({
    queryKey: ["admin-cities"],
    queryFn: getCities,
  });

  const createMutation = useMutation({
    mutationFn: createCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cities"] });
      toast.success("تم إضافة المدينة بنجاح");
    },
    onError: () => {
      toast.error("فشل إضافة المدينة");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateCity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cities"] });
      toast.success("تم تحديث المدينة بنجاح");
    },
    onError: () => {
      toast.error("فشل تحديث المدينة");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cities"] });
      toast.success("تم حذف المدينة بنجاح");
    },
    onError: () => {
      toast.error("فشل حذف المدينة");
    },
  });

  return {
    cities: citiesQuery.data || [],
    isLoading: citiesQuery.isLoading,
    createCity: createMutation.mutate,
    updateCity: updateMutation.mutate,
    deleteCity: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
