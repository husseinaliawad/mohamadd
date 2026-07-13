import axios from "@/lib/axios";
import type { UpdateUserStatusData } from "../types/user.type";

export async function updateUserStatus(id: number, data: UpdateUserStatusData): Promise<void> {
  await axios.patch(`/admin/users/${id}/status`, data);
}
