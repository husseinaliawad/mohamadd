import axios from "@/lib/axios";
import type { Interest } from "../types/interestType.type";

export async function getInterests(): Promise<Interest[]> {
  const res = await axios.get("/admin/interests");
  return res.data.data;
}
