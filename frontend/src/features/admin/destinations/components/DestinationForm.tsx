import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../../../components/FormField";
import { destinationSchema, type DestinationSchema } from "../schemas/destinationSchema";
import type { DestinationFormData } from "../types/destination.type";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "../../cities/api/getCities.api";
import { getCategories } from "../../categories/api/getCategories.api";
import { getInterests } from "../../interests/api/getInterestTypes.api";

interface DestinationFormProps {
  onSubmit: (data: DestinationFormData) => void;
  defaultValues?: Partial<DestinationFormData>;
  isSubmitting?: boolean;
}

export default function DestinationForm({ onSubmit, defaultValues, isSubmitting }: DestinationFormProps) {
  const { data: cities } = useQuery({
    queryKey: ["admin-cities"],
    queryFn: getCities,
  });

  const { data: categories } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: getCategories,
  });

  const { data: interests } = useQuery({
    queryKey: ["admin-interests"],
    queryFn: getInterests,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<DestinationSchema>({
    resolver: zodResolver(destinationSchema),
    defaultValues: defaultValues || {
      city_id: 0,
      category_id: 0,
      name: "",
      description: "",
      phone: "",
      address: "",
      cost: 0,
      expected_duration_minutes: 0,
      activity_level: "",
      is_outdoor: false,
      best_seasons: [],
      recommended_times: [],
      opening_hours: "",
      average_rating: 0,
      reviews_count: 0,
      latitude: 0,
      longitude: 0,
      images: [],
      interests: [],
    },
  });

  const selectedInterests = watch("interests") || [];

  const toggleInterest = (interestId: number) => {
    const currentInterests = selectedInterests || [];
    if (currentInterests.includes(interestId)) {
      setValue("interests", currentInterests.filter((id) => id !== interestId));
    } else {
      setValue("interests", [...currentInterests, interestId]);
    }
  };

  const toggleSeason = (season: string) => {
    const currentSeasons = watch("best_seasons") || [];
    if (currentSeasons.includes(season)) {
      setValue("best_seasons", currentSeasons.filter((s) => s !== season));
    } else {
      setValue("best_seasons", [...currentSeasons, season]);
    }
  };

  const toggleTime = (time: string) => {
    const currentTimes = watch("recommended_times") || [];
    if (currentTimes.includes(time)) {
      setValue("recommended_times", currentTimes.filter((t) => t !== time));
    } else {
      setValue("recommended_times", [...currentTimes, time]);
    }
  };

  const seasons = ["الربيع", "الصيف", "الخريف", "الشتاء"];
  const times = ["صباحاً", "ظهراً", "عصراً", "مساءً"];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="اسم المكان *" name="name" register={register} errors={errors} />

        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1">
            المدينة *
          </label>
          <select
            {...register("city_id", { valueAsNumber: true })}
            className="w-full rounded-lg border border-primary-200 bg-white px-3 py-2 text-right text-gray-700 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          >
            <option value="">اختر المدينة</option>
            {cities?.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {errors.city_id && <p className="text-red-500 text-sm mt-1">{errors.city_id.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1">
            الفئة *
          </label>
          <select
            {...register("category_id", { valueAsNumber: true })}
            className="w-full rounded-lg border border-primary-200 bg-white px-3 py-2 text-right text-gray-700 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          >
            <option value="">اختر الفئة</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>}
        </div>

        <FormField label="رقم الهاتف" name="phone" register={register} errors={errors} type="tel" />
        <FormField label="العنوان" name="address" register={register} errors={errors} />
        <FormField label="التكلفة" name="cost" register={register} errors={errors} type="number" options={{ valueAsNumber: true }} />
        <FormField label="المدة المتوقعة (دقائق)" name="expected_duration_minutes" register={register} errors={errors} type="number" options={{ valueAsNumber: true }} />

        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1">
            مستوى النشاط
          </label>
          <select
            {...register("activity_level")}
            className="w-full rounded-lg border border-primary-200 bg-white px-3 py-2 text-right text-gray-700 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          >
            <option value="">اختر مستوى النشاط</option>
            <option value="low">منخفض</option>
            <option value="medium">متوسط</option>
            <option value="high">عالي</option>
          </select>
        </div>

        <FormField label="ساعات العمل" name="opening_hours" register={register} errors={errors} />

        <FormField label="متوسط التقييم" name="average_rating" register={register} errors={errors} type="number" options={{ valueAsNumber: true }} />
        <FormField label="عدد المراجعات" name="reviews_count" register={register} errors={errors} type="number" options={{ valueAsNumber: true }} />
        <FormField label="خط العرض" name="latitude" register={register} errors={errors} type="number" options={{ valueAsNumber: true }} />
        <FormField label="خط الطول" name="longitude" register={register} errors={errors} type="number" options={{ valueAsNumber: true }} />
      </div>

      <FormField label="الوصف" name="description" register={register} errors={errors} type="textarea" />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("is_outdoor")}
          className="h-4 w-4 rounded border-primary-300 text-primary-600 focus:ring-primary-500"
        />
        <label className="text-sm font-medium text-gray-700">
          نشاط في الهواء الطلق
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          أفضل المواسم
        </label>
        <div className="flex flex-wrap gap-2">
          {seasons.map((season) => (
            <button
              key={season}
              type="button"
              onClick={() => toggleSeason(season)}
              className={`rounded-lg border px-4 py-2 transition-colors ${
                watch("best_seasons")?.includes(season)
                  ? "border-primary-500 bg-primary-600 text-white"
                  : "border-primary-200 bg-white text-gray-700 hover:bg-primary-50"
              }`}
            >
              {season}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الأوقات الموصى بها
        </label>
        <div className="flex flex-wrap gap-2">
          {times.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => toggleTime(time)}
              className={`rounded-lg border px-4 py-2 transition-colors ${
                watch("recommended_times")?.includes(time)
                  ? "border-primary-500 bg-primary-600 text-white"
                  : "border-primary-200 bg-white text-gray-700 hover:bg-primary-50"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الاهتمامات
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {interests?.map((interest) => (
            <button
              key={interest.id}
              type="button"
              onClick={() => toggleInterest(interest.id)}
              className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                selectedInterests.includes(interest.id)
                  ? "border-primary-500 bg-primary-600 text-white"
                  : "border-primary-200 bg-white text-gray-700 hover:bg-primary-50"
              }`}
            >
              {interest.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          الصور
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          {...register("images")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

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
