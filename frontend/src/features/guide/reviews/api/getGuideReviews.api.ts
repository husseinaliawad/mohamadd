import api from '@/lib/axios';
import type { GuideReviewsResponse } from '../types/reviews.type';

export async function getGuideReviews(): Promise<GuideReviewsResponse> {
  const res = await api.get("/guide/reviews");
  console.log(res.data);
  return res.data.data;
}
