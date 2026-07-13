interface Booking {
  id: number;
  name: string;       // اسم السائح
  date_range: string; // من الباك
  duration: string;   // "3 أيام"
  status: "pending" | "accepted" | "rejected";
}

interface Props {
  bookings: Booking[];
}

export default function RecentBookingsTable({ bookings }: Props) {
  const statusColors: Record<string, string> = {
    pending: "text-orange-600 bg-orange-100",
    accepted: "text-green-600 bg-green-100",
    rejected: "text-red-600 bg-red-100",
    completed: "text-blue-600 bg-blue-100",
  };

  const statusLabels: Record<string, string> = {
    pending: "قيد الانتظار",
    accepted: "مقبول",
    rejected: "مرفوض",
    completed: "مكتمل"
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
          {bookings.map((b) => (
            <tr key={b.id} className="hover:bg-gray-50">
              <td className="p-1 border">{b.name}</td>
              <td className="p-1 border">{b.date_range}</td>
              <td className="p-1 border">{b.duration}</td>
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
