export type ActivityLevel = "relax" | "sensible" | "vigour";

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
  activity_level?: ActivityLevel;
  is_outdoor?: boolean;
  best_seasons?: string[];
  recommended_times?: string[];
  opening_hours?: string[];
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
  activity_level?: ActivityLevel;
  is_outdoor?: boolean;
  best_seasons?: string[];
  recommended_times?: string[];
  opening_hours?: string; // String for form input (comma-separated), will be converted to array in API
  average_rating?: number;
  reviews_count?: number;
  latitude?: number;
  longitude?: number;
  images?: File[];
  existing_images?: string[]; // Existing images from database
  images_to_delete?: number[]; // IDs of images to delete
  interests?: number[];
}
