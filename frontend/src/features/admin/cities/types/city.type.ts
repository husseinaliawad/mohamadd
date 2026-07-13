export interface City {
  id: number;
  name: string;
  description?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CityFormData {
  name: string;
  description?: string;
  image?: string | File;
}
