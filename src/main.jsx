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
import AuthHome from "./pages/AuthHome";
import { ThemeContextProvider as ThemeProvider } from "./contexts/ThemeContext";
import ProductDetails from "./pages/ProductDetails";
import CreateProductPage from "./pages/CreateProductPage";
import ProductNotFound from "./pages/ProductNotFound";
import { CartProvider } from "./contexts/CartContext";
import ShoppingCart from "./pages/ShoppingCart";



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
            path: "home",
            element: <AuthHome />,
          },
          {
            path: "product/:productId",
            element: <ProductDetails />,
          },
          {
            path: "addproduct",
            element: <CreateProductPage />,
          },
          {
            path: "product-not-found",
            element: <ProductNotFound />,
          },
          {
            path : 'shoppingCart',

            element : <ShoppingCart/>

            
          }
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
    <ThemeProvider>
      <CartProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>,
);
