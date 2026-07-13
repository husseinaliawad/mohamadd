import axios from "@/lib/axios";

export async function deleteCity(id: number): Promise<void> {
  await axios.delete(`/admin/cities/${id}`);
}
