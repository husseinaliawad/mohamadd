import axios from "@/lib/axios";

export async function makeAdmin(id: number): Promise<void> {
  await axios.patch(`/admin/users/${id}/role`);
}
