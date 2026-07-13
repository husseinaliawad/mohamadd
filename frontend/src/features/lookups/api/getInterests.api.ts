import axios from "@/lib/axios";

export interface Interest {
  id: number;
  name: string;
  question?: string;
}

export async function getPublicInterests(): Promise<Interest[]> {
  const res = await axios.get("/public/interests");
  return res.data.data;
}
