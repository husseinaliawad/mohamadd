import type { SuggestedPlace } from "../types/suggestedPlace.type";
import { X } from "lucide-react";

interface SuggestedPlaceDetailsProps {
  place: SuggestedPlace | null;
  onClose: () => void;
}

export default function SuggestedPlaceDetails({ place, onClose }: SuggestedPlaceDetailsProps) {
  if (!place) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">تفاصيل الاقتراح</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اسم المكان (عربي)</label>
            <p className="text-gray-900">{place.place_name_ar}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اسم المكان (إنجليزي)</label>
            <p className="text-gray-900">{place.place_name}</p>
          </div>
          
          {place.description && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
              <p className="text-gray-900">{place.description}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم المستخدم</label>
              <p className="text-gray-900">{place.user_name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نوع المستخدم</label>
              <p className="text-gray-900">{place.user_type === "guide" ? "مرشد" : "سائح"}</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الاقتراح</label>
            <p className="text-gray-900">
              {place.created_at ? new Date(place.created_at).toLocaleDateString('ar-EG') : '-'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
            <p className="text-gray-900">
              {place.status === "pending" ? "قيد المراجعة" : 
               place.status === "approved" ? "مقبول" : "مرفوض"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
