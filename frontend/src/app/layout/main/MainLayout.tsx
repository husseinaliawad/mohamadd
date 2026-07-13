// layout.tsx
import AOS from "aos";
import "aos/dist/aos.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import Footer from "../shared/components/Footer";

const MainLayout = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // الحركة تظهر مرة واحدة فقط
    });
  }, []);
  return (
    <div
      className="min-h-screen bg-gray-50    
                bg-[url('/syria-map.svg'),radial-gradient(#ffffff50,#763f9e20,#14b8a620)]
                bg-size-[100%_100%]  bg-fixed " dir="rtl" style={{ backgroundSize: "100% 100vh" }}>
      <NavBar />

      <main className="flex-1 px-1 md:px-5">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
