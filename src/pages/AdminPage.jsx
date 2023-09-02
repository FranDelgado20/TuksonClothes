import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ModalEditar from "../components/ModalEditar";
import Swal from "sweetalert2";
import ModalCrear from "../components/ModalCrear";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
const AdminPage = () => {
  const [productos, setProductos] = useState([]);
  const getProduct = async () => {
    const res = await clienteAxios.get("/productos");

    setProductos(res.data.obtenerProductos);
  };
  const eliminarProducto = async (id) => {

try {
  
    Swal.fire({
      title: "¿Estas seguro de eliminar el producto?",
      text: "Esto será irreversible!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
      cancelButtonText: "Cancelar!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Listo!",
          "El producto fue eliminado con exito!",
          "success"
        );
        const res = await clienteAxios.delete(`/productos/${id}`, config);

        getProduct()
      }
    });
  
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

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <div className="container-fluid bg-black letra">
        <div className="d-flex justify-content-center">
          <aside className="mx-5">
            <h2 className="text-center text-light">PRODUCTOS</h2>
          </aside>
          <aside>
            <ModalCrear setProductos={setProductos} />
          </aside>
        </div>

        <hr />
        <table className="datatable text-white w-100">
          <thead  className="thead_table">
            <tr>
              <th className="separador">ID</th>
              <th className="separador">NOMBRE</th>
              <th className="separador">PRECIO</th>
              <th className="separador">CODIGO</th>
              <th className="separador">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod._id}>
                <td className="separador">{prod._id}</td>
                <td className="separador">{prod.nombre}</td>
                <td className="separador">${prod.precio}</td>
                <td className="separador">{prod.codigo}</td>
                <td className="justify-content-around separador d-flex">
                  <ModalEditar idProducto={prod._id} setProductos={setProductos} />
                  <button
                    className=" slide_down_eliminar  boton_eliminar "
                    onClick={() => eliminarProducto(prod._id)}
                  >
                    <i className="bi bi-trash"></i>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminPage;
