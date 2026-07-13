import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "../api/notification.api";

export const useUnreadCount = () => {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: getUnreadCount,
    refetchInterval: 5000, // تحديث كل 5 ثواني
  });
};
