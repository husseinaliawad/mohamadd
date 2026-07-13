import { z } from "zod";
 
export const guideBookSchema = z.object({   
  start_date: z.string().transform(val => new Date(val))
  .refine(
    (date) => date > new Date(),
    { message: "يجب أن يكون التاريخ في المستقبل" }
  ),
  day_count: z
    .number({
      required_error: "عدد الأيام مطلوب",
      invalid_type_error: "عدد الأيام يجب أن يكون رقمًا",
    })
    .min(1, "يجب أن يكون يومًا واحدًا على الأقل")
    .max(30, "الحد الأقصى 30 يومًا"),

  description: z.string().min(1,  "جقل الملاحظة مطلوب")    
});

export type BookingForm = z.input<typeof guideBookSchema>;

/**
 * return type CreateBookingInput = {
  start_date: string;
  day_count: number;
  note?: string;
};
 */