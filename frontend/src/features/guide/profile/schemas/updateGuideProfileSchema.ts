import { z } from "zod";

export const updateGuideProfileSchema = z.object({
  name: z.string().min(3, "يجب أن يحتوي الاسم على 3 أحرف على الأقل"),

   gender: z.enum(["M", "F"], {
    errorMap: () => ({ message: "الرجاء اختيار الجنس بشكل صحيح" }),
  }),

  phone: z.string().min(10, "رقم الهاتف غير صالح"),

  DOB: z.string().min(1, "تاريخ الميلاد مطلوب"),

  daily_price: z.coerce.number().min(1, "يجب أن يكون السعر أكبر من صفر"),

  status: z.string().min(1, "الرجاء اختيار الحالة"),

  bio: z.string().min(20, "يجب أن يحتوي الوصف على 20 حرفاً على الأقل"),

  languages: z.array(z.number()).min(1, "يجب اختيار لغة واحدة على الأقل"),

  cities: z.array(z.number()).min(1, "يجب اختيار مدينة واحدة على الأقل"),

  avatar: z
    .any()
    .refine(
      (file) =>
        file === undefined ||
        file === "" ||
        (file instanceof FileList && file.length > 0),
      "الصورة غير صالحة"
    )
    .optional(),
});

export type UpdateGuideProfileForm = z.infer<typeof updateGuideProfileSchema>;
