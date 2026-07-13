import { useState } from "react";
import { useGuideBookings } from "../hooks/useGuideBookings";
import BookingDetailsModal from "../components/BookingDetailsModal";
import type { Booking, BookingStatus } from "../type/booking.type";
import BookingStatusFilter from "../components/BookingStatusFilter";

export default function AllBookingsPage() {
  const [status, setStatus] = useState<BookingStatus | undefined>(undefined);
  const { data: bookings, isLoading, error } = useGuideBookings({ status });
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "accepted":
        return "bg-green-100 text-green-700 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "cancelled_by_tourist":
      case "cancelled_by_guide":
        return "bg-red-200 text-red-800 border-red-400";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const columns = [
    { key: "tourist_name", label: "السائح" },
    { key: "start_date", label: "التاريخ", format: (v: string) => v.split("T")[0] },
    { key: "day_count", label: "الأيام" },
    { key: "total_price", label: "السعر", format: (v: number) => `${v} ل.س` },

    {
      key: "status",
      label: "الحالة",
      format: (v: BookingStatus) => (
        <span
          className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(v)}`}
        >
          {v}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-primary-500">جاري تحميل البيانات...</p>
      </div>
    );
  }
  if (error) return <p>حدث خطأ أثناء جلب البيانات</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">جميع الحجوزات</h1>
        <BookingStatusFilter value={status} onChange={setStatus} />
      </div>

      <div className="overflow-x-auto  rounded-lg">
        <table className="min-w-full text-right">
          <thead className="bg-gray-100 text-sm">
            <tr className="border border-primary-200">
              {columns.map(col => (
                <th key={col.key} className="px-3 py-2">{col.label}</th>
              ))}
              <th className="px-3 py-2">إجراءات</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking: Booking) => (
              <tr key={booking.booking_id} className="border border-primary-200 text-sm">

                {columns.map(col => {
                  const value = booking[col.key as keyof Booking];
                  const display = col.format ? col.format(value as any) : value;

                  return (
                    <td key={col.key} className="px-3 py-2">
                      {display}
                    </td>
                  );
                })}

                <td className="px-3 py-2">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    التفاصيل
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}
