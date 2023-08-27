import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
import ModalLogin from "./ModalLogin";
const ModalRegister = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [checkInputUser, setCheckInputUser] = useState(false);
  const [checkInputPass, setCheckInputPass] = useState(false);
  const [checkInputRepeatPass, setCheckInputRepeatPass] = useState(false);
  const [formValue, setFormValue] = useState({
    user: "",
    pass: "",
    rPass: "",
  });

  const handleChange = (ev) => {
    setFormValue({ ...formValue, [ev.target.name]: ev.target.value });

    if (formValue.user !== "") {
      setCheckInputUser(false);
    }
    if (formValue.pass !== "") {
      setCheckInputPass(false);
    }
    if (formValue.rPass !== "") {
      setCheckInputRepeatPass(false);
    }
  };

  const crearCuenta = async () => {
    try {
      if (!formValue.user) {
        setCheckInputUser(true);
      }
      if (!formValue.pass) {
        setCheckInputPass(true);
      }
      if (!formValue.rPass) {
        setCheckInputRepeatPass(true);
      }

      if (formValue.pass === formValue.rPass) {
        const res = await clienteAxios.post(
          "/usuarios",
          {
            username: formValue.user,
            pass: formValue.pass,
          },
          config
        );

        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Registro Exitoso!!!",
            showConfirmButton: false,
            timer: 1500,
          });
          setShow(false);
  setShowLoginModal(true);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "OH NO!",
          text: "Las contraseñas no coinciden",
        });
      }
    } catch (error) {
        console.log(error)
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
    }
}

  return (
    <>
      <button  className="mx-4 navbarLink button_slide slide_down bg-black" onClick={handleShow}>
        Registrase
      </button>

      <Modal  className='letra'show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Complete los datos</Modal.Title>
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
                className={
                  checkInputUser ? "form-control is-invalid" : "form-control"
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="pass"
                onChange={handleChange}
                placeholder="**********"
                className={
                  checkInputPass ? "form-control is-invalid" : "form-control"
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Repetir contraseña</Form.Label>
              <Form.Control
                type="password"
                name="rPass"
                onChange={handleChange}
                placeholder="**********"
                className={
                  checkInputRepeatPass
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-around">
          <button className="boton_eliminar slide_right_eliminar" onClick={handleClose}>
          <i className="bi me-2 bi-x-circle-fill"></i>
            Cerrar
          </button>
          <button className="boton slide_right" onClick={crearCuenta}>
          <i className="bi me-2 bi-check-square-fill"></i>
            
            Registrarse{" "}
          </button>
        </Modal.Footer>
       
      </Modal>
      
    </>
  );
};

export default ModalRegister;
