import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBookingApi } from "../api/cancelBooking.api";

export function useCancelBooking() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, note }: { id: number; note: string }) =>
            cancelBookingApi(id, note),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guide-bookings"] });

        },
    });
}
