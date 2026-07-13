import ReviewsList from "../components/ReviewsList";
import { useTouristReviews } from "../hooks/useTouristReviews";

const TouristReviewsPage = () => {
  const { data, isLoading, error } = useTouristReviews();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-primary-500">جاري تحميل المرشدين...</p>
      </div>
    );
  }
  if (error) return <p>حدث خطأ أثناء جلب التقييمات</p>;

  return (
    <div className="py-20 md:px-[20%]">
      <h1 className="text-lg md:text-2xl font-bold text-primary-500 md:text-center mb-6 px-3">
        تقييماتي
      </h1>
    
      <ReviewsList reviews={data || []} />
    </div>
  );
};

export default TouristReviewsPage;
