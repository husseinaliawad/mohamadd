<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Language;
use Illuminate\Http\Request;

class LookupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function cities()
    {
        $cities = City::all();
        return api_success($cities, "كافة المدن");
    }
    
    public function languages()
    {
        $languages = Language::all();
        return api_success($languages, "كافة اللغات");
    }
}
