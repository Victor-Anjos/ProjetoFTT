import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/pages/Login/Login";
import Dashboard from "../src/pages/Dashboard/Dashboard";
import Reservas from "../src/pages/Reservas/Reservas";
import Relatorios from "../src/pages/Relatorios/Relatorios";
import PrivateRoute from "../src/components/PrivateRoutes/PrivateRoutes";
import { jwtDecode } from "jwt-decode";
import Cadastro from "./pages/Cadastro/Cadastro";

const App = () => {
  const token = localStorage.getItem("token");
  let isAuthenticated = false;

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        isAuthenticated = true;
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      localStorage.removeItem("token");
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />

          <Route path="/cadastro" element={<Cadastro />} />

        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/reservas"
          element={<PrivateRoute element={<Reservas />} />}
        />
        <Route
          path="/relatorios"
          element={<PrivateRoute element={<Relatorios />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;