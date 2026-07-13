import api from "@/lib/axios";

export const cancelBookingApi = async (bookingId: number, note: string) => {
  // console.log(bookingId);
  await api.post(`/tourist/guide-bookings/${bookingId}/cancel`, {
    note,    
  });
};
