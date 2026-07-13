import {  useQuery } from "@tanstack/react-query";
import {  getBookingDetailsApi, getMyBookingsApi } from "../api/getMyBookings.api";

export const useMyBookings = () => {
  return useQuery({
    queryKey: ["my-bookings"],
    queryFn: getMyBookingsApi,
  });
};
export const useBookingDetails = (booking_id : number) => {
  return useQuery({
    queryKey: ["my-bookings" , booking_id ],
    queryFn: () => getBookingDetailsApi(booking_id),
  });
};