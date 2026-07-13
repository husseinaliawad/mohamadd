import type { Language } from "../types/language.type";
import { Pencil, Trash2 } from "lucide-react";

interface LanguageTableProps {
  languages: Language[];
  onEdit: (language: Language) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

export default function LanguageTable({ languages, onEdit, onDelete, isDeleting }: LanguageTableProps) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-purple-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">اللغات</h3>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border">#</th>
            <th className="p-3 border">اسم اللغة</th>
            <th className="p-3 border">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {languages.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-3 border text-center text-gray-500">
                لا توجد لغات
              </td>
            </tr>
          ) : (
            languages.map((language, index) => (
              <tr key={language.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{language.name}</td>
                <td className="p-3 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(language)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(language.id)}
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
