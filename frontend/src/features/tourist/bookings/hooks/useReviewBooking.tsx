
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { reviewBookingApi } from "../api/reviewBooking.api";
import toast from "react-hot-toast";

export const useReviewBooking = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ bookingId, comment, rating }: { bookingId: number; comment: string; rating: number }) => reviewBookingApi(bookingId, comment, rating),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
            toast.success("تم تقييم الرحلة بنجاح");
            onSuccess?.();
        }
    });
}

