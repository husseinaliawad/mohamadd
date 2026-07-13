import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookingApi } from "../api/createBooking.api";
import type { BookingForm } from "../schemas/guideBookSchema";
import toast from "react-hot-toast";

export const useGuideBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ guideId, data }: { guideId: number, data: BookingForm }) =>
      createBookingApi(guideId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message;
      console.log(errorMessage);

      toast.error(errorMessage)
    },
  });
}
