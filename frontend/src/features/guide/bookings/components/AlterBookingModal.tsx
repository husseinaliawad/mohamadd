import { useState } from "react";

interface Props {
  touristName: string;
  onConfirm: (note: string) => void;
  onClose: () => void;
  action: { name: string, value: string };
  isPending: boolean
}

export default function AlterBookingModal({ touristName, onConfirm, onClose, action, isPending }: Props) {
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">

        <h2 className="text-xl font-bold mb-4 text-primary-600">{action.value} الحجز</h2>

        <p className="text-gray-700 mb-3">
          هل تريد {action.value} الحجز الخاص بالسائح <strong>{touristName}</strong>؟
        </p>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={`سبب ${action.value} (خياري)`}
          className="w-full border rounded-lg p-2 h-28"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            إغلاق
          </button>

          <button
            disabled={isPending}
            
            onClick={() => onConfirm(note)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg"
          >
            {isPending ? `جاري ${action.value}...` : `تأكيد ${action.value}`}
          </button>
        </div>
      </div>
    </div>
  );
}
