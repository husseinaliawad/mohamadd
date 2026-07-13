import useAuthStore from "@/features/auth/store/authStore";
import { Bell, LogOut } from "lucide-react";

export default function Header() {
  const logout = useAuthStore((set) => set.logout);
  return (
    <header className="flex items-center justify-between  px-20 py-3 ">
      <button className="relative ">
        <Bell size={40} className="text-secondary-500 hover:text-secondary-400 text-lg cursor-pointer " />
        <span className="absolute -top-1 -right-1 bg-primary-400 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center font-extrabold">
          3
        </span>
      </button>
      <button className="flex items-center gap-2 text-secondary-500 hover:text-secondary-400 text-lg cursor-pointer" onClick={logout}>
           تسجيل الخروج <LogOut size={18} className="rotate-180"/>
        </button>
    </header>
  );
}
