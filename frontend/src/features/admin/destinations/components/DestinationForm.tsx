import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../../../components/FormField";
import { destinationSchema, type DestinationSchema } from "../schemas/destinationSchema";
import type { DestinationFormData } from "../types/destination.type";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "../../cities/api/getCities.api";
import { getCategories } from "../../categories/api/getCategories.api";
import { getInterests } from "../../interests/api/getInterestTypes.api";
import { useState } from "react";
import { X } from "lucide-react";

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

  const [existingImages, setExistingImages] = useState<string[]>(defaultValues?.existing_images || []);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

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
      activity_level: undefined,
      is_outdoor: false,
      best_seasons: [],
      recommended_times: [],
      opening_hours: undefined,
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

  const handleFormSubmit = (data: DestinationSchema) => {
    const formData = {
      ...data,
      existing_images: existingImages,
      images_to_delete: imagesToDelete,
    } as DestinationFormData;
    onSubmit(formData);
  };

  const handleRemoveExistingImage = (index: number) => {
    setImagesToDelete([...imagesToDelete, index]);
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      Array.from(files).forEach((file) => {
        const preview = URL.createObjectURL(file);
        newPreviews.push(preview);
      });
      setNewImagePreviews([...newImagePreviews, ...newPreviews]);
    }
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImagePreviews(newImagePreviews.filter((_, i) => i !== index));
    // Note: File input cannot be easily manipulated, so we just remove from preview
    // The actual file removal will be handled by re-setting the input
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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
            <option value="relax">استرخاء</option>
            <option value="sensible">معتدل</option>
            <option value="vigour">نشط</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1">
            ساعات العمل
          </label>
          <input
            type="text"
            {...register("opening_hours")}
            className="w-full rounded-lg border border-primary-200 bg-white px-3 py-2 text-right text-gray-700 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            placeholder="مثال: 9:00 - 17:00 (يمكن إضافة عدة ساعات)"
          />
          <p className="text-xs text-gray-500 mt-1">يمكنك إضافة عدة فترات عمل بفصلها بفاصلة</p>
        </div>

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
        
        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">الصور الحالية:</p>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {existingImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Existing image ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Image Previews */}
        {newImagePreviews.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">صور جديدة:</p>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {newImagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`New image ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          multiple
          {...register("images")}
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">يمكنك رفع صور متعددة</p>
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
