import { useAllNotifications } from "../hooks/useAllNotifications";
import type { Notification } from "../type/notification.type";

export default function GuideNotificationsPage() {
  const { data: notifications = [], isLoading } = useAllNotifications();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-primary-500">جاري تحميل الحجوزات...</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-lg md:text-2xl font-bold text-primary-500 md:text-center mb-6 px-3">
        كافة الإشعارات
      </h1>

      {notifications.length === 0 && (
        <div className="flex  justify-center min-h-screen">

          <p className="text-secondary-500 pt-30">
            لا توجد إشعارات حتى الآن
          </p>
        </div>
      )}


      <div className="space-y-3">
        {notifications.map((notification: Notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  const { data, is_read, created_at } = notification;
  const { type } = data;
  console.log(notification);
  return (
    <div
      className={`p-4 rounded-lg border shadow-sm ${is_read ? "bg-white" : "bg-blue-50"
        }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {type === "alter-booking" && (
            <>
              <p className="font-bold">{data.message}</p>
              <p className="text-sm text-gray-600 mt-1">
                الحالة: {data.status}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                ملاحظة: {data.note}
              </p>
            </>
          )}

          {type === "new-booking" && (
            <>
              <p className="font-bold">
                {data.message}
              </p>
              <p>
                اسم السائح {data.tourist_name}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                يبدأ بتاريخ {new Date(data.start_date).toISOString().split("T")[0]} — لمدة {data.days} أيام
              </p>
            </>
          )}

          <p className="text-xs text-gray-400 mt-2">{created_at}</p>
        </div>

        {!is_read && (
          <span className="w-3 h-3 bg-blue-600 rounded-full mt-1"></span>
        )}
      </div>
    </div>
  );
}
