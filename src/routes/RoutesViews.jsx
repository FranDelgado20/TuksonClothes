import React from "react";
import NavComp from "../components/NavComp";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import FooterComp from "../components/FooterComp";
import SobreNosotrosPage from "../pages/SobreNosotrosPage";
import ProductosPage from "../pages/ProductosPage";
import CadaProdPage from "../pages/CadaProdPage";
import LoginPage from "../pages/LoginPage";

import RegisterPage from "../pages/RegisterPage";
import CarritoPage from "../pages/CarritoPage";
import AdminPage from "../pages/AdminPage";
import VistaUsuariosAdmin from "../pages/VistaUsuariosAdmin";
import PrivateRoute from "../components/PrivateRoute";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/nosotros" element={<SobreNosotrosPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/oneProd/:id" element={<CadaProdPage />} />

        <Route
          path="/user"
          element={
            <PrivateRoute role="user">
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/productos"
          element={
            <PrivateRoute role="user">
              <ProductosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/oneProd/:id"
          element={
            <PrivateRoute role="user">
              <CadaProdPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/nosotros"
          element={
            <PrivateRoute role="user">
              <SobreNosotrosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/carrito"
          element={
            <PrivateRoute role="user">
              <CarritoPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/listaUsuarios"
          element={
            <PrivateRoute role="admin">
              <VistaUsuariosAdmin />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default RoutesViews;
