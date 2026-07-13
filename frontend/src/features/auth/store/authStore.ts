import api from "@/lib/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// شكل بيانات المستخدم
export type User = {
  id: number;
  name: string;
  email: string;
  role: "tourist" | "guide" | "admin";
};

// شكل الـ store
 type AuthState = {
  user: User | null;
  token: string | null;
  isValidating: boolean;

  login: (user: User, token: string) => void;
  logout: (callback?: () => void) => void;
  validateUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isValidating: true,

      login: (user, token) => set({ user, token }),

      logout: (callback) => {
        set({ user: null, token: null });
        if (callback) callback?.();
      },

      validateUser: async () => {
        const { user, token } = get();
        if (!user || !token) {
          set({ isValidating: false });
          return;
        }

        try {
          const res = await api.get('me');
          if (!res.data.success) {
            set({ user: null, token: null });
          }
        } catch {
          set({ user: null, token: null });
        }

        set({ isValidating: false });
      },
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;    