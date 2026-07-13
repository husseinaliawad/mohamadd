import { useState } from "react";
import { Star } from "lucide-react";
import { useReviewBooking } from "../hooks/useReviewBooking";

export default function ReviewModal( {bookingId , onClose } :any ) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);

  const {mutate , isPending} = useReviewBooking( onClose)

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg"
        dir="rtl"
      >
        <h2 className="text-xl font-bold mb-4 text-center">إضافة تقييم</h2>

        {/* النجوم */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={32}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className={`cursor-pointer transition ${
                star <= (hover || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* التعليق */}
        <textarea
          className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-400"
          rows={3}
          placeholder="اكتب ملاحظتك… (اختياري)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* الأزرار */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-2 rounded-lg border border-gray-300"
          >
            إلغاء
          </button>

          <button 
            disabled={isPending}
            onClick={() => mutate( {bookingId , comment , rating})}
            className="w-1/2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {isPending?"جاري الإرسال": "إرسال"}
            
          </button>
        </div>
      </div>
    </div>
  );
}
