import axios from "@/lib/axios";

export async function deleteLanguage(id: number): Promise<void> {
  await axios.delete(`/admin/languages/${id}`);
}
