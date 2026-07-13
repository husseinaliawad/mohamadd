<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query()->with(['guide']);

        if ($request->filled('role')) {
            $role = UserRole::tryFrom($request->role);

            if (! $role) {
                return api_error(null, 'نوع المستخدم غير صالح');
            }

            $query->where('role', $role->value);
        }

        if ($request->filled('status')) {
            $status = UserStatus::tryFrom($request->status);

            if (! $status) {
                return api_error(null, 'حالة الحساب غير صالحة');
            }

            $query->where('status', $status->value);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search): void {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return api_success($query->latest()->paginate($request->get('per_page', 15)));
    }

    public function show(User $user)
    {
        return api_success($user->load(['guide']));
    }

    public function changeStatus(Request $request, User $user)
    {
        $data = $request->validate([
            'status' => 'sometimes|required|in:active,blocked,unavailable,closed',
        ]);

        $user->fill($data);
        $user->save();

        return api_success($user->fresh(), 'تم تحديث حالة المستخدم');
    }
    /**
     * Undocumented function
     *
     * @param User $user
     * @return void
     */
    public function makeAdmin(User $user)
    {
        if ($user->role !== UserRole::Tourist) {
            return api_error(null, 'حالة الحساب لا تسمح بالتحويل إلى آدمن');
        }
        $data = ['role' => 'admin'];
        $user->fill($data);
        $user->save();
        return api_success($user->fresh(), 'تم تحديث حالة المستخدم');
    }
}
