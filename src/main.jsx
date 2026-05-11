import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Layout from "./Layouts/Layout";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import ProductCart from "./pages/ProductCart";
import AuthHome from "./pages/AuthHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        // ProtectedRoutes
        
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "productCart",
            element: <ProductCart />,
          },
          {
            path: "home",
            element: <AuthHome />,
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
