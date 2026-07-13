import { z } from "zod";

export const languageSchema = z.object({
  name: z.string().min(1, "اسم اللغة مطلوب"),
});

export type LanguageSchema = z.infer<typeof languageSchema>;
