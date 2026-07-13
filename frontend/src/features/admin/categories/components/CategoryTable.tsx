import type { Category } from "../types/category.type";
import { Pencil, Trash2 } from "lucide-react";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

export default function CategoryTable({ categories, onEdit, onDelete, isDeleting }: CategoryTableProps) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-purple-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">أنواع الأماكن</h3>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border">#</th>
            <th className="p-3 border">اسم التصنيف</th>
            <th className="p-3 border">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-3 border text-center text-gray-500">
                لا توجد تصنيفات
              </td>
            </tr>
          ) : (
            categories.map((category, index) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{category.name}</td>
                <td className="p-3 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(category.id)}
                      disabled={isDeleting}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="حذف"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
