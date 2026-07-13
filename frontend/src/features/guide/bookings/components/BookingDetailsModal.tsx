import { useState } from "react";
import type { Booking } from "../type/booking.type";
import AlterBookingModal from "./AlterBookingModal";
import { useAlterBooking } from "../hooks/useِAlterBooking";

interface Props {
    booking: Booking;
    onClose: () => void;
}

export default function BookingDetailsModal({ booking, onClose }: Props) {
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const { mutate , isPending } = useAlterBooking();

    // إزالة الوقت من التاريخ
    const formattedDate = booking.start_date.split("T")[0];

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg relative">

                {/* زر الإغلاق */}
                <button
                    onClick={onClose}
                    className="absolute top-3 left-3 text-gray-600 hover:text-black"
                >
                    ✕
                </button>


                {/* تفاصيل الحجز */}
                <div className="space-y-2 text-gray-800">
                    <p><strong>السائح:</strong> {booking.tourist_name}</p>
                    <p><strong>التاريخ:</strong> {formattedDate}</p>
                    <p><strong>عدد الأيام:</strong> {booking.day_count}</p>
                    <p><strong>السعر:</strong> {booking.total_price} ل.س</p>
                    <p><strong>الحالة:</strong> {booking.status}</p>

                    {booking.description && (
                        <p><strong>وصف الحجز:</strong> {booking.description}</p>
                    )}
                </div>

                {/* السجلات */}
                {booking.logs && booking.logs.length > 0 && (
                    <div className="mt-4">
                        <h3 className="font-bold mb-2">سجل التغييرات:</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto border p-2 rounded">
                            {booking.logs.map((log) => {
                                const logDate = log.created_at.split("T")[0];
                                return (
                                    <div key={log.id} className="border-b pb-2 text-sm text-gray-700">
                                        <p><strong>من:</strong> {log.old_status}</p>
                                        <p><strong>إلى:</strong> {log.new_status}</p>
                                        {log.note && <p><strong>ملاحظة:</strong> {log.note}</p>}
                                        <p className="text-gray-500 text-xs">{logDate}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* أزرار الإجراءات */}
                <div className="mt-6 space-y-2">

                    {/* قبول / رفض */}
                    {booking.can_guide_react && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowAcceptModal(true)}
                                className="w-full py-2 bg-green-600 text-white rounded-lg"
                            >
                                قبول الحجز
                            </button>

                            <button
                                onClick={() => setShowRejectModal(true)}
                                className="w-full py-2 bg-red-600 text-white rounded-lg"
                            >
                                رفض الحجز
                            </button>
                        </div>
                    )}

                    {/* إلغاء الحجز */}
                    {booking.can_guide_cancel && (
                        <button
                            onClick={() => setShowCancelModal(true)}
                            className="w-full py-2 bg-red-700 text-white rounded-lg"
                        >
                            إلغاء الحجز
                        </button>
                    )}
                </div>

                {showAcceptModal && (
                    <AlterBookingModal
                        touristName={booking.tourist_name}
                        onClose={() => setShowAcceptModal(false)}
                        onConfirm={(note) =>
                            mutate(
                                { id: booking.booking_id, note, action: "accept" },
                                {
                                    onSuccess: () => {
                                        setShowAcceptModal(false); // إغلاق مودال القبول
                                        onClose(); // إغلاق مودال التفاصيل
                                    },
                                }
                            )
                        }
                        action={{ name: "accept", value: "قبول" }}
                        isPending={isPending}
                    />
                )}


                {showRejectModal && (
                    <AlterBookingModal
                        touristName={booking.tourist_name}
                        onClose={() => setShowRejectModal(false)}
                        onConfirm={(note) =>
                            mutate(
                                { id: booking.booking_id, note, action: "reject" },
                                {
                                    onSuccess: () => {
                                        setShowRejectModal(false);
                                        onClose();
                                    },
                                }
                            )
                        }
                        action={{ name: "reject", value: "رفض" }}
                        isPending={isPending}
                    />
                )}


                {showCancelModal && (
                    <AlterBookingModal
                        touristName={booking.tourist_name}
                        onClose={() => setShowCancelModal(false)}
                        onConfirm={(note) =>
                            mutate(
                                { id: booking.booking_id, note, action: "cancel" },
                                {
                                    onSuccess: () => {
                                        setShowCancelModal(false);
                                        onClose();
                                    },
                                }
                            )
                        }
                        action={{ name: "cancel", value: "إلغاء" }}
                        isPending={isPending}
                    />
                )}


            </div>
        </div>
    );
}
