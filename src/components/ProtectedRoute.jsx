import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SplashScreen from "./SplashScreen";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (location.pathname === "/*") return <Outlet />;

  if (isLoading) return <SplashScreen />;

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/sign-in"
      state={{ from: `${location.pathname}${location.search} ` }}
    />
  );
};

export default ProtectedRoute;
