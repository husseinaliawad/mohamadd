export interface Filters {
    cities: number[];
    languages: number[];
    sort: string;
}

export interface Guide {
    guide_id: number;
    name: string;
    daily_price: number;
    bio?: string;
    avatar: string;
    cities: string;
    languages: string;
    bookings_count: number,
    reviews_count: number,
    rating: number,
}