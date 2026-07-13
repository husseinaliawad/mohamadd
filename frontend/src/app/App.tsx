import Toasty from "./providers/ToastProvider";
import QueryProvider from "./providers/QueryProvider";
import { AppRouter } from "./router/AppRouter";


import { useEffect } from "react";
import useAuthStore from "@/features/auth/store/authStore";

export default function App() {

  const validateUser = useAuthStore((s) => s.validateUser);

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <>
      <Toasty />
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </>
  );
}



