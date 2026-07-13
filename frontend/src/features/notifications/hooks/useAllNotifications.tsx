import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../api/notification.api";

export const useAllNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
  });
};
