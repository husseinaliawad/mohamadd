import GuideLayout from "@/app/layout/guide/GuideLayout";
import GuideHomePage from "@/features/guide/home/pages/GuideHomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import GuideProfilePage from "@/features/guide/profile/pages/GuideProfilePage";
import AllBookingsPage from "@/features/guide/bookings/pages/AllBookingsPage";
import GuideReviewsPage from "@/features/guide/reviews/pages/GuideReviewsPage";
import GuideNotificationsPage from "@/features/notifications/pages/GuideNotificationsPage";
import NotFoundPage from "@/features/main/pages/NotFoundPage";

const guideRoutes = [
  {
    path: "/guide",
    element: <GuideLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute role="guide">
            <GuideHomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: <GuideProfilePage />
      },
      {
        path: 'bookings',
        element: <AllBookingsPage />
      },
      {
        path: 'reviews',
        element: <GuideReviewsPage />
      },
      {
        path: 'notifications',
        element: <GuideNotificationsPage />
      },
      {
        path: 'suggest-place',
        element: <NotFoundPage />
      },
    ],
  },
];
export default guideRoutes;
