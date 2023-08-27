import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import ModalRegister from "./ModalRegister";
import ModalLogin from "./ModalLogin";

const NavComp = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const role = JSON.parse(localStorage.getItem("role"));
  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    localStorage.removeItem("idCart");
    localStorage.removeItem("role");

    navigate("/");
  };
  return (
    <>
      <Navbar expand="lg" className="   bg-black">
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
                <NavLink className="text-white mx-4  navbarLink button_slide slide_down" to={"/user"}>
                  Inicio
                </NavLink>
                <NavLink className="text-white mx-4 navbarLink button_slide slide_down" to="/user/nosotros">
                  Sobre Nosotros
                </NavLink>
               
                <NavLink className="text-white mx-4 navbarLink button_slide slide_down" to="/user/productos">
                  PRODUCTOS
                </NavLink>
                <NavLink className="text-white mx-4 navbarLink button_slide slide_down" to="/user/carrito">
                  <i className="bi bi-cart-fill"></i>
                </NavLink>
              </Nav>
            ) : token && role === "admin" ? (
              <Nav className="me-auto">
                <NavLink className="text-white mx-4 navbarLink button_slide slide_down" to={"/admin"}>
                  Inicio
                </NavLink>

                
                <NavLink className="text-white mx-4 navbarLink button_slide slide_down " to="/listaUsuarios">
                  Ver usuarios
                </NavLink>
              </Nav>
            ) : (
              <Nav className="me-auto nav">
                <NavLink className="text-white mx-4 navbarLink  button_slide slide_down" to={"/"}>
                  Inicio
                </NavLink>
                <NavLink className="text-white mx-4 navbarLink button_slide slide_down" to="/nosotros">
                  Sobre Nosotros
                </NavLink>
                
                <NavLink className="text-white mx-4 navbarLink button_slide slide_down" to="/productos">
                  PRODUCTOS
                </NavLink>
              </Nav>
            )}
            {token ? (
              <>
                <Nav className="ms-auto nav">
                  <NavLink className="text-white mx-4 navbarLink button_slide slide_down" onClick={handleClick}>
                    {" "}
                    Cerrar sesion
                  </NavLink>
                </Nav>
              </>
            ) : (
              <>
                <Nav className="ms-auto nav">
                  {/* <NavLink className="text-white mx-4 navbarLink" to="/register">
                    Registrase
                  </NavLink> */}
                  <ModalRegister/>
                  <ModalLogin/>
                  {/* <NavLink className="text-white mx-4 navbarLink" to="/login">
                    Iniciar Sesion
                  </NavLink> */}
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
