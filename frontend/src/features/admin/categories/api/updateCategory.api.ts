import axios from "@/lib/axios";
import type { CategoryFormData } from "../types/category.type";

export async function updateCategory(id: number, data: CategoryFormData): Promise<void> {
  await axios.put(`/admin/categories/${id}`, data);
}
