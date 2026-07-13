import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectBookingApi } from "../api/rejectBooking.api";

export function useRejectBooking() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, note }: { id: number; note: string }) =>
            rejectBookingApi(id, note),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guide-bookings"] });
        },
    });
}
