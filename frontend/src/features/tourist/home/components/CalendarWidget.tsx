// src/features/guide/home/components/CalendarWidget.tsx
export default function CalendarWidget() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const bookedDays = [10, 11, 15];
  const pendingDays = [6];

  return (
    <div className="bg-white shadow rounded-xl p-2 border border-emerald-100">
      <h3 className="text-xl font-semibold text-emerald-700 mb-2">تقويمي</h3>

      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day) => {
          const isBooked = bookedDays.includes(day);
          const isPending = pendingDays.includes(day);

          return (
            <div
              key={day}
              className={`p-1 rounded-full text-sm font-medium
                ${
                  isBooked
                    ? "bg-primary-600 text-white"
                    : isPending
                    ? "bg-secondary-200 text-black"
                    : "bg-gray-100 text-gray-700"
                }
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
