import axios from "@/lib/axios";
import type { InterestFormData } from "../types/interestType.type";

export async function updateInterest(id: number, data: InterestFormData): Promise<void> {
  await axios.put(`/admin/interests/${id}`, data);
}
