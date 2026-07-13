import { useQuery } from "@tanstack/react-query";
import { getCities } from "../api/getCities.api";

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    staleTime: 1000 * 60 * 60, // ساعة كاملة لأن البيانات ثابتة
  });
}
