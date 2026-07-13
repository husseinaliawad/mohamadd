import axios from "@/lib/axios";
import type { InterestFormData } from "../types/interestType.type";

export async function createInterest(data: InterestFormData): Promise<void> {
  await axios.post("/admin/interests", data);
}
