import { useState } from "react";
import CancelBookingModal from "./CancelBookingModal";
import { useBookingDetails } from "../hooks/useMyBookings";
import type { Log } from "../types/bookingTypes";

interface Props {
    booking_id: number;
    onClose: () => void;
}

export default function BookingDetailsModal({ booking_id, onClose }: Props) {
    const [showCancel, setShowCancel] = useState(false);
    const { data: booking, isLoading } = useBookingDetails(booking_id);

    if (isLoading) {
    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-gray-100/10">
            <div className="bg-white shadow-lg rounded-xl px-8 py-6 text-center">
                <p className="text-2xl font-semibold text-primary-500">
                    جاري تحميل التفاصيل...
                </p>
            </div>
        </div>
    );
}


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-center flex-1">
                    تفاصيل الحجز
                </h2>
                <div className="flex items-center justify-between mb-4">
                    <p><strong>المرشد:</strong> {booking.guide_name}</p>
                    {booking.guide_avatar && (
                        <img
                            src={booking.guide_avatar}
                            alt="صورة المرشد"
                            className="w-20 h-20 rounded-full object-cover border shadow-sm"
                        />
                    )}


                </div>

                {/* اسم المرشد */}

                <p><strong>التاريخ:</strong> {booking.start_date.split("T")[0]}</p>
                <p><strong>عدد الأيام:</strong> {booking.day_count}</p>
                <p><strong>السعر:</strong> {booking.total_price} ل.س</p>
                <p><strong>الحالة:</strong> {booking.status}</p>

                {booking.description && (
                    <p className="mt-2"><strong>وصف الحجز:</strong> {booking.description}</p>
                )}
                <div className="max-h-[40vh] overflow-y-auto">


                    {/* عرض سجل التحديثات */}
                    {Array.isArray(booking.logs) && booking.logs.length > 0 && (
                        <div className="mt-4 border-t pt-3">
                            <h3 className="font-bold mb-2">سجل التحديثات</h3>

                            <ul className="space-y-2">
                                {booking.logs.map((entry: Log) => (
                                    <li
                                        key={entry.id}
                                        className="p-3 bg-gray-100 rounded-lg border text-sm"
                                    >
                                        <p><strong>تم تحديث الحالة من:</strong> <span className="text-gray-400"> {entry.old_status} </span> - <strong>إلى:</strong> <span className="text-secondary-400">{entry.new_status} </span></p>
                                        <p><strong>ملاحظة:</strong> {entry.note}</p>
                                        <p>
                                            <strong>بتاريخ :</strong>  <span className="text-gray-500 text-xs mt-1">{entry.created_at.split("T")[0]} </span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>


                <div className="flex gap-x-1">


                    <button
                        onClick={onClose}
                        className="mt-3 w-full py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600"
                    >
                        إغلاق
                    </button>

                    {/* زر الإلغاء داخل التفاصيل */}
                    {booking.can_tourist_cancel && (
                        <button
                            onClick={() => setShowCancel(true)}
                            className="mt-3 w-25 py-2 bg-rose-400 text-gray-800 rounded-lg hover:bg-rose-500"
                        >
                            إلغاء الحجز
                        </button>
                    )}
                </div>

                {/* مودال الإلغاء */}
                {showCancel && (
                    <CancelBookingModal
                        bookingId={booking.booking_id}
                        onClose={() => setShowCancel(false)}
                    />
                )}
            </div>
        </div >
    );
}
