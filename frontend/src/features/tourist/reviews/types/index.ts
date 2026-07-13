export type GuideUser = {
  id: number;
  name: string;
  email: string;
};

export type Guide = {
  id: number;
  gender: "M" | "F";
  phone: string;
  DOB: string;
  avatar: string | null;
  daily_price: number;
  bio: string | null;
  user: GuideUser;
};

export type Trip = {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
};

export type Booking = {
  id: number;
  start_date: string;
  day_count: number;
  status: string;
  total_price: string;
  guide: Guide;
  trip?: Trip | null;
};

export type TouristReview = {
  id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  booking: Booking;
};
