import { z } from "zod";

export const destinationSchema = z.object({
  city_id: z.number().min(1, "المدينة مطلوبة"),
  category_id: z.number().min(1, "الفئة مطلوبة"),
  name: z.string().min(1, "اسم المكان مطلوب"),
  description: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  cost: z.number().optional(),
  expected_duration_minutes: z.number().optional(),
  activity_level: z.string().optional(),
  is_outdoor: z.boolean().optional(),
  best_seasons: z.array(z.string()).optional(),
  recommended_times: z.array(z.string()).optional(),
  opening_hours: z.string().optional(),
  average_rating: z.number().min(0).max(5).optional(),
  reviews_count: z.number().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  images: z.array(z.any()).optional(),
  interests: z.array(z.number()).optional(),
});

export type DestinationSchema = z.infer<typeof destinationSchema>;
