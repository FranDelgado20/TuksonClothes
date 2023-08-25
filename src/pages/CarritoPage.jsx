import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);
  
  const [precioTotal, setPrecioTotal] = useState('');

  const idCart = JSON.parse(localStorage.getItem("idCart"));
  const token = JSON.parse(localStorage.getItem("token"));
  const getCart = async () => {
    const res = await fetch(`http://localhost:8080/api/carrito/${idCart}`);
    const data = await res.json();
    setCarrito(data.cart.products);

    console.log(data.cart.products);
  };
  const eliminarProd = async (id) => {
    const res = await fetch(
      `http://localhost:8080/api/carrito/${idCart}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          auth: `Bearer ${token}`,
        },
      }
    );
  };

  const sumarCant = (id) => {
    const filtro = carrito.find((prod) => prod._id === id);
    if (filtro) {
      filtro.cantidad++;

      setCarrito((prevCarrito) =>
        prevCarrito.map((cart) =>
          cart._id === id ? { ...cart, ...filtro } : cart
        )
      );
    }
  };
  const restarCant = (id) => {
    const filtro = carrito.find((prod) => prod._id === id);
    if (filtro && filtro.cantidad > 1) {
      filtro.cantidad--;

      setCarrito((prevCarrito) =>
        prevCarrito.map((cart) =>
          cart._id === id ? { ...cart, ...filtro } : cart
        )
      );
    }
  };
  let precioFinal = 0
  let precioUnitario = []
  
  useEffect(() => {
    getCart()
  }, []);
  useEffect(() => {
  console.log(precioUnitario)
},[precioUnitario])

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Codigo</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito?.map((cart) => (
            <tr key={cart._id}>
              <td>{cart._id}</td>
              <td>{cart.nombre}</td>
              <td>${cart.precio}</td>
              <td>{cart.codigo}</td>
              <td className="d-flex justify-content-center align-items-center">
                <Button className="mx-2" variant="danger" onClick={() => restarCant(cart._id)}>-</Button>
                <p className="mb-0"> {cart.cantidad}</p>
                <Button className="mx-2" variant="success" onClick={() => sumarCant(cart._id)}>+</Button>
              </td>
                
              <td>
             $ { 
                cart.cantidad*cart.precio

              }
              </td>
              <td className=' text-center'>
                <Button variant="danger" onClick={() => eliminarProd(cart._id)}>
                  Eliminar
                </Button>
              </td>
              
            </tr>
            
          ))}
        </tbody>
      </Table>

      <hr />
      <div className="d-flex">
        <h2 className="text-white"> 

        Precio total:$
        </h2>
        {
          carrito?.map((prod) => 
          <h2>
            {
                
            }
          </h2>
          )
        }
      </div>
              <Button>Pagar</Button>
    </>
  );
};

export default CarritoPage;
