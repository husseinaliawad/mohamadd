import { useQuery } from "@tanstack/react-query";
import { getGuideDashboard } from "../api/getGuideDashboard.api";

export function useGuideDashboard() {
  return useQuery({
    queryKey: ["guide-dashboard"],
    queryFn: getGuideDashboard,
  });
}
