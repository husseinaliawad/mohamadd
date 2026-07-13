import axios from "@/lib/axios";
import type { CategoryFormData } from "../types/category.type";

export async function createCategory(data: CategoryFormData): Promise<void> {
  await axios.post("/admin/categories", data);
}
