import type { BookingStatus } from "../type/booking.type";

const STATUS_OPTIONS: { value?: BookingStatus; label: string }[] = [
  { value: undefined, label: "الكل" },
  { value: "pending", label: "معلقة" },
  { value: "accepted", label: "مقبولة" },
  { value: "rejected", label: "مرفوضة" },
  { value: "cancelled_by_tourist", label: "ملغاة من السائح" },
  { value: "cancelled_by_guide", label: "ملغاة من المرشد" },
  { value: "completed", label: "مكتملة" },
];

interface BookingStatusFilterProps {
  value?: BookingStatus;
  onChange: (value?: BookingStatus) => void;
}

export default function BookingStatusFilter({
  value,
  onChange,
}: BookingStatusFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">حالة الحجز:</label>

      <select
        className="border rounded px-2 py-1 text-sm"
        value={value ?? ""}
        onChange={(e) =>
          onChange((e.target.value || undefined) as BookingStatus | undefined)
        }
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.label} value={opt.value ?? ""}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
