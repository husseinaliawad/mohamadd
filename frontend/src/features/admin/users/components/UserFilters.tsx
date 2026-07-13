import type { AccountStatus, UserFilters, UserType } from "../types/user.type";

interface UserFiltersProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
}

export default function UserFilters({ filters, onFiltersChange }: UserFiltersProps) {
  return (
    <div className="bg-white shadow rounded-xl p-4 border border-purple-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            placeholder="Name or email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            value={filters.user_type || ""}
            onChange={(e) => onFiltersChange({ ...filters, user_type: (e.target.value as UserType) || undefined })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All</option>
            <option value="admin">Admin</option>
            <option value="guide">Guide</option>
            <option value="tourist">Tourist</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filters.account_status || ""}
            onChange={(e) => onFiltersChange({ ...filters, account_status: (e.target.value as AccountStatus) || undefined })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
            <option value="unavailable">Unavailable</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => onFiltersChange({})}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
