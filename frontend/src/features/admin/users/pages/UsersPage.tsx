import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import UserFilters from "../components/UserFilters";
import UserTable from "../components/UserTable";
import type { UserFilters as UserFiltersType, AccountStatus } from "../types/user.type";

export default function UsersPage() {
  const [filters, setFilters] = useState<UserFiltersType>({});
  const { users, isLoading, updateUserStatus, makeAdmin, isUpdating } = useUsers(filters);

  const handleStatusChange = (id: number, status: AccountStatus) => {
    updateUserStatus({ id, data: { status } });
  };

  const handleMakeAdmin = (id: number) => {
    makeAdmin(id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h1>

      <UserFilters filters={filters} onFiltersChange={setFilters} />

      <UserTable
        users={users}
        onStatusChange={handleStatusChange}
        onMakeAdmin={handleMakeAdmin}
        isUpdating={isUpdating}
      />
    </div>
  );
}
