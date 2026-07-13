interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
}

interface Props {
  reviews: Review[];
}

export default function ReviewsWidget({ reviews }: Props) {
  return (
    <div className="bg-white shadow rounded-xl p-2 border border-emerald-100">
      <h3 className="text-xl font-semibold text-emerald-700 mb-2">
        آخر التقييمات
      </h3>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg"
          >
            <div className="w-full grid grid-cols-3">
              <h4 className="font-semibold text-emerald-800">{review.user}</h4>

              <div className="text-yellow-500 text-sm">
                {"★".repeat(review.rating)}
              </div>

              <p className="text-gray-700 text-sm mt-1">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
