import api from "@/lib/axios";
import type { GuideDashboardResponse } from "../type";

export async function getGuideDashboard(): Promise<GuideDashboardResponse> {
  const response = await api.get("/guide/dashboard");
  return response.data.data;
}
