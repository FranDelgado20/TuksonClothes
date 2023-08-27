import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
const LoginPage = () => {
  const navigate = useNavigate();
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
    }
  };
  return (
    <>
      <div className="container-fluid bg-black d-flex justify-content-center">
        <Form className="text-white  w-50 ">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-3">Nombre de Usuario</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="user"
              type="text"
              placeholder="Usuario"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fs-3">Contraseña</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="pass"
              type="password"
              placeholder="***********"
            />
          </Form.Group>
          <div className="justify-content-center d-flex">
            <Button onClick={ingresoCuenta} variant="success" className="w-50">
            
              Ingresar
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
