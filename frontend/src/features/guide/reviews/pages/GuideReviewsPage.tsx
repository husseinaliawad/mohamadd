import { useState } from "react";
import SummaryCard from "../components/SummaryCard";
import FiltersBar from "../components/FiltersBar";
import ReviewsList from "../components/ReviewsList";
import type { RatingDistribution, Review } from "../types/reviews.type";
import { useGuideReviews } from "../hooks/useGuideReviews";

const GuideReviewsPage = () => {
  const { data, isLoading, error } = useGuideReviews();

  const [selectedStars, setSelectedStars] = useState<number | "all">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const safeReviews: Review[] = data?.reviews ?? [];
  const safeDistribution: RatingDistribution = data?.ratings_distribution ?? {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };


  if (isLoading) return <p>جاري تحميل التقييمات...</p>;
  if (error) return <p>حدث خطأ أثناء جلب التقييمات.</p>;

  const filteredReviews = safeReviews
    .filter((review) =>
      selectedStars === "all" ? true : review.rating === selectedStars
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });

  return (
    <div className="p-2">
      <SummaryCard
        averageRating={data?.average_rating ?? 0}
        totalReviews={data?.total_reviews ?? 0}
        ratingsDistribution={safeDistribution}
      />

      <FiltersBar
        selectedStars={selectedStars}
        onChangeStars={setSelectedStars}
        sortOrder={sortOrder}
        onChangeSortOrder={setSortOrder}
      />

      <ReviewsList reviews={filteredReviews} />
    </div>
  );
};

export default GuideReviewsPage;
