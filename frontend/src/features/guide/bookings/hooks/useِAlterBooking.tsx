import { useMutation, useQueryClient } from "@tanstack/react-query";
import { alterBookingApi } from "../api/alterBooking.api";

export function useAlterBooking() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, note , action }: { id: number; note: string, action: string }) =>
            alterBookingApi(id, note , action),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guide-bookings"] });
        },
    });
}
