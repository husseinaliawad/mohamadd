import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("بريد الكتروني غير صحيح"),
  password: z.string().min(6, "يجب أن تكون على الأقل 6 محارف"),
});

export type LoginFormData = z.infer<typeof loginSchema>;