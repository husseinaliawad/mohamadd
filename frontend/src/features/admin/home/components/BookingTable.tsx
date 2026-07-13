// src/features/admin/dashboard/components/GuidesTable.tsx

interface Guide {
  guideName: string;
  date: string;
  userName: string;
  status: "approved" | "pending" | "rejected";
}

const statusColors = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-orange-100 text-orange-700",
    rejected: "bg-red-100 text-red-700",
  };

const statusLabels = {
    approved: "مقبول",
    pending: "قيد المراجعة",
    rejected: "مرفوض",
  };

export default function BookingTable() {  
  const guides: Guide[] = [
    { guideName: "محمد سليمان", date: "1/7/2026", userName: "أحمد الخطيب", status: "approved" },
    { guideName: "محمد مطر", date: "5/7/2026", userName: "محمد علي", status: "pending" },
    { guideName: "محمد مطر", date: "5/7/2026", userName: "محمد علي", status: "rejected" },
  ];

  return (
    <div className="bg-white shadow rounded-xl p-5 border border-primary-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">طلبات حجز المرشدين </h3>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border">المرشد</th>
            <th className="p-3 border">التاريخ</th>
            <th className="p-3 border">السائح</th>
            <th className="p-3 border">الحالة</th>
          </tr>
        </thead>

        <tbody>
          {guides.map((g, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="p-3 border">{g.guideName}</td>
              <td className="p-3 border">{g.date}</td>
              <td className="p-3 border">{g.userName}</td>
              <td className="p-3 border">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[g.status]}`}
                >
                  {statusLabels[g.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
