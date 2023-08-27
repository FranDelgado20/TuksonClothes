import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
import ModalRegister from "./ModalRegister";

const ModalLogin = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    
   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formValues, setFormValues] = useState({
      user: "",
      pass: "",
    });
    const handleChange = (ev) => {
      setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    };
    const ingresoCuenta = async () => {
      try {
        const res = await clienteAxios.post(
          "/usuarios/login",
          {
            username: formValues.user,
            pass: formValues.pass,
          },
          config
        );
  
        if (res?.data?.updateData?.token) {
          localStorage.setItem(
            "token",
            JSON.stringify(res.data.updateData.token)
          );
          localStorage.setItem("role", JSON.stringify(res.data.updateData.role));
          localStorage.setItem("idUser", JSON.stringify(res.data.updateData._id));
          localStorage.setItem(
            "idCart",
            JSON.stringify(res.data.updateData.idCart)
          );
          res.data?.updateData?.role === "user"
            ? navigate("/user")
            : navigate("/admin");
            setShow(false)
        } else {
          Swal.fire({
            icon: "error",
            title: "OH NO!",
            text: "Usuario y/o contraseña incorrectos",
          });
        }
      } catch (error) {
        if (error.response.status === 500) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Al parecer hubo un error!",
            text: error.response.data.msg,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }}
  return (
    <>
      <button variant="dark" className="bg-black navbarLink button_slide slide_down" onClick={handleShow}>
        Iniciar sesion
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
          <Modal.Title>Ingrese a su cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                name="user"
                placeholder="Nombre de usuario"
               
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="pass"
                onChange={handleChange}
                placeholder="**********"
                
              />
            </Form.Group>
            
          </Form>
          
            
          
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-around">
          <Button variant="danger" onClick={handleClose}>
          <i className="bi me-2 bi-x-circle-fill"></i>
            Cerrar
          </Button>
          <Button variant="success" onClick={ingresoCuenta}>
          <i className="bi me-2 bi-box-arrow-in-right"></i>
            Iniciar sesion{" "}
          </Button>
        </Modal.Footer>
        <hr />
        <h4 className="text-center ">
            ¿No tienes cuenta?
        </h4>
      <ModalRegister  />
      </Modal>
    </>
  )
}

export default ModalLogin