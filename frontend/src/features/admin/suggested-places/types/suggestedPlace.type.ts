export type SuggestionStatus = "pending" | "approved" | "rejected";

export interface SuggestedPlace {
  id: number;
  user_id: number;
  city_id?: number;
  city?: {
    id: number;
    name: string;
  };
  name: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  status: SuggestionStatus;
  admin_notes?: string;
  user?: {
    id: number;
    name: string;
    role: "admin" | "guide" | "tourist";
  };
  user_name?: string;
  user_type?: "admin" | "guide" | "tourist";
  created_at?: string;
  updated_at?: string;
}

export interface UpdateSuggestionStatusData {
  status: SuggestionStatus;
  admin_notes?: string;
}
