export type SuggestionStatus = "pending" | "approved" | "rejected";

export interface SuggestedPlace {
  id: number;
  user_id: number;
  city_id?: number;
  name: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  status: SuggestionStatus;
  admin_notes?: string;
  user_name: string;
  user_type: "guide" | "tourist";
  created_at?: string;
  updated_at?: string;
}

export interface UpdateSuggestionStatusData {
  status: SuggestionStatus;
  admin_notes?: string;
}
