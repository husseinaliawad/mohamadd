import api from "@/lib/axios";
import type { BookingForm } from "../schemas/guideBookSchema";

export async function createBookingApi(guideId: number, data: BookingForm) {
  await api.post(`/tourist/guide-bookings/${guideId}/book`, data);  
}
