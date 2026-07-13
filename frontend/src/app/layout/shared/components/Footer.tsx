import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const brief = "منصة NextTrip Syria تساعدك على اكتشاف الوجهات السياحية، التخطيط الذكي للرحلات، وحجز المرشدين المحليين بسهولة.";
const copyRight = "© 2026 NextTrip Syria — جميع الحقوق محفوظة";

const Footer = () => {
  // روابط مهمة
  const links = [
    { label: "خطط رحلتك", to: "/plan" },
    { label: "احجز مرشدك", to: "/guides" },
    { label: "حول المنصة", to: "/about" },
  ];

  // بيانات التواصل
  const contact = [
    { label: "البريد:", value: "support@nexttrip.sy" },
    { label: "الهاتف:", value: "+963 999 999 999" },
    { label: "العنوان:", value: "دمشق – سوريا" },
  ];

  // أيقونات التواصل
  const icons = [
    { Icon: Mail, to: "mailto: support@nexttrip.sy" },
    { Icon: Phone, to: "tel: +963 999 999 999" },

  ];

  return (

    <footer
      className="bg-white border-t-2 border-gray-400 md:ps-30 pt-20 pb-10 px-8 z-50 relative bg-radial from-white via-secondary-100/10 to-primary-300/20"
      style={{ backgroundSize: "100% 100%" }}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LOGO + ABOUT */}
        <div>
          <div className="mb-4">
            <Link to="/">
              <img src="/logo.png" alt="NextTrip Syria Logo" className="w-20 md:w-40 h-auto" />
            </Link>
          </div>

          <p className="text-gray-600 leading-relaxed">{brief}</p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-xl font-semibold text-primary-700 mb-4">روابط مهمة</h3>
          <ul className="space-y-2 text-gray-700">
            {links.map((item, i) => (
              <li key={i} className="hover:text-primary cursor-pointer transition">
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-semibold text-primary-700 mb-4">تواصل معنا</h3>

          <ul className="space-y-2 text-gray-700">
            {contact.map((c, i) => (
              <li key={i}>
                {c.label} {c.value}
              </li>
            ))}
          </ul>

          <div className="flex gap-4 mt-4 justify-start">
            {icons.map((icon, index) => (
              <div
                key={index}
                className="w-9 h-9 text-secondary-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-light/20 transition"
              >
                <Link to={icon.to}>
                  <icon.Icon />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 text-sm">{copyRight}</div>
    </footer>
  );
};

export default Footer;
