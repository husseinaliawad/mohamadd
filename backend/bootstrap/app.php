<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Exceptions\BadDataException;
use App\Http\Middleware\UserRole;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            "role" => UserRole::class,            
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        // معالجة خطأ عدم توفر قاعدة البيانات
        $exceptions->render(function (\Illuminate\Database\QueryException $e, $request) {

            // SQLSTATE[HY000] [2002] = قاعدة البيانات غير متاحة
            if (str_contains($e->getMessage(), 'SQLSTATE[HY000] [2002]')) {
                return response()->json([
                    'message' => 'قاعدة البيانات غير متاحة حالياً. يرجى المحاولة لاحقاً.',
                ], 504);
            }

            return null; // دع Laravel يتابع المعالجة الافتراضية
        });


        $exceptions->render(function (BadDataException $e, $request) {
            return api_error(
                message: $e->getMessage(),
                status: 422
            );
        });

        $exceptions->render(function (ValidationException $e) {
            return api_error(
                errors: $e->errors(),
                message: 'بيانات الإدخال غير صحيحة',
                status: 422
            );
        });

        $exceptions->render(function(AccessDeniedHttpException $e){
            return api_error(
                message: $e->getMessage(),
                status: 403
            );
        });
    })->create();
