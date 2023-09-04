import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
import { Formik } from "formik";
import { errorLogin } from "../helpers/validationSchemaErrors";
import ModalRegister from "./ModalRegister";

const ModalLogin = ({saveToken}) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    
   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  
    const ingresoCuenta = async (values) => {
     
      try {
        const res = await clienteAxios.post(
          "/usuarios/login",
          {
            user: values.user,
            pass: values.pass,
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
            saveToken(res?.data?.updateData?.token, res?.data?.updateData?.role )
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
      <Modal className="letra" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ingrese a su cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ user: "", pass: ""}}
            onSubmit={(values) => ingresoCuenta(values)}
            validationSchema={errorLogin}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="email"
                    name="user"
                    onChange={handleChange}
                    value={values.user}
                    placeholder="Ingrese su email"
                    className={errors.user && touched.user && "is-invalid"}
                  />
                  <small className="text-danger">
                    {" "}
                    {errors.user && touched.user && errors.user}
                  </small>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="pass"
                    value={values.pass}
                    onChange={handleChange}
                    placeholder="**********"
                    className={errors.pass && touched.pass && "is-invalid"}
                  />
                  <small className="text-danger">
                    {" "}
                    {errors.pass && touched.pass && errors.pass}
                  </small>
                </Form.Group>
               
                <div className="d-flex  justify-content-around">
                  <button
                    className="boton_eliminar slide_right_eliminar"
                    onClick={handleClose}
                  >
                    <i className="bi me-2 bi-x-circle-fill"></i>
                    Cerrar
                  </button>
                  <button
                    className="boton slide_right"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <i className="bi me-2 bi-check-square-fill"></i>
                    Iniciar Sesion{" "}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <hr />
        <h4 className="text-center ">¿No tienes cuenta?</h4>
        <ModalRegister />
        <aside className="mb-1" />
      </Modal>
      {/* <Modal className="letra" show={show} onHide={handleClose}>
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
          <button className='boton_eliminar slide_right_eliminar' onClick={handleClose}>
          <i className="bi me-2 bi-x-circle-fill"></i>
            Cerrar
          </button>
          <button className='boton slide_right' onClick={ingresoCuenta}>
          <i className="bi me-2 bi-box-arrow-in-right"></i>
            Iniciar sesion{" "}
          </button>
        </Modal.Footer>
        <hr />
        <h4 className="text-center ">
            ¿No tienes cuenta?
        </h4>
      <ModalRegister  />
        <aside className="mb-1"/>

      </Modal> */}
    </>
  )
}

export default ModalLogin