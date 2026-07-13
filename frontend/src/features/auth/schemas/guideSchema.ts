import { z } from "zod";

export const guideSchema = z
  .object({
    name: z.string({
      required_error: "الاسم مطلوب",
    }).min(2, { message: "الاسم قصير جداً" }),

    email: z.string({
      required_error: "البريد مطلوب",
    }).email("البريد غير صالح"),

    password: z.string({
      required_error: "كلمة المرور مطلوبة",
    }).min(6, { message: "كلمة المرور قصيرة" }),

    password_confirmation: z.string({
      required_error: "تأكيد كلمة المرور مطلوب",
    }),

    gender: z.enum(["M", "F"], {
      required_error: "الرجاء اختيار الجنس",
    }),

    languages: z.array(z.number()),

    DOB: z.string({
      required_error: "تاريخ الميلاد مطلوب",
    }),

    phone: z.string({
      required_error: "رقم الهاتف مطلوب",
    }).min(8, { message: "رقم الهاتف غير صالح" }),

    daily_price: z.preprocess(
      (val) => Number(val),
      z.number({
        required_error: "السعر مطلوب",
        invalid_type_error: "السعر يجب أن يكون رقمًا",
      }).min(1, { message: "السعر غير صالح" })
    ),

    bio: z.string({
      required_error: "السيرة مطلوبة",
    }).min(10, { message: "السيرة قصيرة جداً" }),

    avatar: z
      .custom<FileList | File | undefined>()
      .refine(
        (file) =>
          !file ||
          file instanceof File ||
          (file instanceof FileList && file.length > 0),
        "الرجاء اختيار صورة صحيحة"
      ),
    role: z.enum(["tourist", "guide"]),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["password_confirmation"],
  });

export type GuideFormData = z.infer<typeof guideSchema>;
