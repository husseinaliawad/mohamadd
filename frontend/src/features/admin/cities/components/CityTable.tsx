import type { City } from "../types/city.type";
import { Pencil, Trash2 } from "lucide-react";

interface CityTableProps {
  cities: City[];
  onEdit: (city: City) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

export default function CityTable({ cities, onEdit, onDelete, isDeleting }: CityTableProps) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-purple-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">المدن</h3>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border">#</th>
            <th className="p-3 border">اسم المدينة</th>
            <th className="p-3 border">الوصف</th>
            <th className="p-3 border">الصورة</th>
            <th className="p-3 border">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {cities.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-3 border text-center text-gray-500">
                لا توجد مدن
              </td>
            </tr>
          ) : (
            cities.map((city, index) => (
              <tr key={city.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{city.name}</td>
                <td className="p-3 border">{city.description || "-"}</td>
                <td className="p-3 border">
                  {city.image ? (
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(city)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(city.id)}
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
