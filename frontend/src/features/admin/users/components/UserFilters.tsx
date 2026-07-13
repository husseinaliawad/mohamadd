import type { UserFilters, UserType, AccountStatus } from "../types/user.type";

interface UserFiltersProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
}

export default function UserFilters({ filters, onFiltersChange }: UserFiltersProps) {
  return (
    <div className="bg-white shadow rounded-xl p-4 border border-purple-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">البحث</label>
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            placeholder="اسم أو بريد إلكتروني"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">نوع المستخدم</label>
          <select
            value={filters.user_type || ""}
            onChange={(e) => onFiltersChange({ ...filters, user_type: e.target.value as UserType || undefined })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">الكل</option>
            <option value="guide">مرشد</option>
            <option value="tourist">سائح</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">حالة الحساب</label>
          <select
            value={filters.account_status || ""}
            onChange={(e) => onFiltersChange({ ...filters, account_status: e.target.value as AccountStatus || undefined })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">الكل</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
            <option value="suspended">معلق</option>
            <option value="pending">قيد المراجعة</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => onFiltersChange({})}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            إعادة تعيين
          </button>
        </div>
      </div>
    </div>
  );
}
