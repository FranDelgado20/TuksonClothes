import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
const ModalCrear = ({setProductos}) => {
  const getProduct = async () => {
    const res = await clienteAxios.get("/productos");

    setProductos(res.data.obtenerProductos);
  };
  const [show, setShow] = useState(false);
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    codigo: "",
    cantidad: "",
    descripcion:'',
    imagen:''
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (ev) => {
    setProducto({ ...producto, [ev.target.name]: ev.target.value });
  };
  const crearProd = async () => {
    try {
      const res = await clienteAxios.post(
        "/productos",
        {
          nombre: producto.nombre,
          precio: producto.precio,
          codigo: producto.codigo,
          descripcion: producto.descripcion,
          cantidad: 1, 
          imagen: producto.imagen
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
        setShow(false)
        getProduct()
        
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
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                onChange={handleChange}
                placeholder="Ej:Remera"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                onChange={handleChange}
                placeholder="$$$"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Codigo</Form.Label>
              <Form.Control
                type="number"
                name="codigo"
                onChange={handleChange}
                placeholder="***"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as={'textarea'}
                name="descripcion"
                onChange={handleChange}
                placeholder="Descripcion del producto"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subir Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                onChange={handleChange}
                placeholder="URL Imagen"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="boton_eliminar slide_right_eliminar" onClick={handleClose}>
          <i className="bi me-2 bi-x-circle-fill"></i>
            Cerrar
          </button>
          <button className='boton slide_right' onClick={crearProd}>
          <i className="bi me-2 bi-check-lg"></i>
            Guardar cambios
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCrear;
