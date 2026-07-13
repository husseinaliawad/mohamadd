import { useQuery } from "@tanstack/react-query";
import { getGuideReviews } from "../api/getGuideReviews.api";

export function useGuideReviews() {
  return useQuery({
    queryKey: ["guide-reviews"],
    queryFn: getGuideReviews,
    staleTime: 1000 * 60 * 10, // 10 دقائق
  });
}
