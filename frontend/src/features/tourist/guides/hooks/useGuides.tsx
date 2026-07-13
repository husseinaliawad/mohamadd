// src/hooks/useGuides.ts
import { useQuery } from "@tanstack/react-query";
import { getGuides, getGuideById } from "../api/guides.api";

export const useGuides = (filters?: any) => {
  return useQuery({
    queryKey: ["guides", filters],
    queryFn: () => getGuides(filters),
  });
};


export const  useGuideDetails = (guidId: number) => {
  // console.log(guidId);
  return useQuery({
    queryKey: ["guide", guidId],
    queryFn: () => getGuideById(guidId),
    enabled: !!guidId,
  });
};

