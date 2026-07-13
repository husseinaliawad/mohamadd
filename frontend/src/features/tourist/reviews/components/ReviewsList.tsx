import type { TouristReview } from "../types";
import ReviewCard from "./ReviewCard";

type Props = {
  reviews: TouristReview[];
};

const ReviewsList = ({ reviews }: Props) => {
  if (reviews.length === 0)
    return <p className="text-center text-gray-500">لا توجد تقييمات بعد</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewsList;
