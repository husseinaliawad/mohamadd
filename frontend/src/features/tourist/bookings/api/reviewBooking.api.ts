import api from "@/lib/axios";

export const reviewBookingApi =  async (bookingId: number, comment: string , rating : number) => {
    console.log(bookingId , comment , rating)
    await api.post(`/tourist/guide-bookings/${bookingId}/review` ,  {comment , rating});
}