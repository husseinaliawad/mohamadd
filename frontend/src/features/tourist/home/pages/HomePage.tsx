import useAuthStore from "@/features/auth/store/authStore";
import {  Heart, Star,  StarsIcon,  Globe, Bell } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserHomePage() {
  const user = useAuthStore((s) => s.user);
  const userCards = [
   {
      title: "حجوزاتي للمرشدين",
      to: "/tourist/my-bookings",
      icon: StarsIcon,
      borderColor: "border-secondary-200",
      iconColor: "text-secondary-300",
      titleColor: "text-secondary-500",
    },
    {
      title: "تقييماتي للمرشدين",
      to: "/tourist/reviews",
      icon: Star,
      borderColor: "border-primary-300",
      iconColor: "text-primary-300",
      titleColor: "text-primary-500",
    },      
     {
      title: "كافة الإشعارات",
      to: "/tourist/notifications",
      icon: Bell,
      borderColor: "border-primary-500",
      iconColor: "text-primary-500",
      titleColor: "text-primary-800",
    },
    {
      title: "رحلاتي لسوريا",
      to: "/tourist/trip",
      icon: Heart,
      borderColor: "border-secondary-500",
      iconColor: "text-secondary-600",
      titleColor: "text-secondary-800",
    },
    {
      title: "خريطة تفاعلية",
      to: "/tourist/guide",
      icon: Globe,
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-300",
      titleColor: "text-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ===== Header Section ===== */}
      <h1 className="text-2xl font-bold text-primary-500 pt-28 text-center w-full ">مرحباً {user?.name} </h1>      

      <section className="grid grid-cols-5 gap-2 md:px-8 mb-10 mx-[5%] lg:mx-[22%] mt-40 sm:mt-28 md:mt-17 ">
        {userCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <Link key={index} to={card.to}>
              <div
                className={`
                   bg-white shadow-md rounded-xl pt-2 pb-5 border-t-4 border-r-4 text-center hover:translate-y-[-10px] transition skew-y-15 skew-x-5               
            ${card.borderColor}
          `}
              >
                <div className="text-center space-y-2">
                  <Icon className={`w-full ${card.iconColor}`} size={30} />
                    <h3 className={`text-xs md:text-lg font-semibold ${card.titleColor}`}>{card.title}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

    
      <main className="px-8 pb-16"></main>
    </div>
  );
}
