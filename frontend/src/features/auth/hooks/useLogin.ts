import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../api/login.api";
import  useAuthStore  from "@/features/auth/store/authStore";
import type { LoginFormData } from "../schemas/loginSchema";

const useLogin = () => {
  const setLogin = useAuthStore(state => state.login);

  return useMutation({
    mutationFn: (data :LoginFormData) => login(data),


    onSuccess: ( res ) => {
      const { user, token } = res.data;

      setLogin(user, token); 
    },

    onError: () => {
      toast.error("Invalid credentials");
    },
  });
};

export default useLogin;
