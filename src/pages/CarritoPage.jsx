import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);
  const idCart = JSON.parse(localStorage.getItem("idCart"));
  const token = JSON.parse(localStorage.getItem('token'))
  const getCart = async () => {
    const res = await fetch(`http://localhost:8080/api/carrito/${idCart}`);
    const data = await res.json();
    setCarrito(data.cart.products);
    
    console.log(data.cart.products)
  };
  const eliminarProd = async(id) => {
    const res = await fetch (`http://localhost:8080/api/carrito/${idCart}/${id}`, {
      method:'DELETE',
      headers:{
        "Content-Type": "application/json",
        auth: `Bearer ${token}`
      }
    })
  }
  const sumarCant = async (id) => {
    carrito.cantidad++
   
    const res = await fetch(`http://localhost:8080/api/carrito/${idCart}/${id}`,{
      method:'PUT',
      headers:{
        "Content-Type": "application/json",
        auth: `Bearer ${token}`
      },body:JSON.stringify({
        nombre: carrito.nombre,
        precio : carrito.precio,
        codigo: carrito.codigo,

        cantidad: carrito.cantidad
      })
    })

  }
  useEffect(() => {
    getCart()
  },[])

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
              <td>
                {cart.cantidad}
              </td>
              <td>
                <Button onClick={() => sumarCant(cart._id)}>+</Button>
                <Button>-</Button>
                <Button variant="danger" onClick={() => eliminarProd(cart._id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr />
      <Button>Pagar</Button>
    </>
  );
};

export default CarritoPage;
