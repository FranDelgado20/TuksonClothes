import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";

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
        Swal.fire({
          title: "<strong>Debes iniciar sesión</strong>",
          icon: "info",

          showCloseButton: true,

          focusConfirm: false,
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Entiendo!',
        });
        return;
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
     

      <div className="container mt-5 text-light letra">
        <div className="row">
          <div className="col me-3 bordes-cadaProd d-flex justify-content-center ">
            <img className="imagen my-4" src={producto.imagen} alt="" />
          </div>
          <div className="col ">
            <aside>
              <h2 className="text-center">{producto.nombre}</h2>
              <h6>Código: {producto.codigo}</h6>
            </aside>
            <hr />
            <aside className="d-flex justify-content-around my-5">
              <h3 className="ms-5 ">${producto.precio}</h3>
              {


                producto.categoria === 'Calzado' ? 
              <Form.Select onChange={talle} className="w-50 mb-5" aria-label="Default select example">
                <option>Seleccione su talle</option>
                <option value="40">40</option>
                <option value="40.5">40.5</option>
                <option value="41">41</option>
                <option value="41.5">41.5</option>
                <option value="42">42</option>
                <option value="42.5">42.5</option>
                <option value="43">43</option>
                <option value="44">44</option>
              </Form.Select>
              :
              <Form.Select className="w-50 mb-5" aria-label="Default select example">
              <option>Seleccione su talle</option>
              <option value="XS">XS</option>
              <option value="2">S</option>
              <option value="3">M</option>
              <option value="4">L</option>
              <option value="5">XL</option>
            </Form.Select>

              }
            </aside>

            <aside className="d-flex justify-content-center my-5">
              <button
                variant="light"
                onClick={() => agregarProd(producto._id)}
                className=" boton slide_right"
              >
                <i className="bi bi-cart-plus-fill"></i>
                AGREGAR AL CARRITO
              </button>
            </aside>
          </div>
        </div>
      </div>
      <div className="letra">
        <h4 className="text-light ms-5 my-5">Descripcion</h4>
        <h6 className="text-light ms-5">{producto.descripcion}</h6>
      </div>
    </>
  );
};

export default CadaProdPage;
