import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import useAuthStore from "@/features/auth/store/authStore";

type ProtectedRouteProps = {
  children: ReactNode;
  role: "tourist" | "guide" | "admin";
};

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, isValidating } = useAuthStore();
  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-primary-500">جاري التحقق من صلاحية حسابك...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  if (user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

