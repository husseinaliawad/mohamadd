import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ChangeEvent } from "react";
import FormField from "../../../../components/FormField";
import { citySchema, type CitySchema } from "../schemas/citySchema";
import type { CityFormData } from "../types/city.type";

interface CityFormProps {
  onSubmit: (data: CityFormData) => void;
  defaultValues?: CityFormData;
  isSubmitting?: boolean;
}

export default function CityForm({ onSubmit, defaultValues, isSubmitting }: CityFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CitySchema>({
    resolver: zodResolver(citySchema),
    defaultValues: defaultValues || { name: "", description: "", image: undefined },
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setValue("image", file as unknown as undefined, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="اسم المدينة" name="name" register={register} errors={errors} />
      <FormField label="الوصف (اختياري)" name="description" register={register} errors={errors} type="textarea" />
      <FormField
        label="صورة المدينة (اختياري)"
        name="image"
        register={register}
        errors={errors}
        type="file"
        inputProps={{ accept: "image/*", onChange: handleImageChange }}
      />

      {defaultValues?.image && typeof defaultValues.image === 'string' && (
        <p className="text-sm text-gray-500">
          الصورة الحالية: {defaultValues.image}
        </p>
      )}

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
