import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
import ModalLogin from "./ModalLogin";
import { Formik } from "formik";
import errorsSchema from "../helpers/validationSchemaErrors";

const ModalRegister = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const crearCuenta = async (values) => {
    try {
      if (values.pass === values.repeatPass) {
        const res = await clienteAxios.post(
          "/usuarios",
          {
            user: values.user,
            pass: values.pass,
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
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "OH NO!",
          text: "Las contraseñas no coinciden",
        });
      }
    } catch (error) {
      console.log(error);
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
  };

  return (
    <>
      <button
        className="mx-4 navbarLink button_slide slide_down bg-black"
        onClick={handleShow}
      >
        Registrase
      </button>

      <Modal className="letra" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Complete los datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ user: "", pass: "", repeatPass: "" }}
            onSubmit={(values) => crearCuenta(values)}
            validationSchema={errorsSchema}
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
                <Form.Group className="mb-3">
                  <Form.Label>Repetir contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="repeatPass"
                    value={values.repeatPass}
                    onChange={handleChange}
                    placeholder="**********"
                    className={
                      errors.repeatPass && touched.repeatPass && "is-invalid"
                    }
                  />
                  <small className="text-danger">
                    {" "}
                    {errors.repeatPass &&
                      touched.repeatPass &&
                      errors.repeatPass}
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
                    Registrarse{" "}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <hr />
        <h4 className="text-center ">¿Ya tienes una cuenta?</h4>
        <ModalLogin />
        <aside className="mb-1" />
      </Modal>
    </>
  );
};

export default ModalRegister;
