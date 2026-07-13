import type { AccountStatus, User } from "../types/user.type";

interface UserTableProps {
  users: User[];
  onStatusChange: (id: number, status: AccountStatus) => void;
  isUpdating?: boolean;
}

const statusConfig: Record<AccountStatus, { label: string; color: string }> = {
  active: { label: "Active", color: "bg-green-100 text-green-700" },
  blocked: { label: "Blocked", color: "bg-red-100 text-red-700" },
  unavailable: { label: "Unavailable", color: "bg-gray-100 text-gray-700" },
  closed: { label: "Closed", color: "bg-orange-100 text-orange-700" },
};

const userTypeConfig: Record<"admin" | "guide" | "tourist", { label: string }> = {
  admin: { label: "Admin" },
  guide: { label: "Guide" },
  tourist: { label: "Tourist" },
};

export default function UserTable({ users, onStatusChange, isUpdating }: UserTableProps) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-purple-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">Users</h3>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border">#</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Change Status</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-3 border text-center text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user, index) => {
              const accountStatus = user.account_status ?? user.status ?? "active";
              const userType = user.user_type ?? user.role ?? "tourist";

              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.phone || "-"}</td>
                  <td className="p-3 border">{userTypeConfig[userType].label}</td>
                  <td className="p-3 border">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[accountStatus].color}`}>
                      {statusConfig[accountStatus].label}
                    </span>
                  </td>
                  <td className="p-3 border">
                    <select
                      value={accountStatus}
                      onChange={(e) => onStatusChange(user.id, e.target.value as AccountStatus)}
                      disabled={isUpdating}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                    >
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                      <option value="unavailable">Unavailable</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
