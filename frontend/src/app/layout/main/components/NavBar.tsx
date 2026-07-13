import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import useAuthStore from "@/features/auth/store/authStore";
import NotificationBell from "@/features/notifications/components/NotificationBell";

const publicLinks = [
  { label: "خطط رحلتك", to: "/plan" },
  { label: "احجز مرشدك", to: "/tourist/guides" },
  { label: "حول المنصة", to: "/about" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const { user, logout } = useAuthStore();
  const role = user?.role;
  const homeUrl = user
    ? role === "admin"
      ? "/admin"
      : role === "guide"
      ? "/guide"
      : "/tourist"
    : "/";

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // إغلاق القائمة عند اختيار عنصر
  const closeMenu = () => setOpen(false);

  return (
    <nav className="px-8 py-3 w-full flex items-top justify-between absolute top-0">

      {/* زر الموبايل */}
      <button
        className="lg:hidden text-secondary-700 -mt-10 pt-3"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* القائمة */}
      <div className="flex flex-1">
        <ul
          ref={menuRef}
          className={`
            justify-between w-3/5 text-secondary-600 font-medium text-base md:text-xl transition-all pt-5
            lg:flex lg:flex-row lg:static
            ${open ? "flex flex-col absolute top-20 right-8 bg-white/95 shadow-lg p-6 rounded-xl gap-6 z-40" : "hidden"}
          `}
        >
          <li className="hover:text-primary-500 transition" onClick={closeMenu}>
            <Link to={homeUrl}>الصفحة الرئيسية</Link>
          </li>

          {publicLinks.map((link) => (
            <li
              key={link.to}
              className="hover:text-primary-500 transition"
              onClick={closeMenu}
            >
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}

          {!user && (
            <li className="hover:text-primary-500 transition" onClick={closeMenu}>
              <Link to="/login">تسجيل الدخول</Link>
            </li>
          )}

          {user && (
            <li className="relative group cursor-pointer text-secondary-600">
              <span className="flex gap-1">{user.name} <ChevronDown /></span>

              <ul className="absolute hidden group-hover:flex flex-col bg-white border shadow-lg rounded-lg p-4 gap-3 right-0 top-7 w-50 z-50">
                {user.role === "tourist" && (
                  <>
                    <Link
                      to="tourist/my-bookings"
                      className="hover:text-primary-500 transition cursor-pointer"
                      onClick={closeMenu}
                    >
                      حجوزاتي للمرشدين
                    </Link>

                    <Link
                      to="tourist/reviews"
                      className="hover:text-primary-500 transition cursor-pointer"
                      onClick={closeMenu}
                    >
                      تقييماتي للمرشدين
                    </Link>
                  </>
                )}

                <li
                  className="hover:text-primary-500 transition cursor-pointer"
                  onClick={() => {
                    logout(() => navigate("/"));
                    closeMenu();
                  }}
                >
                  تسجيل الخروج
                </li>
              </ul>
            </li>
          )}
        </ul>

        <div className="flex-1 flex justify-center pt-2">
          {user && <NotificationBell />}
        </div>
      </div>

      {/* Logo */}
      <Link to="/" onClick={closeMenu}>
        <img
          src="/logo.png"
          alt="NextTrip Syria Logo"
          className="w-20 md:w-40 h-auto"
        />
      </Link>
    </nav>
  );
};

export default NavBar;
