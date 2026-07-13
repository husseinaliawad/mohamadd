import axios from "@/lib/axios";
import type { City } from "../types/city.type";

export async function getCities(): Promise<City[]> {
  const res = await axios.get("/admin/cities");
  return res.data.data;
}
