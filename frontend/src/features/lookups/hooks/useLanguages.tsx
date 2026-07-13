import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../api/getLanguages.api";

export function useLanguages() {
  return useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
    staleTime: 1000 * 60 * 60, // ساعة
  });
}
