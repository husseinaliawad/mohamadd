import axios from "@/lib/axios";

export async function deleteDestination(id: number): Promise<void> {
  await axios.delete(`/admin/places/${id}`);
}
