import { z } from "zod";

export const interestSchema = z.object({
  name: z.string().min(1, "اسم الاهتمام مطلوب"),
  question: z.string().min(1, "السؤال مطلوب"),
});

export type InterestSchema = z.infer<typeof interestSchema>;
