import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Star,
  Briefcase,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  MapPin
} from "lucide-react";
import { useState } from "react";
import useAuthStore from "@/features/auth/store/authStore";
import type { GuideDashboardResponse } from "@/features/guide/home/type";

type Props = {
  guide: GuideDashboardResponse["guide"];
};


export default function Sidebar({guide} :Props) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/guide", icon: Home, label: "الرئيسية" },
    { to: "/guide/profile", icon: User, label: "الملف الشخصي" },
    { to: "/guide/bookings", icon: Briefcase, label: "طلبات الحجز" },
    { to: "/guide/reviews", icon: Star, label: "التقييمات" },
    { to: "/guide/notifications", icon: Bell, label: "الإشعارات" },
    // { to: "/guide/suggest-place", icon: MapPin, label: "اقتراح مكان" },

  ];

  return (
    <>
      {/* زر فتح القائمة في الجوال */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-7 right-4 bg-primary-200 shadow p-2 rounded-full z-50"
      >
        <Menu size={22} />
      </button>

      {/* خلفية عند فتح القائمة */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-primary-800/80 md:hidden z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 w-64 z-50 h-screen          
          text-secondary-800 md:bg-white/10 bg-white/90
          flex flex-col items-center py-6 shadow-xl
          ${open ? "translate-x-0" : "translate-x-full"}
          md:static md:translate-x-0
          transform transition-transform duration-500
        `}
      >
        {/* زر إغلاق */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden absolute top-4 left-4 bg-primary-200 p-1 rounded-full shadow"
        >
          <X size={22} />
        </button>

        {/* صورة واسم المرشد */}
        <img
          src={guide.avatar ?? "/avatar.png"}
          className="w-16 h-16 rounded-full"
        />

        <h2 className="font-bold text-lg">{user?.name}</h2>
        <p className="text-sm text-secondary-800 mb-6">مرشد سياحي</p>

        {/* روابط القائمة */}
        <nav className="flex flex-col gap-3 w-full px-6">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={true}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-3 rounded-md transition ${isActive
                  ? "bg-primary-200"
                  : "hover:bg-primary-400/60 hover:text-primary-50"
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="flex py-2 px-3 w-10/12  gap-3 mt-3 rounded-md transition hover:bg-primary-400/60 hover:text-primary-50" onClick={() => logout(() => navigate("/"))}>
          <LogOut size={18} /> تسجيل الخروج
        </button>
      </aside>
    </>
  );
}
