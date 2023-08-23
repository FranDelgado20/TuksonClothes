import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const NavComp = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const role = JSON.parse(localStorage.getItem('role'))
  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    localStorage.removeItem("idCart");
    localStorage.removeItem("role");

    navigate("/");
  }
  return (
    <> 
    <Navbar expand="lg" className="  bg-black">
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
        {/* <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="text-white mx-4" style={{textDecoration:'none'}} to="/">
              Inicio
            </NavLink>
            <NavLink className="text-white mx-4" style={{textDecoration:'none'}} to="/nosotros">
              ¿Quienes somos?
            </NavLink>
          </Nav>
          <Nav className="me-auto">
            <NavLink className="text-white mx-4" style={{textDecoration:'none'}} to="/productos">
              PRODUCTOS
            </NavLink>
            
          </Nav>
          <Nav className="me-5">
            <NavLink className="text-white mx-4" style={{textDecoration:'none'}} to="/login">
              Iniciar Sesión
            </NavLink>
            <NavLink className="text-white mx-4" style={{textDecoration:'none'}} to="#link">
              Registrarse
            </NavLink>
          </Nav>
        </Navbar.Collapse> */}
         <Navbar.Collapse id="basic-navbar-nav">
          {token && role === "user" ? 
            <Nav className="me-auto nav">
              <NavLink className="text-white mx-4" to={"/user"}>Inicio</NavLink>
              <NavLink className="text-white mx-4" to="/user/nosotros">Sobre Nosotros</NavLink>
              <NavLink className="text-white mx-4" to="/user/contacto">Contacto</NavLink>
              <NavLink className="text-white mx-4" to="/user/productos">PRODUCTOS</NavLink>
              <NavLink className="text-white mx-4" to="/user/carrito">Carrito</NavLink>
              

            </Nav>
           : 
           token && role === "admin" ?
            <Nav className="me-auto">
              <NavLink className="text-white mx-4" to={"/admin"}>Inicio</NavLink>
             
              {/* <ModalComp type={'nav'}/> */}
              <NavLink className="text-white mx-4" to="/listaUsuarios">Ver usuarios</NavLink>
             

            </Nav>
            :
             
            <Nav className="me-auto nav">
            <NavLink className="text-white mx-4" to={"/"}>Inicio</NavLink>
            <NavLink className="text-white mx-4" to="/nosotros">Sobre Nosotros</NavLink>
            <NavLink className="text-white mx-4" to="/contacto">Contacto</NavLink>
            <NavLink className="text-white mx-4" to="/productos">PRODUCTOS</NavLink>
          </Nav>
          
            
          }
          {token ? (
            <>
              <Nav className="ms-auto nav">
                <NavLink className="text-white mx-4" onClick={handleClick}> Cerrar sesion</NavLink>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="ms-auto nav">
                <NavLink className="text-white mx-4" to="/register">Registrase</NavLink>
                <NavLink className="text-white mx-4" to="/login">Iniciar Sesion</NavLink>
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