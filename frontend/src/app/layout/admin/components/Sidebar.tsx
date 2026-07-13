import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Users,
  MapPin,
  Settings,
  Menu,
  X,
  LayoutDashboard,
  Bell,
  Database,
  ChevronDown,
  LogOut,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import useAuthStore from "@/features/auth/store/authStore";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  // حالة فتح القوائم الفرعية
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label: any) => {
    setOpenMenus((prev: any) => ({ ...prev, [label]: !prev[label] }));
  };
  // console.log(openMenus);
  const menu = [
    {
      label: "الرئيسية / الإحصائيات",
      to: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "إدارة الجداول الأساسية",
      icon: Database,
      children: [
        { label: "المدن", to: "/admin/cities" },
        { label: "أنواع الأماكن", to: "/admin/categories" },
        { label: "الاهتمامات", to: "/admin/interests" },
        { label: "اللغات", to: "/admin/languages" },
      ],
    },
    {
      label: "إدارة المستخدمين",
      icon: Users,
      to: "/admin/users",
    },
    {
      label: "اقتراحات الأماكن",
      to: "/admin/suggested-places",
      icon: CheckCircle,
    },
    {
      label: "إدارة الأماكن",
      to: "/admin/places",
      icon: MapPin,
    },
    {
      label: "إشعارات الأماكن",
      to: "/admin/notifications",
      icon: Bell,
    }
  ];

  return (
    <>
      {/* زر فتح القائمة في الجوال */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-2 right-4 bg-secondary-200 shadow p-2 rounded-full text-primary-500 z-50"
      >
        <Menu size={22} />
      </button>

      {/* خلفية */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-secondary-800/80 md:hidden z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 w-64 z-50 h-screen          
          text-secondary-800 md:bg-white/10 bg-white/90
          flex flex-col py-6 
          ${open ? "translate-x-0" : "translate-x-full"}
          md:static md:translate-x-0
          transform transition-transform duration-500
        `}
      >
        {/* زر إغلاق */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden absolute top-4 left-4 bg-secondary-200 p-1 rounded-full shadow"
        >
          <X size={22} />
        </button>

        {/* الشعار */}
        <Link to="/" className="flex justify-center">
          <img src="/logo.png" className="w-40 mb-10" />
        </Link>

        <h2 className="text-2xl mb-8 text-primary-700 font-bold text-center">
          لوحة التحكم
        </h2>

        <nav className="flex flex-col gap-2 px-4 text-lg">
          {menu.map((item) => {
            const Icon = item.icon;

            // عنصر رئيسي بدون children
            if (!item.children) {
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 px-3 rounded-md transition ${isActive
                      ? "bg-secondary-100"
                      : "hover:bg-secondary-300/60"
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            }

            // عنصر رئيسي مع children
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-secondary-300/60"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {item.label}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition ${openMenus[item.label] ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {openMenus[item.label] && (
                  <div className="ml-6 mt-1 flex flex-col gap-1 text-lg bg-secondary-100/30">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.label}
                        to={child.to}
                        onClick={() => setOpen(false)}
                        className=" ps-10 py-0.5 hover:bg-secondary-300/60"
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <button className="flex py-2 px-6 w-10/12  gap-3 mt-3 rounded-md transition hover:bg-primary-400/60 hover:text-primary-50" onClick={() => logout(() => navigate("/"))}>
          <LogOut size={18} /> تسجيل الخروج
        </button>
      </aside>
    </>
  );
}
