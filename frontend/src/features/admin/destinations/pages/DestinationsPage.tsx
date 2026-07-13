import { useState } from "react";
import AdminModal from "../../../../components/AdminModal";
import { useDestinations } from "../hooks/useDestinations";
import DestinationForm from "../components/DestinationForm";
import type { Destination } from "../types/destination.type";

export default function DestinationsPage() {
  const { destinations, isLoading, deleteDestination, isDeleting } = useDestinations();
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleEdit = (destination: Destination) => {
    setEditingDestination(destination);
    setIsFormVisible(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الوجهة السياحية؟")) {
      deleteDestination(id);
    }
  };

  const handleFormClose = () => {
    setEditingDestination(null);
    setIsFormVisible(false);
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">إدارة الأماكن</h1>
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          إضافة مكان جديد
        </button>
      </div>

      <AdminModal
        isOpen={isFormVisible}
        onClose={handleFormClose}
        title={editingDestination ? "تعديل المكان" : "إضافة مكان جديد"}
        maxWidthClassName="max-w-3xl"
      >
        <DestinationForm
          onSubmit={() => {
            handleFormClose();
          }}
          defaultValues={editingDestination ? {
            ...editingDestination,
            images: undefined,
          } : undefined}
          isSubmitting={false}
        />
      </AdminModal>

      <div className="bg-white shadow rounded-xl p-5 border border-purple-200">
        <h3 className="text-xl font-semibold text-primary-900 mb-4">الوجهات السياحية</h3>

        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-primary-50 text-primary-900">
              <th className="p-3 border">#</th>
              <th className="p-3 border">الاسم</th>
              <th className="p-3 border">المدينة</th>
              <th className="p-3 border">الفئة</th>
              <th className="p-3 border">التقييم</th>
              <th className="p-3 border">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {destinations.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-3 border text-center text-gray-500">
                  لا توجد وجهات سياحية
                </td>
              </tr>
            ) : (
              destinations.map((destination, index) => (
                <tr key={destination.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{destination.name}</td>
                  <td className="p-3 border">{destination.city_id}</td>
                  <td className="p-3 border">{destination.category_id}</td>
                  <td className="p-3 border">
                    {destination.average_rating ? (
                      <span className="flex items-center gap-1">
                        <span>⭐</span>
                        <span>{destination.average_rating.toFixed(1)}</span>
                        <span className="text-gray-500 text-sm">({destination.reviews_count})</span>
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-3 border">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(destination)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="تعديل"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(destination.id)}
                        disabled={isDeleting}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="حذف"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
