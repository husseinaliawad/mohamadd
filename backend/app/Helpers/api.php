<?php

if (!function_exists('api_success')) {
    function api_success($data = null, $message = "تمت العملية بنجاح", $status = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $status);
    }
}

if (!function_exists('api_error')) {
    function api_error($errors = null , $message = "فشلت العملية ", $status = 400)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], $status);
    }
}
