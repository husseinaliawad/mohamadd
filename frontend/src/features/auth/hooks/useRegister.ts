import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerUser } from "../api/register.api";
import useAuthStore from "@/features/auth/store/authStore";


export default function useRegister(setError: any) {
  // const { login: setLogin } = useAuthStore();
  const setLogin = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data : any) => registerUser(data),

    onSuccess: (res) => {
      toast.success("اهلا وسهلا");

      const { user, token } = res.data;

      // تخزين الجلسة في Zustand
      setLogin(user, token);

    },

    onError: (error : any) => {
      const backendErrors = error.response?.data?.errors as Record<
        string,
        string[]
      >;

      if (backendErrors) {
        Object.entries(backendErrors).forEach(([field, messages]) => {
          setError(field as any, {
            type: "server",
            message: messages[0],
          });
        });
      }
    },
  });
}
