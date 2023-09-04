import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
import { Formik } from "formik";
import { errorProd } from "../helpers/validationSchemaErrors";
const ModalCrear = ({ setProductos }) => {
  const getProduct = async () => {
    const res = await clienteAxios.get("/productos");

    setProductos(res.data.obtenerProductos);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const crearProd = async (values) => {
  
    try {
      const res = await clienteAxios.post(
        "/productos",
        {
          nombre: values.nombre,
          precio: values.precio,
          codigo: values.codigo,
          descripcion: values.descripcion,
          categoria: values.categoria,
          cantidad: 1,
          stock: values.stock,
          imagen: values.imagen,
        },
        config
      );
      if (res.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto creado correctamente!",
          showConfirmButton: false,
          timer: 1500,
        });
        setShow(false);
        getProduct();
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
      <button className="boton slide_right" onClick={handleShow}>
        <i className="bi me-2 bi-plus-lg"></i>
        Crear un producto
      </button>

      <Modal show={show} className="letra" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creá un producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              nombre: "",
              precio: "",
              codigo: "",
              descripcion: "",
              categoria: "",
              cantidad: 1,
              stock: "",
              imagen: "",
            }}
            onSubmit={(values) => crearProd(values)}
            validationSchema={errorProd}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    onChange={handleChange}
                    placeholder="Ej:Remera"
                    className={errors.nombre && touched.nombre && "is-invalid"}
                  />
                  {errors.nombre && touched.nombre && errors.nombre}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    onChange={handleChange}
                    placeholder="$$$"
                    className={errors.precio && touched.precio && "is-invalid"}
                  />
                  {errors.precio && touched.precio && errors.precio}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Codigo</Form.Label>
                  <Form.Control
                    type="number"
                    name="codigo"
                    onChange={handleChange}
                    placeholder="***"
                    className={errors.codigo && touched.codigo && "is-invalid"}
                  />
                  {errors.codigo && touched.codigo && errors.codigo}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control
                    as={"textarea"}
                    name="descripcion"
                    onChange={handleChange}
                    placeholder="Descripcion del producto"
                    className={
                      errors.descripcion && touched.descripcion && "is-invalid"
                    }
                  />
                  {errors.descripcion &&
                    touched.descripcion &&
                    errors.descripcion}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Select
                    name="categoria"
                    onChange={handleChange}
                    aria-label="Default select example"
                    className={
                      errors.categoria && touched.categoria && "is-invalid"
                    }
                  >
                    <option>Seleccione una categoria</option>
                    <option value="Calzado">Calzado</option>
                    <option value="Remeras">Remeras</option>
                    <option value="Camperas_Buzos">Camperas y buzos</option>
                  </Form.Select>
                  {errors.categoria && touched.categoria && errors.categoria}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Subir Imagen</Form.Label>
                  <Form.Control
                    type="text"
                    name="imagen"
                    onChange={handleChange}
                    placeholder="URL Imagen"
                    className={errors.imagen && touched.imagen && "is-invalid"}
                  />
                  {errors.imagen && touched.imagen && errors.imagen}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>STOCK</Form.Label>
                  <Form.Control
                    type="text"
                    name="stock"
                    onChange={handleChange}
                    placeholder="###"
                    className={errors.stock && touched.stock && "is-invalid"}
                  />
                  {errors.stock && touched.stock && errors.stock}
                </Form.Group>

                <div className="d-flex justify-content-around">
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
                    <i className="bi me-2 bi-check-lg"></i>
                    Guardar cambios
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCrear;
