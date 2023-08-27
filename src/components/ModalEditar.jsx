import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
const ModalEditar = ({ idProducto , setProductos}) => {
  const [show, setShow] = useState(false);
 
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    codigo: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (ev) => {
    setProducto({ ...producto, [ev.target.name]: ev.target.value });
  };
  const getProduct = async () => {
    try {
      const res = await clienteAxios.get("/productos");

      setProductos(res.data.obtenerProductos);
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
  const editarProd = async (idProd) => {
    try {
      const res = await clienteAxios.put(
        `/productos/${idProd}`,

        producto,
        config
      );
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "El producto se edito correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        setShow(false)
        getProduct()
      }
    } catch (error) {
      if (error.response.status === 400) {
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

    getProduct();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      <i className="bi bi-pencil-fill"></i>  Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edite un producto</Modal.Title>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => editarProd(idProducto)}>
            Guardar los cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditar;
