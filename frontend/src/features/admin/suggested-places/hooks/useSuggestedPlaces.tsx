import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSuggestedPlaces } from "../api/getSuggestedPlaces.api";
import { updateSuggestionStatus } from "../api/updateSuggestionStatus.api";
import type { UpdateSuggestionStatusData } from "../types/suggestedPlace.type";
import toast from "react-hot-toast";

export function useSuggestedPlaces() {
  const queryClient = useQueryClient();

  const suggestedPlacesQuery = useQuery({
    queryKey: ["admin-suggested-places"],
    queryFn: getSuggestedPlaces,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSuggestionStatusData }) => updateSuggestionStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-suggested-places"] });
      toast.success("تم تحديث حالة الاقتراح بنجاح");
    },
    onError: () => {
      toast.error("فشل تحديث حالة الاقتراح");
    },
  });

  return {
    suggestedPlaces: suggestedPlacesQuery.data || [],
    isLoading: suggestedPlacesQuery.isLoading,
    updateSuggestionStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
}
