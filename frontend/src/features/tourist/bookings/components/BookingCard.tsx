import { useState, type JSX } from "react";
import BookingDetailsModal from "./BookingDetailsModal";

import {
  User,
  Calendar,
  Navigation,
  BadgeDollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Hourglass,
  Star,
} from "lucide-react";
import type { Booking } from "../../../types/bookingTypes";
import ReviewModal from "./ReviewModal";

interface Props {
  booking: Booking;
}

export default function BookingCard({ booking }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const statusStyles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    cancelled_by_tourist: "bg-gray-200 text-gray-600",
  };

  const statusIcons: Record<string, JSX.Element> = {
    pending: <Hourglass className="w-4 h-4" />,
    accepted: <CheckCircle className="w-4 h-4" />,
    completed: <CheckCircle className="w-4 h-4" />,
    rejected: <XCircle className="w-4 h-4" />,
    cancelled_by_tourist: <XCircle className="w-4 h-4" />,
    cancelled_by_guide: <XCircle className="w-4 h-4" />,
  };

  return (
    <>
      <div className="border rounded-xl p-5 shadow-md bg-white/70 hover:shadow-lg transition-all duration-200 space-y-2">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <User className="w-5 h-5 text-primary-500" />
            {booking.guide_name}
          </h3>

          <span
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm capitalize ${statusStyles[booking.status]}`}
          >
            {statusIcons[booking.status]}
            {booking.status}
          </span>
        </div>
        
        {/* Date */}
        <p className="flex items-center gap-2 text-gray-700 mb-3">
          <Navigation className="w-5 h-5 text-gray-500" />
          تاريخ الحجز {booking.created_at.split("T")[0]}
        </p>
        
        <p className="flex items-center gap-2 text-amber-700">
          <Calendar className="w-5 h-5 text-amber-700" />
          تاريخ بدء الرحلة {booking.start_date.split("T")[0]}
        </p>

        {/* Days */}
        <p className="flex items-center gap-2 text-gray-700">
          <Clock className="w-5 h-5 text-gray-500" />
          عدد الأيام {booking.day_count}
        </p>

        {/* Price */}
        <p className="flex items-center gap-2 text-gray-700">
          <BadgeDollarSign className="w-5 h-5 text-gray-500" />
          {booking.total_price} ل.س
        </p>

        {/* ⭐⭐⭐⭐ عرض التقييم داخل البطاقة */}
        {booking.status === "completed" && booking.review && (
          <div className="mt-3 border-t pt-3">
            <h4 className="font-bold mb-1">تقييمك للرحلة</h4>

            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: booking.review.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-500" />
              ))}
            </div>

            {booking.review.comment && (
              <p className="text-gray-700 mt-1">
                <strong>تعليقك:</strong> {booking.review.comment}
              </p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setShowDetails(true)}
            className="mt-4 w-40 mx-auto py-1 bg-primary-400 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-primary-600 transition"
          >
            تفاصيل
          </button>

          {booking.can_tourist_review && (
            <button
              onClick={() => setShowReview(true)}
              className="mt-4 w-40 mx-auto py-1 bg-secondary-400 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-primary-600 transition"
            >
              قيّم الآن
            </button>
          )}
          
        </div>
      </div>

      {showDetails && (
        <BookingDetailsModal
          booking_id={booking.booking_id}
          onClose={() => setShowDetails(false)}
        />
      )}

      {showReview && (
        <ReviewModal
          bookingId={booking.booking_id}
          onClose={() => setShowReview(false)}
        />
      )}
    </>
  );
}
