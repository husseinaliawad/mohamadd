import api from "@/lib/axios";
import type { TouristReview } from "../types";


export async function getTouristReviews(): Promise<TouristReview[]> {
  const res = await api.get("/tourist/reviews");
  return res.data.data;
}
