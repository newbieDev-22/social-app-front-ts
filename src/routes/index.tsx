import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../features/authentication/components/ProtectedRoute";
import RedirectIfLogged from "../features/authentication/components/RedirectIfLogged";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const HomePage = lazy(() => import("../pages/HomePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      // <RedirectIfLogged>
      <LoginPage />
      // </RedirectIfLogged>
    ),
  },
  { path: "*", element: <Navigate to="/" /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
