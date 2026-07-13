import axios from "@/lib/axios";

export async function deleteCategory(id: number): Promise<void> {
  await axios.delete(`/admin/categories/${id}`);
}
