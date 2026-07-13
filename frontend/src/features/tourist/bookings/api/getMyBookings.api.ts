import axios from "@/lib/axios";

export const getMyBookingsApi = async () => {
  const response = await axios.get("/tourist/guide-bookings");
  return response.data.data;
};
export const getBookingDetailsApi = async (booking_id : number) => {
  const response = await axios.get(`/tourist/guide-bookings/${booking_id}`);
  return response.data.data;
};


