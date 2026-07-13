import { z } from "zod";

export const citySchema = z.object({
  name: z.string().min(1, "اسم المدينة مطلوب"),
  description: z.string().optional(),
  image: z.any().optional(),
});

export type CitySchema = z.infer<typeof citySchema>;
