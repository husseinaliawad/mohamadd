
import api from "@/lib/axios";
import type { Notification } from "../type/notification.type";


export const getAllNotifications = async (): Promise<Notification[]> => {
  const res = await api.get("/notifications");
  return res.data.data;
};

export const getUnreadNotifications = async (): Promise<Notification[]> => {
  const res = await api.get("/notifications/unread");
  // console.log(res);
  return res.data.data;
};

export const getUnreadCount = async (): Promise<{count: number}> => {
  const res = await api.get("/notifications/unread-count");
  return res.data.data;
};

export const markAsRead = async (id: string): Promise<void> => {
  await api.post(`/notifications/${id}/mark-as-read`);
};

export const markAllAsRead = async (): Promise<void> => {
  await api.post(`/notifications/mark-all-as-read`);
};

