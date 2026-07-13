import BookingCard from "../components/BookingCard";
import { useMyBookings } from "../hooks/useMyBookings";
import type { Booking } from "../types/bookingTypes";

export default function MyBookingsPage() {
  const { data, isLoading, isError } = useMyBookings();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-primary-500">جاري تحميل الحجوزات...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center py-10 text-red-600">
        حدث خطأ أثناء تحميل البيانات
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mt-20 text-primary-500 text-center">
        حجوزاتي
      </h1>

      {data.length === 0 && (
        <p className="text-center text-gray-500">
          لا يوجد حجوزات حتى الآن.
        </p>
      )}

      <div className="max-w-[90%] md:max-w-2xl p-5 mx-auto space-y-4">
        {data.map((booking: Booking) => (
          <BookingCard key={booking.booking_id} booking={booking} />
        ))}
      </div>
    </div>
  );
}
