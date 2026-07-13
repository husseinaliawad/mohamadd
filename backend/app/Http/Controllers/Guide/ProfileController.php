<?php

namespace App\Http\Controllers\Guide;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateGuideProfileRequest;
use App\Http\Resources\GuideResource;
use App\Models\User;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show()
    {
        $guide = Auth::user()->guide;
        $guide->load('languages', 'cities');
        // return $guide; 
        return api_success(data: new GuideResource($guide));
    }

    public function update(UpdateGuideProfileRequest $request)
    {
        $guideData = $request->only('gender', 'phone', 'DOB', 'daily_price', 'bio');
        $userData = $request->only('name', 'status');

        $guide = Auth::user()->guide;

        if ($request->hasFile('avatar')) {
            if ($guide->avatar)  Storage::delete($guide->avatar);
            $guideData['avatar'] = $request->file('avatar')->store('avatars');
        }

        DB::transaction(function () use ($userData , $guideData) {
            $user = User::find(Auth::id());
            $user->update($userData);
            $user->guide()->update($guideData);
        });


        // تحديث اللغات
        $guide->languages()->sync($request->languages);

        // تحديث المدن
        $guide->cities()->sync($request->cities);

        return api_success(data: new GuideResource($guide->refresh()));
    }
}
