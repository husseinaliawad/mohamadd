export interface Interest {
  id: number;
  name: string;
  question: string;
  created_at?: string;
  updated_at?: string;
}

export interface InterestFormData {
  name: string;
  question: string;
}
