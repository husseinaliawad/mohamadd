import { useState } from "react";
import AdminModal from "../../../../components/AdminModal";
import { useCategories } from "../hooks/useCategories";
import CategoryTable from "../components/CategoryTable";
import CategoryForm from "../components/CategoryForm";
import type { Category, CategoryFormData } from "../types/category.type";

export default function CategoriesPage() {
  const {
    categories,
    isLoading,
    createCategory,
    updateCategory,
    deleteCategory,
    isCreating,
    isUpdating,
    isDeleting,
  } = useCategories();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleFormSubmit = (data: CategoryFormData) => {
    if (editingCategory) {
      updateCategory({ id: editingCategory.id, data });
    } else {
      createCategory(data);
    }
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا التصنيف؟")) {
      deleteCategory(id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
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
        <h1 className="text-2xl font-bold text-gray-900">إدارة أنواع الأماكن</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          إضافة تصنيف جديد
        </button>
      </div>

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />

      <AdminModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingCategory ? "تعديل التصنيف" : "إضافة تصنيف جديد"}
      >
        <CategoryForm
          onSubmit={handleFormSubmit}
          defaultValues={editingCategory ? { name: editingCategory.name } : undefined}
          isSubmitting={isCreating || isUpdating}
        />
      </AdminModal>
    </div>
  );
}
