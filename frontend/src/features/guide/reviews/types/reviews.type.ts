// توزيع النجوم
export type RatingDistribution = {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
};

// تقييم واحد
export type Review = {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  tourist_name: string;
  trip_city?: string;
  trip_date?: string;
};

// استجابة API كاملة
export type GuideReviewsResponse = {
  average_rating: number;
  total_reviews: number;
  ratings_distribution: RatingDistribution;
  reviews: Review[];
};
