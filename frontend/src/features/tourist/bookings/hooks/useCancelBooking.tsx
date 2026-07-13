import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelBookingApi } from "../api/cancelBooking.api";

export const useCancelBooking = (bookingId: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (note: string) => cancelBookingApi(bookingId, note),

    onSuccess: () => {
      // تحديث قائمة الحجوزات
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
      // React Query يستخدم Partial Matching بشكل افتراضي,=> 
      // لا داعي للتعليمات التالية      
      //  queryClient.invalidateQueries({ queryKey: ["my-bookings", bookingId] });
      // queryClient.invalidateQueries({ queryKey: ["my-bookings"], exact: false });      

      // عرض toast نجاح
      toast.success("تم إلغاء الرحلة بنجاح");

      // إغلاق المودال - استدعاء شرطي في حال له قيمه
      onSuccess?.();
    },

    onError: () => {
      toast.error("حدث خطأ أثناء الإلغاء");
    },
  });
};
