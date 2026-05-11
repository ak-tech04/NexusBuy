import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const auth = useAuth();

  const isAuthenticated = auth.isAuth;
  // console.log(isAuthenticated);

  // console.log(auth);

  const loading = auth.loading;
  // console.log(loading);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Verifying Session...</span>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
