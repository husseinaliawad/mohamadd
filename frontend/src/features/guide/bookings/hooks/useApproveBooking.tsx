import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptBookingApi } from "../api/acceptBooking.api";

export function useAcceptBooking() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, note }: { id: number; note: string }) =>
            acceptBookingApi(id, note),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guide-bookings"] });
        },
    });
}
