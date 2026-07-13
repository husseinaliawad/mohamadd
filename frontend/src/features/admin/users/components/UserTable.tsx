import type { User, AccountStatus } from "../types/user.type";
import useAuthStore from "@/features/auth/store/authStore";

interface UserTableProps {
  users: User[];
  onStatusChange: (id: number, status: AccountStatus) => void;
  onMakeAdmin?: (id: number) => void;
  isUpdating?: boolean;
}

const statusConfig: Record<AccountStatus, { label: string; color: string }> = {
  active: { label: "نشط", color: "bg-green-100 text-green-700" },
  blocked: { label: "محجوب", color: "bg-gray-100 text-gray-700" },
  unavailable: { label: "غير متاح", color: "bg-red-100 text-red-700" },
  closed: { label: "مغلق", color: "bg-orange-100 text-orange-700" },
};

const userTypeConfig: Record<"guide" | "tourist" | "admin", { label: string }> = {
  guide: { label: "مرشد" },
  tourist: { label: "سائح" },
  admin: { label: "مدير نظام" },
};

export default function UserTable({ users, onStatusChange, onMakeAdmin, isUpdating }: UserTableProps) {
  const { user: currentUser } = useAuthStore();
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-purple-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">المستخدمون</h3>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border">#</th>
            <th className="p-3 border">الاسم</th>
            <th className="p-3 border">البريد الإلكتروني</th>
            <th className="p-3 border">الهاتف</th>
            <th className="p-3 border">نوع المستخدم</th>
            <th className="p-3 border">حالة الحساب</th>
            <th className="p-3 border">تغيير الحالة</th>
            <th className="p-3 border">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-3 border text-center text-gray-500">
                لا يوجد مستخدمين
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.phone || "-"}</td>                
                <td className="p-3 border">{userTypeConfig[user.role].label}</td>
                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[user.status].color}`}
                  >
                    {statusConfig[user.status].label}
                  </span>
                </td>
                <td className="p-3 border">
                  <select
                    value={user.status}
                    onChange={(e) => onStatusChange(user.id, e.target.value as AccountStatus)}
                    disabled={isUpdating || user.id === currentUser?.id}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                  >
                    <option value="active">نشط</option>
                    <option value="blocked"> محجوب</option>
                    <option value="unavailable">غير متاح</option>
                    <option value="closed"> مغلق</option>
                  </select>
                </td>
                <td className="p-3 border">
                  {user.role === "tourist" && onMakeAdmin && user.id !== currentUser?.id && (
                    <button
                      onClick={() => {
                        if (window.confirm("هل أنت متأكد من تحويل هذا المستخدم إلى مدير نظام؟")) {
                          onMakeAdmin(user.id);
                        }
                      }}
                      disabled={isUpdating}
                      className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      تحويل إلى آدمن
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
