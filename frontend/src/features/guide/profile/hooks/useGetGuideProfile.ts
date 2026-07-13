import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/getProfile.api";

export const useGetGuideProfile = () =>
  useQuery({
    queryKey: ["guide-profile"],
    queryFn: getProfile,
  });
