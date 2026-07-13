export interface Destination {
  id: number;
  city_id: number;
  category_id: number;
  name: string;
  description?: string;
  phone?: string;
  address?: string;
  cost?: number;
  expected_duration_minutes?: number;
  activity_level?: string;
  is_outdoor?: boolean;
  best_seasons?: string[];
  recommended_times?: string[];
  opening_hours?: string;
  average_rating?: number;
  reviews_count?: number;
  latitude?: number;
  longitude?: number;
  images?: string[];
  interests?: number[];
  created_at?: string;
  updated_at?: string;
}

export interface DestinationFormData {
  city_id: number;
  category_id: number;
  name: string;
  description?: string;
  phone?: string;
  address?: string;
  cost?: number;
  expected_duration_minutes?: number;
  activity_level?: string;
  is_outdoor?: boolean;
  best_seasons?: string[];
  recommended_times?: string[];
  opening_hours?: string;
  average_rating?: number;
  reviews_count?: number;
  latitude?: number;
  longitude?: number;
  images?: File[];
  interests?: number[];
}
