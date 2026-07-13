export type UserType = "admin" | "guide" | "tourist";
export type AccountStatus = "active" | "blocked" | "unavailable" | "closed";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: UserType;
  status?: AccountStatus;
  user_type: UserType;
  account_status: AccountStatus;
  created_at?: string;
  updated_at?: string;
}

export interface UserFilters {
  user_type?: UserType;
  account_status?: AccountStatus;
  search?: string;
}

export interface UpdateUserStatusData {
  status: AccountStatus;
}
