import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Reservas from "../pages/Reservas/Reservas";
import Relatorios from "../pages/Relatorios/Relatorios";
import PrivateRoute from "../components/PrivateRoutes/PrivateRoutes";
import { jwtDecode } from "jwt-decode";

const AppRoutes = () => {
  let isAuthenticated = false;
  const token = localStorage.getItem("token") || sessionStorage.getItem("token") || "";

  if (token) {
    if (token === "fake-jwt-token") {
      isAuthenticated = true;
    } else {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          isAuthenticated = true;
        } else {
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
        }
      } catch (error) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/reservas" element={<PrivateRoute element={<Reservas />} />} />
        <Route path="/relatorios" element={<PrivateRoute element={<Relatorios />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
