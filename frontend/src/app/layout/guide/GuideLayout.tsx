import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../shared/components/Footer";
import { useGuideDashboard } from "@/features/guide/home/hooks/useGuideDashboard";

export default function GuideLayout() {
  
  const { data, isLoading } = useGuideDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-primary-500">جاري تحميل بياناتك ...</p>
      </div>
    );
  }

  const guide = data.guide;


  return (
    <>
      <div className="flex min-h-screen  bg-radial  from-secondary-50 to-primary-100">
        <Sidebar guide={guide}/>
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="p-6 pt-0">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
