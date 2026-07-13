
import api from "@/lib/axios";

export async function alterBookingApi(id: number, note: string, action : string ) {
  const response = await api.post(`/guide/bookings/${id}/${action}`, {
    note,
  });

  return response.data;
}