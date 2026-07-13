import api from "@/lib/axios";
import type { AiTrip, AiTripRequest, NearbyRequest, NearbyResult } from "../types/aiTrip.types";

export async function createAiTrip(data: AiTripRequest): Promise<AiTrip> {
  const res = await api.post("/tourist/ai/trips/plan", data);
  return res.data.data;
}

export async function getAiTrips(): Promise<AiTrip[]> {
  const res = await api.get("/tourist/ai/trips");
  return res.data.data;
}

export async function getNearbyPlaces(data: NearbyRequest): Promise<NearbyResult> {
  const res = await api.post("/tourist/ai/nearby-places", data);
  return res.data.data;
}
