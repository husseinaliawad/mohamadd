import StatsCard from "../components/StatsCard";
import ReviewsWidget from "../components/ReviewsWidget";
import RecentBookingsTable from "../components/RecentBookingsTable";
import { useGuideDashboard } from "../hooks/useGuideDashboard";

export default function GuideHomePage() {
  const { data , isLoading } = useGuideDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-primary-500">جاري تحميل المرشدين...</p>
      </div>
    );
  }

  const stats = data.stats;

  return (
    <div className="space-y-2.5">

      {/* البطاقات العلوية */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <StatsCard title="طلبات جديدة" value={stats.new_requests} icon="✈️" />
        <StatsCard title="رحلات مؤكدة" value={stats.confirmed_trips} icon="✔️" />
        <StatsCard title="تقييمك" value={data.guide.rating} icon="⭐" />
        <StatsCard title="أيامي المحجوزة" value={stats.booked_days} icon="📅" />
      </section>

      {/* التقويم والتقييمات */}
      <section className="">
        <ReviewsWidget reviews={data.latest_reviews} />
      </section>

      <RecentBookingsTable bookings={data.latest_bookings} />


    </div>
  );
}
