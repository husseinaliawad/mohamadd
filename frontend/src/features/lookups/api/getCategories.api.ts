import axios from "@/lib/axios";

export interface Category {
  id: number;
  name: string;
}

export async function getPublicCategories(): Promise<Category[]> {
  const res = await axios.get("/public/categories");
  return res.data.data;
}
