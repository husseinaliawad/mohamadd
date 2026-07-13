import { useQuery } from "@tanstack/react-query";
import { getTouristReviews } from "../api/getTouristReviews";

export function useTouristReviews() {
  return useQuery({
    queryKey: ["tourist-reviews"],
    queryFn: getTouristReviews,
    staleTime: 1000 * 60 * 10,
  });
}
