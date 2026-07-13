interface Booking {
  tourist: string;
  date: string;
  days: string;
  status: "pending" | "accepted" | "rejected";
}

export default function RecentBookingsTable() {
  const bookings: Booking[] = [
    {
      tourist: "علي سعيد",
      date: "10 - 12 مايو 2024",
      days: "3 أيام",
      status: "pending",
    },
    {
      tourist: "ليلى حسن",
      date: "5 - 7 مايو 2024",
      days: "2 أيام",
      status: "accepted",
    },
    {
      tourist: "مايكل جونز",
      date: "1 - 4 أبريل 2024",
      days: "4 أيام",
      status: "rejected",
    },
  ];

  const statusColors: Record<string, string> = {
    pending: "text-orange-600 bg-orange-100",
    accepted: "text-green-600 bg-green-100",
    rejected: "text-red-600 bg-red-100",
  };

  const statusLabels: Record<string, string> = {
    pending: "قيد الانتظار",
    accepted: "مقبول",
    rejected: "مرفوض",
  };

  return (
    <div className="bg-white shadow rounded-xl p-2 border border-secondary-100">
      <h3 className="text-xl font-semibold text-emerald-700 mb-2">
        آخر الحجوزات
      </h3>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-secondary-50 text-secondary-800">
            <th className="p-1 border">السائح</th>
            <th className="p-1 border">التاريخ</th>
            <th className="p-1 border">المدة</th>
            <th className="p-1 border">الحالة</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="p-1 border">{b.tourist}</td>
              <td className="p-1 border">{b.date}</td>
              <td className="p-1 border">{b.days}</td>
              <td className="p-1 border">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[b.status]}`}
                >
                  {statusLabels[b.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
