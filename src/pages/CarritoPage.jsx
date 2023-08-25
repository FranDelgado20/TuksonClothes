import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);
  const [precioTotalPorProducto, setPrecioTotalPorProducto] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0)

  const idCart = JSON.parse(localStorage.getItem("idCart"));
  const token = JSON.parse(localStorage.getItem("token"));

  const getCart = async () => {
    const res = await fetch(`http://localhost:8080/api/carrito/${idCart}`);
    const data = await res.json();
    setCarrito(data.cart.products);
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

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    // Calcular el precio total de cada producto y almacenarlo en el estado
    const precios = [];
    let total = 0
    carrito.forEach((cart) => {
      const precioTotal = cart.cantidad * cart.precio;
      precios[cart._id] = precioTotal;
      total += precioTotal

    });
    setPrecioTotalPorProducto(precios);
    setPrecioTotal(total)
    console.log(precioTotalPorProducto)
  }, [carrito]);

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
            <th>Precio Total</th>
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
                <Button
                  className="mx-2"
                  variant="danger"
                  onClick={() => restarCant(cart._id)}
                >
                  -
                </Button>
                <p className="mb-0"> {cart.cantidad}</p>
                <Button
                  className="mx-2"
                  variant="success"
                  onClick={() => sumarCant(cart._id)}
                >
                  +
                </Button>
              </td>
              <td>$ {precioTotalPorProducto[cart._id]}</td>
              <td className=" text-center">
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
          TOTAL A PAGAR: $
        </h2>
        <h2 className="text-white">
          {
            precioTotal
          }
        </h2>
      </div>
      <Button>Pagar</Button>
    </>
  );
};

export default CarritoPage;
// const CarritoPage = () => {
//   const [carrito, setCarrito] = useState([]);
// const [precioTotal, setPrecioTotal] = useState([])
 

//   const idCart = JSON.parse(localStorage.getItem("idCart"));
//   const token = JSON.parse(localStorage.getItem("token"));
//   const getCart = async () => {
//     const res = await fetch(`http://localhost:8080/api/carrito/${idCart}`);
//     const data = await res.json();
//     setCarrito(data.cart.products);

//     console.log(data.cart.products);
//   };
//   const eliminarProd = async (id) => {
//     const res = await fetch(
//       `http://localhost:8080/api/carrito/${idCart}/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           auth: `Bearer ${token}`,
//         },
//       }
//     );
//   };

//   const sumarCant = (id) => {
//     const filtro = carrito.find((prod) => prod._id === id);
//     if (filtro) {
//       filtro.cantidad++;

//       setCarrito((prevCarrito) =>
//         prevCarrito.map((cart) =>
//           cart._id === id ? { ...cart, ...filtro } : cart
//         )
//       );
//     }
//   };
//   const restarCant = (id) => {
//     const filtro = carrito.find((prod) => prod._id === id);
//     if (filtro && filtro.cantidad > 1) {
//       filtro.cantidad--;

//       setCarrito((prevCarrito) =>
//         prevCarrito.map((cart) =>
//           cart._id === id ? { ...cart, ...filtro } : cart
//         )
//       );
//     }
//   };
  

//   useEffect(() => {
//     getCart();
//   }, []);

//   return (
//     <>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Producto</th>
//             <th>Precio</th>
//             <th>Codigo</th>
//             <th>Cantidad</th>
//             <th>Precio</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {carrito?.map((cart) => (
//             <tr key={cart._id}>
//               <td>{cart._id}</td>
//               <td>{cart.nombre}</td>
//               <td>${cart.precio}</td>
//               <td>{cart.codigo}</td>
//               <td className="d-flex justify-content-center align-items-center">
//                 <Button
//                   className="mx-2"
//                   variant="danger"
//                   onClick={() => restarCant(cart._id)}
//                 >
//                   -
//                 </Button>
//                 <p className="mb-0"> {cart.cantidad}</p>
//                 <Button
//                   className="mx-2"
//                   variant="success"
//                   onClick={() => sumarCant(cart._id)}
//                 >
//                   +
//                 </Button>
//               </td>

//               <td>$ {cart.cantidad * cart.precio}</td>
//               <td className=" text-center">
//                 <Button variant="danger" onClick={() => eliminarProd(cart._id)}>
//                   Eliminar
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <hr />
      
//       <Button>Pagar</Button>
//     </>
//   );
// };

// export default CarritoPage;
