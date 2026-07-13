import { useState } from "react";
import { useCancelBooking } from "../hooks/useCancelBooking";

interface Props {
  bookingId: number;
  onClose: () => void;
}

export default function CancelBookingModal({ bookingId, onClose }: Props) {
  const [note, setNote] = useState("");

  const { mutate, isPending } = useCancelBooking(bookingId, onClose);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg max-h-[80vh] overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">إلغاء الحجز</h2>

        <textarea
          className="w-full border rounded-lg p-2"
          placeholder="اكتب ملاحظة (اختياري)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => mutate(note)}
            disabled={isPending}
            className="flex-1 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
          >
            {isPending ? "جاري الإلغاء..." : "تأكيد الإلغاء"}
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-600 text-white rounded-lg"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
