// auth/pages/RegisterPage.tsx
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { touristSchema, type TouristFormData } from "../schemas/touristSchema";
import { guideSchema, type GuideFormData } from "../schemas/guideSchema";
import useRegister from "../hooks/useRegister";
import { Link } from "react-router-dom";

import FormField from "@/components/FormField";
import { LanguageSelect } from "@/features/lookups/components/LanguageSelect";
import { Controller } from "react-hook-form";

type RegisterFormData = TouristFormData & Partial<GuideFormData>;

export default function RegisterPage() {
  const form = useForm<RegisterFormData>({
    defaultValues: {
      role: "tourist",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = form;

  const { mutate, isPending } = useRegister(setError);

  const currentRole = watch("role");

  // تحديد الـ resolver ديناميكياً بناءً على القيمة الحالية المراقبة
  const resolver = zodResolver(currentRole === "tourist" ? touristSchema : guideSchema);
  form.control._options.resolver = resolver as Resolver<RegisterFormData>;

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  const onError = (errors: any) => {
    console.log("Validation Errors:", errors);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row md:bg-linear-0 from-primary-200/40 via-secondary-100 to-primary-200/40 ">
      {/* RIGHT SIDE — FORM */}
      <div className="order-2 md:order-1 flex-1 bg-white overflow-y-auto h-screen">
        <div className="mt-0 md:mt-10 flex justify-center mb-10">
          <div className="w-full max-w-lg space-y-6">
            <h2 className="heading-primary font-bold text-secondary-800/85 text-center ">إنشاء حساب</h2>

            <div className="flex items-center justify-center gap-6 mb-2 md:mb-6">
              <FormField label="مستخدم" name="role" type="radio" value="tourist" register={register} errors={errors} />
              <FormField label="مرشد" name="role" type="radio" value="guide" register={register} errors={errors} />
            </div>

            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-3 px-3">
              {/* USER FIELDS */}
              <FormField label="الاسم" name="name" register={register} errors={errors} />

              <FormField label="البريد الإلكتروني" name="email" type="email" register={register} errors={errors} />

              <FormField label="كلمة المرور" name="password" type="password" register={register} errors={errors} />

              <FormField label="تأكيد كلمة المرور" name="password_confirmation" type="password" register={register} errors={errors} />

              {/* GUIDE FIELDS */}
              {currentRole === "guide" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="الجنس" name="gender" register={register} errors={errors}>
                      <option value="">اختر الجنس</option>
                      <option value="M">ذكر</option>
                      <option value="F">أنثى</option>
                    </FormField>

                    <Controller
                      name="languages"
                      control={form.control}
                      render={({ field }) => (
                        <div className="md:col-span-1">
                          <label className="text-secondary-800 font-medium">اللغات</label>

                          <LanguageSelect
                            value={field.value || []}
                            onChange={(val) => field.onChange(val)}
                          />

                          {errors.languages && (
                            <p className="text-red-500">{errors.languages.message}</p>
                          )}
                        </div>
                      )}
                    />

                    <FormField label="تاريخ الميلاد" name="DOB" type="date" register={register} errors={errors} />

                    <FormField label="رقم الهاتف" name="phone" register={register} errors={errors} />

                    <FormField label="السعر اليومي" name="daily_price" type="number" register={register} errors={errors} />
                  </div>
                  <FormField label="السيرة التعريفية" name="bio" type="textarea" register={register} errors={errors} />

                  <FormField label="الصورة الشخصية" name="avatar" type="file" register={register} errors={errors} />
                </>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-2 md:py-3 rounded-lg gradient-primary text-white font-semibold"
              >
                {isPending ? "جاري التحميل..." : "إنشاء الحساب"}
              </button>
            </form>

            <div className="text-center mt-6 text-gray-700">
              لديك حساب بالفعل؟
              <Link to="/login" className="text-secondary-600 font-semibold hover:underline ml-1 mr-2">
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* LEFT SIDE — LOGO */}
      <div className="order-1 md:order-2 flex flex-col justify-center items-center md:w-1/2 text-center">
        <Link to="/">
          <img src="/logo.png" alt="NextTrip Logo" className="w-40 md:w-60 lg:w-62.5" />
        </Link>
        <p className="text-gray-700 mt-2 text-sm md:text-base max-w-sm">انضم إلى منصة NextTrip واستمتع بتجربة سفر ذكية داخل سوريا.</p>
      </div>
    </div>
  );
}
