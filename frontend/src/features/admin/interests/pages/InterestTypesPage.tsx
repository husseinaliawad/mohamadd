import { useState } from "react";
import AdminModal from "../../../../components/AdminModal";
import { useInterests } from "../hooks/useInterestTypes";
import InterestTable from "../components/InterestTypeTable";
import InterestForm from "../components/InterestTypeForm";
import type { Interest, InterestFormData } from "../types/interestType.type";

export default function InterestsPage() {
  const {
    interests,
    isLoading,
    createInterest,
    updateInterest,
    deleteInterest,
    isCreating,
    isUpdating,
    isDeleting,
  } = useInterests();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInterest, setEditingInterest] = useState<Interest | null>(null);

  const handleFormSubmit = (data: InterestFormData) => {
    if (editingInterest) {
      updateInterest({ id: editingInterest.id, data });
    } else {
      createInterest(data);
    }
    setIsFormOpen(false);
    setEditingInterest(null);
  };

  const handleEdit = (interest: Interest) => {
    setEditingInterest(interest);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الاهتمام؟")) {
      deleteInterest(id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingInterest(null);
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">إدارة الاهتمامات</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          إضافة اهتمام جديد
        </button>
      </div>

      <InterestTable
        interests={interests}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />

      <AdminModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingInterest ? "تعديل الاهتمام" : "إضافة اهتمام جديد"}
      >
        <InterestForm
          onSubmit={handleFormSubmit}
          defaultValues={editingInterest ? {
            name: editingInterest.name,
            question: editingInterest.question
          } : undefined}
          isSubmitting={isCreating || isUpdating}
        />
      </AdminModal>
    </div>
  );
}
