import type { TouristReview } from "../types";

type Props = {
  review: TouristReview;
};

const ReviewCard = ({ review }: Props) => {
  const guide = review.booking.guide;
  const trip = review.booking.trip;

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white/80">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">{guide.user.name}</h3>
        <span className="text-yellow-500 text-xl">⭐ {review.rating}</span>
      </div>

      <p className="text-gray-600 mt-2">{review.comment || "لا يوجد تعليق"}</p>

      <div className="mt-4 text-sm text-gray-500">
        <p>تاريخ التقييم: {review.created_at}</p>
        <p>تاريخ الحجز: {review.booking.start_date}</p>
        <p>عدد الأيام: {review.booking.day_count}</p>
        <p>السعر الكلي: {review.booking.total_price} $</p>

        {trip && (
          <p className="mt-2 text-blue-600">
            رحلة: {trip.title} ({trip.start_date} → {trip.end_date})
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
