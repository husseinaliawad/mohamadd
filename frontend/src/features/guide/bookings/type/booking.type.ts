export type BookingStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "cancelled_by_tourist"
  | "cancelled_by_guide"
  | "completed";

  export interface Log {
      id: number,
      booking_id: number,
      old_status: BookingStatus,
      new_status: BookingStatus,
      actor_id: number,
      note: string,
      created_at: string
  }
export interface Booking {
  booking_id: number;

  // معلومات السائح
  tourist_id: number;
  tourist_name: string;
  
  // تفاصيل الرحلة
  start_date: string;   // ISO date
  day_count: number;    // محسوبة من start/end
  total_price: number;
  description: string,

  // حالة الحجز
  status: BookingStatus;

  can_guide_cancel: boolean; 
  can_guide_react: boolean; 
  // بيانات إضافية
  created_at: string;
}
