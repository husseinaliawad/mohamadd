import axios from "@/lib/axios";
import type { User, UserFilters } from "../types/user.type";

export async function getUsers(filters?: UserFilters): Promise<User[]> {
  const res = await axios.get("/admin/users", { params: filters });
  console.log(res.data);
  return res.data.data;
}
