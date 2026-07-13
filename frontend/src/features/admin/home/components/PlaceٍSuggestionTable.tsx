// src/features/admin/dashboard/components/PlacesTable.tsx

interface Place {
  placeName: string;
  userName: string;
  userType: "tourist" | "guide";
  date: string;
  status: "approved" | "pending" | "rejected";
}

export default function PlaceٍSuggestionTable() {
  const places: Place[] = [
    { placeName: "قلعة دمشق", userName: "براء حمود", userType: "user" , date: "1/7/2026" ,status: "approved" },
    { placeName: "شاطئ أفاميا", userName: "محمد نور المشرقي", userType: "user" , date: "1/8/2026" ,status: "pending" },
    { placeName: "خان أسعد باشا", userName: "نور كاملة", userType: "user" , date: "15/8/2026" ,status: "rejected" },
  ];

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

  return (
    <div className="bg-white shadow rounded-xl p-5 border border-purple-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">آخر الاقتراحات </h3>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-primary-50 text-primary-900">
            <th className="p-3 border">اسم المكان المقترح</th>
            <th className="p-3 border">اسم المستخدم</th>
            <th className="p-3 border">نوع  المستخدم</th>
            <th className="p-3 border">تاريخ الاقتراح</th>
            <th className="p-3 border">الحالة</th>
          </tr>
        </thead>

        <tbody>
          {places.map((p, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="p-3 border">{p.placeName}</td>
              <td className="p-3 border">{p.userName}</td>
              <td className="p-3 border">{p.userType}</td>
              <td className="p-3 border">{p.date}</td>
              <td className="p-3 border">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[p.status]}`}
                >
                  {statusLabels[p.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
