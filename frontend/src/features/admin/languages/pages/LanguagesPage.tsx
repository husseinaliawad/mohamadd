import { useState } from "react";
import AdminModal from "../../../../components/AdminModal";
import { useLanguages } from "../hooks/useLanguages";
import LanguageTable from "../components/LanguageTable";
import LanguageForm from "../components/LanguageForm";
import type { Language, LanguageFormData } from "../types/language.type";

export default function LanguagesPage() {
  const {
    languages,
    isLoading,
    createLanguage,
    updateLanguage,
    deleteLanguage,
    isCreating,
    isUpdating,
    isDeleting,
  } = useLanguages();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);

  const handleFormSubmit = (data: LanguageFormData) => {
    if (editingLanguage) {
      updateLanguage({ id: editingLanguage.id, data });
    } else {
      createLanguage(data);
    }
    setIsFormOpen(false);
    setEditingLanguage(null);
  };

  const handleEdit = (language: Language) => {
    setEditingLanguage(language);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه اللغة؟")) {
      deleteLanguage(id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingLanguage(null);
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
        <h1 className="text-2xl font-bold text-gray-900">إدارة اللغات</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          إضافة لغة جديدة
        </button>
      </div>

      <LanguageTable
        languages={languages}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />

      <AdminModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingLanguage ? "تعديل اللغة" : "إضافة لغة جديدة"}
      >
        <LanguageForm
          onSubmit={handleFormSubmit}
          defaultValues={editingLanguage ? { name: editingLanguage.name } : undefined}
          isSubmitting={isCreating || isUpdating}
        />
      </AdminModal>
    </div>
  );
}
