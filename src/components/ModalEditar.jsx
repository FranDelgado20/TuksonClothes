import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
const ModalEditar = ({ idProducto, setProductos }) => {
  const [show, setShow] = useState(false);

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    codigo: "",
    descripcion: "",
    categoria: "",
    imagen: "",
    stock: "",
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

        {
          nombre: producto.nombre,
          precio: producto.precio,
          codigo: producto.codigo,
          descripcion: producto.descripcion,
          categoria: producto.categoria,
          cantidad: 1,
          stock: producto.stock,
          imagen: producto.imagen,
        },
        config
      );
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "El producto se edito correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        setShow(false);
        getProduct();
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
      <button className=" slide_down_editar boton_editar " onClick={handleShow}>
        <i className="bi bi-pencil-fill"></i> Editar
      </button>

      <Modal show={show} className="letra" onHide={handleClose}>
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

            <Form.Group className="mb-3">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as={"textarea"}
                name="descripcion"
                onChange={handleChange}
                placeholder="Descripcion del producto"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                name="categoria"
                onChange={handleChange}
                aria-label="Default select example"
              >
                <option>Seleccione una categoria</option>
                <option value="Calzado">Calzado</option>
                <option value="Remeras">Remeras</option>
                <option value="Camperas_Buzos">Camperas y buzos</option>
              </Form.Select>
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
            <Form.Group className="mb-3">
              <Form.Label>STOCK</Form.Label>
              <Form.Control
                type="text"
                name="stock"
                onChange={handleChange}
                placeholder="###"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="boton_eliminar slide_right_eliminar"
            onClick={handleClose}
          >
            <i className="bi me-2 bi-x-circle-fill"></i>
            Cerrar
          </button>
          <button
            className="boton slide_right"
            onClick={() => editarProd(idProducto)}
          >
            <i className="bi me-2 bi-check-lg"></i>
            Guardar cambios
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditar;
