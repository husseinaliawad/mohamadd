type notificationType = "new-booking" | "alter-booking";

export interface AlterBookingData {
  type: notificationType;
  bookingId: number;
  status: string;
  message: string;
  note?: string;
}


export interface NewBookingData {
  type: notificationType;
  tourist_name: string;
  message: string;
  start_date: string;
  days: number;
}
export type NotificationData = AlterBookingData | NewBookingData;

export interface Notification {
  id: string;
  data: NotificationData;
  is_read: boolean;
  created_at: string;
}
