import { Link, useNavigate } from "react-router-dom";
import { useGuideBook } from "../hooks/useGuideBook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  guideBookSchema,
  type BookingForm,
} from "../schemas/guideBookSchema";
import type { Guide } from "../types/booking.types";
import useAuthStore from "@/features/auth/store/authStore";
import FormField from "@/components/FormField";

interface Props {
  guide: Guide;
}

export function GuideBook({ guide }: Props) {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingForm>({
    resolver: zodResolver(guideBookSchema),
  });

  const { mutate, isPending } = useGuideBook();

  const dayCount = watch("day_count") || 0;
  const totalPrice = dayCount * guide.daily_price;

  const onSubmit = (data: BookingForm) => {
    //  التحقق من تسجيل الدخول

    if (!user) {
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });
      return;
    }

    //  إذا كان مسجل دخول → نكمل الحجز
    mutate(
      {
        guideId: Number(guide.guide_id),
        data,
      },
      {
        onSuccess: () => navigate("/tourist/my-bookings"),
      }
    );
  };

  return (
    <div className="flex flex-col justify-end w-full flex-1">
      <h1 className="text-lg md:text-xl font-bold text-secondary-500 md:text-center mb-2 px-3">
        أدخل بيانات الحجز
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 bg-white/50 p-5 border-2 rounded-2xl border-primary-300"
      >

        <FormField label="تاريخ الحجز" name="start_date" register={register} errors={errors} type="date" />

        <FormField label="عدد الأيام" name="day_count" register={register} errors={errors} type="number" options={{ valueAsNumber: true }} />

        {/* السعر الكلي */}
        {dayCount > 0 && (
          <div className="bg-primary-100 p-3 rounded-lg text-primary-700 font-semibold">
             {totalPrice.toLocaleString()}
          </div>
        )}

        <FormField label="وصف" name="description" register={register} errors={errors} type="textarea" />

        <div className="flex gap-3">
          <button
            className="w-full bg-primary-600 text-white py-1 rounded-lg text-lg"
            disabled={isPending}
          >
            {isPending ? "جاري الإرسال..." : "تأكيد الحجز"}
          </button>

          <Link
            to="/tourist/guides"
            className="w-full bg-secondary-600 text-white py-1 rounded-lg text-lg text-center"
          >
            عودة
          </Link>
        </div>
      </form>
    </div>
  );
}
