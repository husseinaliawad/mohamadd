<?php

use App\Http\Controllers\AuthController;

use App\Http\Controllers\Public\GuideController;

use App\Http\Controllers\Guide\GuideDashboardController;
use App\Http\Controllers\Guide\BookingController;
use App\Http\Controllers\Guide\ProfileController;
use App\Http\Controllers\Guide\ReviewController;

use App\Http\Controllers\Tourist\GuideBookingController as TouristGuideBookingController;
use App\Http\Controllers\Tourist\ReviewController as TouristReviewController;
use App\Http\Controllers\Tourist\AiTripController;


use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Public\LookupController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::controller(AuthController::class)->group(function () {
    Route::post('register',   'register');
    Route::post('login',   'login');
    Route::post('logout',   'logout')->middleware('auth:sanctum');
    Route::get('me',   'me')->middleware('auth:sanctum');
});

Route::prefix('public')->group(function () {
    Route::get('/cities', [LookupController::class, 'cities']);
    Route::get('/languages', [LookupController::class, 'languages']);
    Route::get('/categories', [LookupController::class, 'categories']);
    Route::get('/interests', [LookupController::class, 'interests']);

    Route::get('/guides', [GuideController::class, 'index']);
    Route::get('/guides/{guide}', [GuideController::class, 'show']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::apiResource('cities', \App\Http\Controllers\Admin\CityController::class);
    Route::apiResource('categories', \App\Http\Controllers\Admin\CategoryController::class);
    Route::apiResource('places', \App\Http\Controllers\Admin\PlaceController::class);
    Route::apiResource('languages', \App\Http\Controllers\Admin\LanguageController::class);
    Route::apiResource('interests', \App\Http\Controllers\Admin\InterestController::class);
    
    Route::apiResource('users', \App\Http\Controllers\Admin\UserController::class);
    Route::patch('users/{user}/status', [\App\Http\Controllers\Admin\UserController::class, 'changeStatus']);
    Route::patch('users/{user}/role', [\App\Http\Controllers\Admin\UserController::class, 'makeAdmin']);
    
    Route::get('suggested-places', [\App\Http\Controllers\SuggestedPlaceController::class, 'index']);
    Route::patch('suggested-places/{suggestedPlace}/status', [\App\Http\Controllers\SuggestedPlaceController::class, 'updateStatus']);
});

Route::middleware(['auth:sanctum', 'role:guide,tourist'])->post('suggested-places', [\App\Http\Controllers\SuggestedPlaceController::class, 'store']);

Route::middleware(['auth:sanctum', 'role:guide'])
    ->prefix('guide')
    ->group(function () {
        Route::prefix('profile')->controller(ProfileController::class)->group(function () {
            Route::get('', 'show');
            Route::post('',  'update');
        });

        Route::prefix('bookings')->controller(BookingController::class)->group(function () {
            Route::get('/', 'index');
            Route::post('/{booking}/accept', 'accept');
            Route::post('/{booking}/reject',  'reject');
            Route::post('/{booking}/cancel',  'cancel');
        });

        Route::get('/reviews', [ReviewController::class, 'index']);

        Route::get('/dashboard', [GuideDashboardController::class, 'index']);
    });

Route::middleware(['auth:sanctum', 'role:tourist'])
    ->prefix('tourist')
    ->group(function () {
        Route::get('/guide-bookings', [TouristGuideBookingController::class, 'index']);
        Route::get('/guide-bookings/{booking}', [TouristGuideBookingController::class, 'show']);
        Route::post('/guide-bookings/{guide}/book', [TouristGuideBookingController::class, 'book']);
        Route::post('/guide-bookings/{booking}/cancel', [TouristGuideBookingController::class, 'cancel']);
        Route::post('/guide-bookings/{booking}/review', [TouristGuideBookingController::class, 'review']);

        Route::get('/reviews', [TouristReviewController::class, 'index']);

        Route::get('/ai/trips', [AiTripController::class, 'trips']);
        Route::post('/ai/trips/plan', [AiTripController::class, 'plan']);
        Route::get('/ai/trips/{trip}', [AiTripController::class, 'show']);
        Route::post('/ai/nearby-places', [AiTripController::class, 'nearby']);
    });

//الاشعارات
Route::middleware('auth:sanctum')->group(function () {

    // كل الإشعارات
    Route::get('/notifications', [NotificationController::class, 'index']);

    // الإشعارات الجديدة فقط
    Route::get('/notifications/unread', [NotificationController::class, 'unread']);

    // عدد الإشعارات الجديدة
    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);

    // وضع علامة مقروء للجميع
    Route::post('/notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead']);
});
