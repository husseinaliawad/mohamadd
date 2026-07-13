import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateGuideProfileSchema,
  type UpdateGuideProfileForm,
} from "../schemas/updateGuideProfileSchema";

import { useUpdateGuideProfile } from "../hooks/useUpdateGuideProfile";
import { useGetGuideProfile } from "../hooks/useGetGuideProfile";
import { useCities, useLanguages } from "@/features/lookups";

import Select from "react-select";
import FormField from "@/components/FormField";
import { useEffect, useState, useRef } from "react";
import { Camera } from "lucide-react";


export default function GuideProfilePage() {
  const { data: profile, isLoading } = useGetGuideProfile();
  const { data: cities } = useCities();
  const { data: languages } = useLanguages();

  const { mutate, isPending } = useUpdateGuideProfile();

  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<UpdateGuideProfileForm>({
    resolver: zodResolver(updateGuideProfileSchema),
    defaultValues: {
      name: "",
      gender: "M",
      phone: "",
      DOB: "",
      daily_price: 1,
      status: "",
      bio: "",
      languages: [],
      cities: [],
      avatar: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = (data: UpdateGuideProfileForm) => mutate(data);

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name ?? "",
        gender: profile.gender ?? "",
        phone: profile.phone ?? "",
        DOB: profile.DOB ?? "",
        daily_price: profile.daily_price ?? 1,
        status: profile.status ?? "",
        bio: profile.bio ?? "",
        languages: profile.languages?.map((l: any) => Number(l.id)) ?? [],
        cities: profile.cities?.map((c: any) => Number(c.id)) ?? [],
        avatar: "",
      });

      setPreview(profile.avatar);
    }
  }, [profile, reset]);

  if (isLoading) return <p>جاري التحميل...</p>;

  const languageOptions =
    languages?.map((l) => ({ value: Number(l.id), label: l.name })) ?? [];

  const cityOptions =
    cities?.map((c) => ({ value: Number(c.id), label: c.name })) ?? [];

  const rtlStyles = {
    control: (base: any) => ({
      ...base,
      direction: "rtl",
      textAlign: "right",
    }),
    menu: (base: any) => ({
      ...base,
      direction: "rtl",
      textAlign: "right",
    }),
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-primary-400 text-2xl font-bold mb-6 text-center">تعديل الملف الشخصي</h2>

      {/* صورة + زر كاميرا */}
      <div className="flex items-center justify-center gap-4 mb-6">

        {/* صورة المعاينة */}
        <div className="relative">
          <img
            src={preview || "/default-avatar.png"}
            alt="صورة المرشد"
            className="w-32 h-32 rounded-full object-cover border shadow"
          />

          {/* زر كاميرا فوق الصورة (اختياري) */}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <Camera size={18} />
          </button>

        </div>


      </div>


      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* input مخفي */}
        {/* input مخفي محدث ومصلح */}
        <input
          type="file"
          accept="image/*"
          // نقوم بتمرير الـ onChange المدمجة هنا مباشرة بعد فك الـ register
          {...register("avatar", {
            onChange: (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }
          })}
          ref={(e) => {
            register("avatar").ref(e);
            fileInputRef.current = e;
          }}
          className="hidden"
        />


        <FormField label="الاسم" name="name" register={register} errors={errors} />

        <FormField label="رقم الهاتف" name="phone" register={register} errors={errors} />

        <FormField label="السعر اليومي" name="daily_price" register={register} errors={errors} type="number" />

        <FormField label="الجنس" name="gender" register={register} errors={errors}>
          <option value="" hidden>اختر الجنس</option>
          <option value="M">ذكر</option>
          <option value="F">أنثى</option>
        </FormField>

        <FormField label="الحالة" name="status" register={register} errors={errors}>
          <option value="" hidden>اختر الحالة</option>
          <option value="active">متاح</option>
          <option value="unavailable">غير متاح</option>
        </FormField>

        <FormField label="تاريخ الميلاد" name="DOB" register={register} errors={errors} type="date" />

        {/* اللغات */}
        <div>
          <label className="block mb-1 font-medium">اللغات</label>
          <Controller
            control={control}
            name="languages"
            render={({ field }) => (
              <Select
                isMulti
                options={languageOptions}
                styles={rtlStyles}
                placeholder="اختر اللغات"
                value={languageOptions.filter((opt) =>
                  field.value?.includes(opt.value)
                )}
                onChange={(selected) =>
                  field.onChange(selected.map((s) => s.value))
                }
              />
            )}
          />
          {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages.message}</p>}
        </div>

        {/* المدن */}
        <div>
          <label className="block mb-1 font-medium">المدن</label>
          <Controller
            control={control}
            name="cities"
            render={({ field }) => (
              <Select
                isMulti
                options={cityOptions}
                styles={rtlStyles}
                placeholder="اختر المدن"
                value={cityOptions.filter((opt) =>
                  field.value?.includes(opt.value)
                )}
                onChange={(selected) =>
                  field.onChange(selected.map((s) => s.value))
                }
              />
            )}
          />
          {errors.cities && <p className="text-red-500 text-sm mt-1">{errors.cities.message}</p>}
        </div>

        <FormField label="السيرة الذاتية" name="bio" register={register} errors={errors} type="textarea" col={2} />

        <button
          type="submit"
          disabled={isPending}
          className="md:col-span-2 w-full py-2 md:py-3 rounded-lg gradient-primary text-white font-semibold cursor-pointer bg-blue-600 disabled:bg-gray-400"
        >
          {isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
        </button>
      </form>
    </div>
  );
}
