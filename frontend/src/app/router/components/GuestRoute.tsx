import { Navigate , useLocation} from "react-router-dom";
import useAuthStore from "@/features/auth/store/authStore";

import type { ReactNode } from "react";

export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const from = location.state?.from;

  if (user) {
    return <Navigate to={from || `/${user.role}`} replace />;
  }
  
  return children;
};