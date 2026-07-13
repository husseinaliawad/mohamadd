<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $roles): Response
    {
        $user = $request->user();

        if (! $user ) {
            return api_error('لا يحق لك طلب هذه الوظيفة');
        }

        $allowedRoles = array_map('trim', explode(',', $roles));

        if (! in_array($user->role->value, $allowedRoles, true)) {
            return api_error('لا يحق لك طلب هذه الوظيفة');
        }

        return $next($request);
    }
}
