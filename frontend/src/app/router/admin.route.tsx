import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "../layout/admin/AdminLayout";
import { 
  AdminHomePage, 
  CitiesPage, 
  CategoriesPage, 
  InterestsPage, 
  LanguagesPage, 
  UsersPage, 
  SuggestedPlacesPage,
  DestinationsPage,
  CreateDestinationPage
} from "@/features/admin";

const adminRoutes  = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute role="admin">
            <AdminHomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "cities",
        element: (
          <ProtectedRoute role="admin">
            <CitiesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute role="admin">
            <CategoriesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "interests",
        element: (
          <ProtectedRoute role="admin">
            <InterestsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "languages",
        element: (
          <ProtectedRoute role="admin">
            <LanguagesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "interests",
        element: (
          <ProtectedRoute role="admin">
            <InterestsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute role="admin">
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "suggested-places",
        element: (
          <ProtectedRoute role="admin">
            <SuggestedPlacesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "places",
        element: (
          <ProtectedRoute role="admin">
            <DestinationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "places/create",
        element: (
          <ProtectedRoute role="admin">
            <CreateDestinationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "destinations",
        element: (
          <ProtectedRoute role="admin">
            <DestinationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "destinations/create",
        element: (
          <ProtectedRoute role="admin">
            <CreateDestinationPage />
          </ProtectedRoute>
        ),
      },
    ],
  }
];
export default adminRoutes;
