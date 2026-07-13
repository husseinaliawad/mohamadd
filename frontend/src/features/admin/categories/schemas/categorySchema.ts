import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "اسم التصنيف مطلوب"),
});

export type CategorySchema = z.infer<typeof categorySchema>;
