<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    // كل الإشعارات
    public function index(Request $request)
    {
        $notifications = $request->user()
            ->notifications()      // كل الإشعارات (read + unread)
            ->latest()
            ->get();

        return api_success( NotificationResource::collection($notifications));
    }

    // الإشعارات غير المقروءة فقط
    public function unread(Request $request)
    {
        $notifications = $request->user()
            ->unreadNotifications()   
            ->latest()
            ->get();

        return api_success( NotificationResource::collection($notifications));
    }

    // عدد الإشعارات غير المقروءة
    public function unreadCount(Request $request)
    {
        $count = $request->user()
            ->unreadNotifications()   
            ->count();

        return api_success(['count' => $count]);
    }    

    // وضع علامة مقروء للجميع
    public function markAllAsRead(Request $request)
    {
        $request->user()
            ->unreadNotifications()
            ->update(['read_at' => now()]);

        return api_success(message: 'تم جعل جميع الاشعرات مقروءة');
    }
}
