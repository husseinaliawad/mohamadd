import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../../../components/FormField";
import { categorySchema, type CategorySchema } from "../schemas/categorySchema";
import type { CategoryFormData } from "../types/category.type";

interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => void;
  defaultValues?: CategoryFormData;
  isSubmitting?: boolean;
}

export default function CategoryForm({ onSubmit, defaultValues, isSubmitting }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultValues || { name: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="اسم التصنيف" name="name" register={register} errors={errors} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-linear-to-r from-primary-600 to-secondary-500 px-4 py-2 text-white transition-colors hover:from-primary-700 hover:to-secondary-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "جاري الحفظ..." : defaultValues ? "تحديث" : "إضافة"}
      </button>
    </form>
  );
}
