import type { SuggestedPlace, SuggestionStatus } from "../types/suggestedPlace.type";
import { Check, X, Eye } from "lucide-react";

interface SuggestedPlaceTableProps {
  suggestedPlaces: SuggestedPlace[];
  onApprove: (id: number, adminNotes?: string) => void;
  onReject: (id: number, adminNotes?: string) => void;
  onView: (place: SuggestedPlace) => void;
  isUpdating?: boolean;
}

const statusConfig: Record<SuggestionStatus, { label: string; color: string }> = {
  pending: { label: "قيد المراجعة", color: "bg-orange-100 text-orange-700" },
  approved: { label: "مقبول", color: "bg-green-100 text-green-700" },
  rejected: { label: "مرفوض", color: "bg-red-100 text-red-700" },
};

const userTypeConfig: Record<"admin" | "guide" | "tourist", { label: string }> = {
  admin: { label: "Admin" },
  guide: { label: "مرشد" },
  tourist: { label: "سائح" },
};

export default function SuggestedPlaceTable({ suggestedPlaces, onApprove, onReject, onView, isUpdating }: SuggestedPlaceTableProps) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-purple-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">اقتراحات الأماكن</h3>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border">#</th>
            <th className="p-3 border">اسم المكان</th>
            <th className="p-3 border">المدينة</th>
            <th className="p-3 border">اسم المستخدم</th>
            <th className="p-3 border">نوع المستخدم</th>
            <th className="p-3 border">تاريخ الاقتراح</th>
            <th className="p-3 border">الحالة</th>
            <th className="p-3 border">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {suggestedPlaces.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-3 border text-center text-gray-500">
                لا توجد اقتراحات
              </td>
            </tr>
          ) : (
            suggestedPlaces.map((place, index) => (
              <tr key={place.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{place.name}</td>
                <td className="p-3 border">{place.city?.name || place.city_id || "-"}</td>
                <td className="p-3 border">{place.user_name || place.user?.name || "-"}</td>
                <td className="p-3 border">{userTypeConfig[place.user_type || place.user?.role || "tourist"].label}</td>
                <td className="p-3 border">
                  {place.created_at ? new Date(place.created_at).toLocaleDateString('ar-EG') : '-'}
                </td>
                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${(statusConfig[place.status] ?? statusConfig.pending).color}`}
                  >
                    {(statusConfig[place.status] ?? statusConfig.pending).label}
                  </span>
                </td>
                <td className="p-3 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onView(place)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="عرض التفاصيل"
                    >
                      <Eye size={18} />
                    </button>
                    {place.status === "pending" && (
                      <>
                        <button
                          onClick={() => {
                            const notes = prompt("يرجى إدخال ملاحظاتك (اختياري):");
                            onApprove(place.id, notes || undefined);
                          }}
                          disabled={isUpdating}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                          title="قبول"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => {
                            const notes = prompt("يرجى إدخال سبب الرفض:");
                            if (notes) onReject(place.id, notes);
                          }}
                          disabled={isUpdating}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="رفض"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
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
