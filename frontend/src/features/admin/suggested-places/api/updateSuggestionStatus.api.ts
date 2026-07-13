import axios from "@/lib/axios";
import type { UpdateSuggestionStatusData } from "../types/suggestedPlace.type";

export async function updateSuggestionStatus(id: number, data: UpdateSuggestionStatusData): Promise<void> {
  await axios.patch(`/admin/suggested-places/${id}/status`, data);
}
