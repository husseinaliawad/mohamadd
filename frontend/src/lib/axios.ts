// util/axios.ts
import useAuthStore from "@/features/auth/store/authStore";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE,  
  timeout: 10000,
});


// 🟦 إضافة التوكن قبل كل طلب
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // ← الوصول للتوكن بدون hook

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

interface ErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

const handleError = (error: AxiosError<ErrorResponse>) => {
  let status = error.response?.status;
  let errorData = error.response?.data;

  // console.log("axios-log", status, errorData);
  console.log("axios-log", error);

  if (error.message === "Network Error" && !error.response) 
       status = 503;
  
  switch (status) {
    case 401:
      toast.error("انتهت صلاحية الجلسة سيتم تحويلك إلى صفحة الدخول");
      window.location.href = "/login";
      break;

    case 403:
      toast.error("لا يوجد لديك صلاحيات ");
      break;

    case 422:
      // toast.error("البيانات المدخلة غير صحيحة");
      errorData = { ...errorData, errors: errorData?.errors || {} };
      console.log(errorData);
      break;

    case 503:
      toast.error("الخادم غير متوفر حالياً. يرجى المحاولة لاحقاً.");
      break;

    default:
      toast.error(errorData?.message || "حدث خطأ غير متوقع");
  }

  return Promise.reject(error);
};

api.interceptors.response.use(
  (response) => response,
  (error) => handleError(error)
);

export default api;