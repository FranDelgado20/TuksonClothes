import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const RegisterPage = () => {
 
  const navigate = useNavigate();

  const [checkInputUser, setCheckInputUser] = useState(false);
  const [checkInputPass, setCheckInputPass] = useState(false);
  const [checkInputRepeatPass, setCheckInputRepeatPass] = useState(false);
  const [formValue, setFormValue] = useState({
    user: "",
    pass: "",
    Rpass: "",
  });
  
  const handleChange = (ev) => {
    setFormValue({ ...formValue, [ev.target.name]: ev.target.value });

    if (formValue.user !== "") {
      setCheckInputUser(false);
    }
    if (formValue.pass !== "") {
      setCheckInputPass(false);
    }
    if (formValue.Rpass !== "") {
      setCheckInputRepeatPass(false);
    }
  };
  
  const crearCuenta = async () => {
    if (!formValue.user) {
      setCheckInputUser(true);
    }
    if (!formValue.pass) {
      setCheckInputPass(true);
    }
    if (!formValue.Rpass) {
      setCheckInputRepeatPass(true);
    }
    

    if (formValue.pass === formValue.Rpass) {
      const res = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formValue.user,
          pass: formValue.pass,
        }),
      });
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registro Exitoso!!!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "EL USUARIO YA EXISTE!!!",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "OH NO!",
        text: "Las contraseñas no coinciden",
      });
    }
  };
  
  return (
    <>
      <div className="container-fluid bg-black d-flex justify-content-center ">
        <Form className="text-white w-50">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-3">Nombre de Usuario</Form.Label>
            <Form.Control
              className={
                checkInputUser ? "form-control is-invalid" : "form-control"
              }
              onChange={handleChange}
              name="user"
              type="text"
              placeholder="Usuario"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-3">Contraseña</Form.Label>
            <Form.Control
              onChange={handleChange}
              className={
                checkInputPass ? "form-control is-invalid" : "form-control"
              }
              name="pass"
              type="password"
              placeholder="***********"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-3">Repetir contraseña</Form.Label>
            <Form.Control
              onChange={handleChange}
              className={
                checkInputRepeatPass
                  ? "form-control is-invalid"
                  : "form-control"
              }
              name="Rpass"
              type="password"
              placeholder="***********"
            />
          </Form.Group>
          <div className="d-flex  justify-content-center">
            <Button onClick={crearCuenta} className="w-50 btn btn-success">
              {" "}
              Registrarse{" "}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default RegisterPage;
