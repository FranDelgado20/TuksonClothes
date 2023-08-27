import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
import Form from "react-bootstrap/Form";

const CadaProdPage = () => {
  const [producto, setProducto] = useState({});
  const [carrito, setCarrito] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const idCart = JSON.parse(localStorage.getItem("idCart"));
  const params = useParams();

  const getCart = async () => {
    const res = await clienteAxios.get(`carrito/${idCart}`);

    setCarrito(res.data.cart.products);
  };
  const getProduct = async () => {
    const res = await clienteAxios.get(`/productos/${params.id}`);

    setProducto(res.data.oneProduct);
  };
  const agregarProd = async (id) => {
    try {
      if (!token) {
        ;
      }
      const prodExistente = carrito.find((prod) => prod._id === id);
      if (prodExistente) {
        Swal.fire({
          icon: "error",
          title: "El producto ya existe en el carrito",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      const res = await clienteAxios.post(`/carrito/${idCart}/${id}`, config);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Producto agregado",
          showConfirmButton: false,
          timer: 1500,
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
  useEffect(() => {
    getProduct(), getCart();
  }, []);

  return (
    <>
      {/* <Card key={producto._id} style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>{producto.precio}</Card.Text>
          <Button variant="primary" onClick={() => agregarProd(producto._id)}>
            Agregar al carrito
          </Button>
        </Card.Body>
      </Card> */}

      <div className="container text-light">
        <div className="row">
          <div className="col bordes-cadaProd d-flex justify-content-center ">
            <img className="imagen my-4" src={producto.imagen} alt="" />
          </div>
          <div className="col ">
            <aside>
              <h2 className="text-center">{producto.nombre}</h2>
              <h6>Código: {producto.codigo}</h6>
            </aside>
            <hr />
            <aside className="d-flex justify-content-around my-5">
              <h3 className="ms-5">${producto.precio}</h3>

              <Form.Select className="w-50" aria-label="Default select example">
                <option>Seleccione su talle</option>
                <option value="1">XS</option>
                <option value="2">S</option>
                <option value="3">M</option>
                <option value="4">L</option>
                <option value="5">XL</option>
              </Form.Select>
            </aside>

            <aside className="d-flex justify-content-center my-5">
              <Button variant="light" onClick={() => agregarProd(producto._id)} className="">
                AGREGAR AL CARRITO
              </Button>
            </aside>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-light ms-5 my-5">Descripcion</h4>
        <h6 className="text-light ms-5">{producto.descripcion}</h6>
      </div>
    </>
  );
};

export default CadaProdPage;
