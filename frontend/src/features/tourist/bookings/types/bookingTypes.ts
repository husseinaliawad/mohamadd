export type BookingStatus =
    | "pending"
    | "accepted"
    | "rejected"
    | "cancelled_by_tourist"
    | "cancelled_by_guide"
    | "completed";

export interface Review {
    rating: number;
    comment: string;
}
// interface Tourist{
//     user: {
//         name: string
//     }
// }

export interface Booking {
    booking_id: number;
    
    // tourist: Tourist;
    
    guide_name: string;
    guide_avatar: string;

    start_date: string;
    day_count: number;

    status: BookingStatus;

    total_price: number;

    description?: string | null;

    review?: Review | null;

    can_tourist_cancel: boolean;
    can_tourist_review: boolean;

    created_at: string,
}

export interface Log {
    id: number,
    booking_id: number,
    old_status: BookingStatus,
    new_status: BookingStatus,
    actor_id: number,
    note: string,
    created_at: string
}