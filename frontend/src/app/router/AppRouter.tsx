import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@/features/main/pages/HomePage";
import About from "@/features/main/pages/AboutPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import MainLayout from "../layout/main/MainLayout";
import guideRoutes from "./guide.route";
import adminRoutes from "./admin.route";
import { GuestRoute } from "./components/GuestRoute";
import ForbiddenPage from "@/features/main/pages/ForbiddenPage";
import NotFoundPage from "@/features/main/pages/NotFoundPage";
import userRoutes from "./tourist.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { 
        index: true, 
        element: <HomePage /> 
      },
      {
        path: "/about",
        element: <About />,
      },
      ...userRoutes
    ],
  },
  ...guideRoutes,
  ...adminRoutes,
  {
    path: "/login",
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },
  {
    path: "/unauthorized",
    element: <ForbiddenPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },

]);

export const AppRouter = () => <RouterProvider router={router} />;
