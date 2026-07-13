import type { Review } from "../types/reviews.type";
import ReviewItem from "./ReviewItem";

type ReviewsListProps = {
  reviews: Review[];
};

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <p className="text-center text-gray-600 py-4">
        لا توجد تقييمات مطابقة للفلاتر الحالية.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 flex-col gap-4">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewsList;
