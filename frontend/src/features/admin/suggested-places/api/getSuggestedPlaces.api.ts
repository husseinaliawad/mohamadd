import axios from "@/lib/axios";
import type { SuggestedPlace } from "../types/suggestedPlace.type";

export async function getSuggestedPlaces(): Promise<SuggestedPlace[]> {
  const res = await axios.get("/admin/suggested-places");
  return res.data.data.map((place: SuggestedPlace) => ({
    ...place,
    user_name: place.user_name ?? place.user?.name ?? "-",
    user_type: place.user_type ?? place.user?.role ?? "tourist",
  }));
}
