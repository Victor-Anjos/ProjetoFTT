import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  element: ReactElement;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const expirationTime = localStorage.getItem("tokenExpiration") || sessionStorage.getItem("tokenExpiration");

  const isTokenValid = token && expirationTime && Number(expirationTime) > Date.now();

  if (!isTokenValid) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tokenExpiration");
  }

  const isAuthenticated = !!isTokenValid;
  const location = useLocation();

  return isAuthenticated ? element : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
