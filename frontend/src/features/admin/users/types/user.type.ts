export type Role = "guide" | "tourist";
export type AccountStatus = "active" | "blocked" | "unavailable" | "closed";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  status: AccountStatus;
  created_at?: string;
  updated_at?: string;
}

export interface UserFilters {
  role?: Role;
  status?: AccountStatus;
  search?: string;
}

export interface UpdateUserStatusData {
  status: AccountStatus;
}
