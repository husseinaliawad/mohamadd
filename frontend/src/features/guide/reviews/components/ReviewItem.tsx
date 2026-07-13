import type { Review } from "../types/reviews.type";

type ReviewItemProps = {
  review: Review;
};

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <strong className="text-gray-900">{review.tourist_name}</strong>
          {review.trip_city && (
            <span className="text-gray-500 text-sm">• {review.trip_city}</span>
          )}
        </div>

        <span className="text-gray-500 text-sm">
          {new Date(review.created_at).toLocaleDateString("ar-SY")}
        </span>
      </div>

      {/* Stars */}
      <div className="flex text-yellow-500 text-lg mb-2">
        {"★".repeat(review.rating)}
        <span className="text-gray-300">
          {"★".repeat(5 - review.rating)}
        </span>
      </div>

      {/* Comment */}
      <p className="text-gray-800 leading-relaxed">{review.comment}</p>

      {/* Trip Date */}
      {review.trip_date && (
        <p className="text-gray-500 text-xs mt-2">
          تاريخ الرحلة:{" "}
          {new Date(review.trip_date).toLocaleDateString("ar-SY")}
        </p>
      )}
    </div>
  );
};
export default ReviewItem;