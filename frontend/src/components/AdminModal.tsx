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
      <div className={`w-full rounded-xl bg-white shadow-xl ${maxWidthClassName} flex flex-col max-h-[calc(100vh-40px)]`}>
        <div className="p-6 flex items-center justify-between gap-3 border-b">
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
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
