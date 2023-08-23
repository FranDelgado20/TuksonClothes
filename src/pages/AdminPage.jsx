import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ModalEditar from "../components/ModalEditar";
import Swal from "sweetalert2";
import ModalCrear from "../components/ModalCrear";

const AdminPage = () => {
  const [productos, setProductos] = useState([]);
  const getProduct = async () => {
    const res = await fetch("http://localhost:8080/api/productos");
    const data = await res.json();
    setProductos(data.obtenerProductos);
   
  };
  const eliminarProducto = async (id) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar el producto?",
      text: "Esto será irreversible!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
      cancelButtonText: "Cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Listo!", "El producto fue eliminado con exito!", "success");
        const res = fetch(`http://localhost:8080/api/productos/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    });

  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <div className="container-fluid bg-black">
        <div className="d-flex justify-content-center">
          <aside className='mx-5'>
            <h2 className="text-center text-light">PRODUCTOS</h2>
          </aside>
          <aside>
            <ModalCrear />
          </aside>
        </div>

        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>PRECIO</th>
              <th>CODIGO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {productos?.map((prod) => (
              <tr key={prod._id}>
                <td>{prod._id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.precio}</td>
                <td>{prod.codigo}</td>
                <td className="justify-content-around d-flex">
                  {/* <Button variant='primary'>Editar</Button>
                   */}
                  <ModalEditar idProducto={prod._id} />
                  <Button
                    variant="danger"
                    onClick={() => eliminarProducto(prod._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AdminPage;
