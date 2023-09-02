import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import ModalRegister from "./ModalRegister";
import ModalLogin from "./ModalLogin";
import { useState } from "react";
import { useEffect } from "react";
import NavLinkItem from "./NavLinkItem";

const NavComp = () => {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  // const tokenLS = JSON.parse(localStorage.getItem("token"));
  // const roleLS = JSON.parse(localStorage.getItem("role"));
  useEffect(() => {
    const findToken = JSON.parse(localStorage.getItem("token"));
    const findRole = JSON.parse(localStorage.getItem("role"));
    setToken(findToken);
    setRole(findRole);
  }, []);
  const saveToken = (accessToken, userRole) => {
    setToken(accessToken);
    setRole(userRole);
  };
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    localStorage.removeItem("idCart");
    localStorage.removeItem("role");
    setToken("");
    setRole("");
    navigate("/");
  };
  return (
    <>
      <Navbar expand="lg" className="  fixed-top bg-black">
        <container className="d-flex container-fluid">
          <Navbar.Brand>
            <img
              className="img-fluid "
              style={{ width: "150px" }}
              src="/Img/Tukson.png"
              alt=""
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {token && role === "user" ? (
              <Nav className="me-auto nav">
                <NavLinkItem to={"/user"} name={"Inicio"} />
                <NavLinkItem to="/user/nosotros" name={"Sobre Nosotros"} />
                <NavLinkItem name={"PRODUCTOS"} to="/user/productos" />
                <NavLinkItem
                  to="/user/carrito"
                  name={<i className="bi bi-cart-fill"></i>}
                />
              </Nav>
            ) : token && role === "admin" ? (
              <Nav className="me-auto">
                <NavLinkItem to={"/admin"} name={"Inicio"} />

                <NavLink
                  className="text-white mx-4 navbarLink button_slide slide_down "
                  to="/listaUsuarios"
                >
                  Ver usuarios
                </NavLink>
              </Nav>
            ) : (
              <Nav className="me-auto nav">
                <NavLinkItem to={"/"} name={"Inicio"} />
                <NavLinkItem to="/nosotros" name={"Sobre Nosotros"} />

                <NavLinkItem name={"PRODUCTOS"} to="/productos" />
              </Nav>
            )}
            {token ? (
              <>
                <Nav className="ms-auto nav">
                  <NavLink
                    className="text-white mx-4 navbarLink button_slide slide_down" onClick={logOut}>
                    Cerrar sesion
                  </NavLink>
                </Nav>
              </>
            ) : (
              <>
                <Nav className="ms-auto nav">              
                  <ModalRegister />
                  <ModalLogin saveToken={saveToken} />                
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </container>
      </Navbar>
    </>
  );
};

export default NavComp;
