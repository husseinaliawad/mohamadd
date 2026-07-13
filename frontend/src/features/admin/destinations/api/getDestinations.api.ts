import axios from "@/lib/axios";
import type { Destination } from "../types/destination.type";

export async function getDestinations(): Promise<Destination[]> {
  const response = await axios.get("/admin/places");
  return response.data.data;
}
