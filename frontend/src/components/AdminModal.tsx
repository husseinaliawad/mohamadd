import { X } from "lucide-react";
import type { ReactNode } from "react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidthClassName?: string;
}

export default function AdminModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidthClassName = "max-w-md",
}: AdminModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className={`w-full rounded-xl bg-white p-6 shadow-xl ${maxWidthClassName}`}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 transition-colors hover:text-gray-700"
            aria-label="إغلاق"
          >
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
