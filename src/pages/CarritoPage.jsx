import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);
  const [precioTotalPorProducto, setPrecioTotalPorProducto] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);

  const idCart = JSON.parse(localStorage.getItem("idCart"));

  const getCart = async () => {
    const res = await clienteAxios.get(`/carrito/${idCart}`);

    setCarrito(res.data.cart.products);
  };

  const eliminarProd = async (id) => {
    const res = await clienteAxios.delete(`/carrito/${idCart}/${id}`, config);
   try {
     if(res.data.status === 200){
       Swal.fire({
         position: 'center',
         icon: 'success',
         title: 'Producto eliminado',
         showConfirmButton: false,
         timer: 1500
       })
     }
     getCart()
    
   } catch (error) {
    if(error.response.status === 500){

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Al parecer hubo un error!',
        text:error.response.data.msg,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

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
    const precios = [];
    let total = 0;
    carrito.forEach((cart) => {
      const precioTotal = cart.cantidad * cart.precio;
      precios[cart._id] = precioTotal;
      total += precioTotal;
    });
    setPrecioTotalPorProducto(precios);
    setPrecioTotal(total);
    
  }, [carrito]);

  return (
    <>
    <div className="container d-flex justify-content-center">

      <table  className="datatable text-white w-100">
        <thead className="thead_table">
          <tr >
            <th className="separador" >ID</th>
            <th className="separador">Producto</th>
            <th className="separador">Precio</th>
            <th className="separador">Codigo</th>
            <th className="separador">Cantidad</th>
            <th className="separador" >Precio Total</th>
            <th className="separador">  Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito?.map((cart) => (
            <tr key={cart._id}>
              <td className="separador">{cart._id}</td>
              <td className="separador">{cart.nombre}</td>
              <td className="separador"><i className="bi me-1 bi-currency-dollar"></i>{cart.precio}</td>
              <td className="separador">{cart.codigo}</td>
              <td className="d-flex justify-content-center separador align-items-center">
                <button
                  className="mx-2  slide_down boton text-black"
                  variant="danger"
                  onClick={() => restarCant(cart._id)}
                  >
                  -
                </button>
                <p className="mb-0"> {cart.cantidad}</p>
                <button
                  className="mx-2 boton slide_down text-black"
                  variant="success"
                  onClick={() => sumarCant(cart._id)}
                  >
                  +
                </button>
              </td>
              <td  className=" separador ">  <i className="bi  bi-currency-dollar"> </i>{precioTotalPorProducto[cart._id]}</td>
              <td className=" separador text-center">
                <button  className=" slide_down_eliminar boton_eliminar " onClick={() => eliminarProd(cart._id)}>
                <i className="bi bi-trash"></i>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          </div> 

      <hr />
      <div className="d-flex ms-5 mb-5 align-items-center" >
        <h2 className="text-white letra">TOTAL A PAGAR: $</h2>
        <h2 className="text-white letra">{precioTotal}</h2>
      <button className="ms-5  w-25 text-black button_slide slide_right"> <i className="bi me-2 bi-cash-coin"></i>Pagar</button>
      </div>
     
     
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
