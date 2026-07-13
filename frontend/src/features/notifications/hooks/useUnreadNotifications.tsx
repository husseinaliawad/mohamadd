import { useQuery } from "@tanstack/react-query";
import { getUnreadNotifications } from "../api/notification.api";

export const useUnreadNotifications = () => {
  return useQuery({
    queryKey: ["notifications", "unread"],
    queryFn: getUnreadNotifications,
  });
};
