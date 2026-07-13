import StatsCard from "../components/StatsCard";
import BookingsChart from "../components/BookingsChart";
import TripsChart from "../components/TripsChart";
import BookingTable from "../components/BookingTable";
import PlaceٍSuggestionTable from "../components/PlaceٍSuggestionTable";

export default function AdminHomePage() {
  return (
    <div className="space-y-2 pb-50">
      {/* البطاقات */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <StatsCard title="الرحلات" value="85" icon="🧳" />
        <StatsCard title="المستخدمون" value="1200" icon="👤" />
        <StatsCard title="الأماكن" value="340" icon="💥" />
        <StatsCard title="حجوزات" value="540" icon="📅" />
      </section>

      {/* الرسم البياني */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <TripsChart />
        <BookingsChart />
      </div>
      <BookingTable />
      <PlaceٍSuggestionTable />
    </div>
  );
}
