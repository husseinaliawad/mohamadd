import axios from "@/lib/axios";

export async function deleteInterest(id: number): Promise<void> {
  await axios.delete(`/admin/interests/${id}`);
}
