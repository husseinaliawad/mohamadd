import axios from "@/lib/axios";
import type { City } from "../types/City";

export async function getCities(): Promise<City[]> {
  const res = await axios.get("/public/cities");
  return res.data.data;
}
