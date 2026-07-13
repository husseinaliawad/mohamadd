import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../../../components/FormField";
import { interestSchema, type InterestSchema } from "../schemas/interestTypeSchema";
import type { InterestFormData } from "../types/interestType.type";

interface InterestFormProps {
  onSubmit: (data: InterestFormData) => void;
  defaultValues?: InterestFormData;
  isSubmitting?: boolean;
}

export default function InterestForm({ onSubmit, defaultValues, isSubmitting }: InterestFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InterestSchema>({
    resolver: zodResolver(interestSchema),
    defaultValues: defaultValues || { name: "", question: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="اسم الاهتمام" name="name" register={register} errors={errors} />
      <FormField label="السؤال" name="question" register={register} errors={errors} type="textarea" />

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
