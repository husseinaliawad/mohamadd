import api from "@/lib/axios";
import type { Booking, BookingStatus } from "../type/booking.type";

export interface GetBookingsParams {
  status?: BookingStatus;
}

export const getBookings = async (params?: GetBookingsParams) : Promise<Booking[]>=> {
  const response = await api.get("/guide/bookings" , { params });
  return response.data.data ;
};
