export interface GuideDashboardResponse {
  guide: {
    name: string;
    avatar: string | null;
    rating: number;
    role: string;
  };
  stats: {
    booked_days: number;
    confirmed_trips: number;
    new_requests: number;
  };
  latest_reviews: {
    id: number;
    user: string;
    comment: string;
    rating: number;
  }[];
  latest_bookings: {
    id: number;
    name: string;
    duration: string;
    status: string;
    date_range: string;
  }[];
}
