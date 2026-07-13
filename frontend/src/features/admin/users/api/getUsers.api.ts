import axios from "@/lib/axios";
import type { User, UserFilters } from "../types/user.type";

export async function getUsers(filters?: UserFilters): Promise<User[]> {
  const res = await axios.get("/admin/users", {
    params: {
      search: filters?.search,
      role: filters?.user_type,
      status: filters?.account_status,
    },
  });

  const users = Array.isArray(res.data.data) ? res.data.data : res.data.data.data;

  return users.map((user: User) => ({
    ...user,
    user_type: user.user_type ?? user.role ?? "tourist",
    account_status: user.account_status ?? user.status ?? "active",
  }));
}
