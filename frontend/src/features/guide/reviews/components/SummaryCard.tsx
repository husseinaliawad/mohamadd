import type { RatingDistribution } from "../types/reviews.type";

type Props = {
  averageRating: number | undefined;
  totalReviews: number | undefined;
  ratingsDistribution: RatingDistribution;
};

const SummaryCard = ({ averageRating, totalReviews, ratingsDistribution }: Props) => {
  const safeAverage = averageRating ?? 0;
  const safeTotal = totalReviews ?? 0;

  return (
    <div className="border border-gray-200 rounded-2xl p-6 mb-6 bg-gray-50 
            flex flex-col md:flex-row gap-6 md:gap-10 justify-between">

      {/* القسم الأيسر */}
      <div className="w-full md:w-[180px]">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">تقييم المرشد</h2>

        <div className="text-4xl font-bold text-yellow-500">
          ⭐ {safeAverage.toFixed(1)}
        </div>

        <p className="mt-1 text-gray-600">عدد التقييمات: {safeTotal}</p>
      </div>

      {/* القسم الأيمن */}
      <div className="flex-1">
        <h3 className="mb-3 text-md font-semibold text-gray-800">توزيع النجوم</h3>

        {[5, 4, 3, 2, 1].map((star) => {
          const count = ratingsDistribution[star] ?? 0;
          const percentage = safeTotal > 0 ? (count / safeTotal) * 100 : 0;

          return (
            <div key={star} className="flex items-center mb-3 gap-3">
              <div className="w-[70px] text-right text-gray-700">{star} ⭐</div>

              <div className="flex-1 bg-gray-200 h-3 rounded-md overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-md transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="w-6 text-center text-gray-700">{count}</div>
            </div>
          );
        })}
      </div>
    </div>
  )
};

export default SummaryCard;
