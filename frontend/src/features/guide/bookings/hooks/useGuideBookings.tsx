
// features/guideBookings/hooks/useGuideBookings.ts
import { useQuery } from "@tanstack/react-query";
import { getBookings, type GetBookingsParams } from "../api/getGuideBookings";
import type { Booking } from "../type/booking.type";

export function useGuideBookings(params?: GetBookingsParams) {
  return useQuery<Booking[], Error>({
    queryKey: ["guide-bookings", params],
    queryFn: () => getBookings(params),
  });
}
