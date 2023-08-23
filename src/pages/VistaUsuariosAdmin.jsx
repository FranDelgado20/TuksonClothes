import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

const VistaUsuariosAdmin = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [usuarios, setUsuarios] = useState([]);
  const getUsers = async () => {
    const res = await fetch("http://localhost:8080/api/usuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setUsuarios(data.usuarios);
  };
  const eliminarUsuario = (id) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar al usuario?",
      text: "Esto será irreversible!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
      cancelButtonText: "Cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Listo!", "El usuario fue eliminado con exito!", "success");
        const res = fetch(`http://localhost:8080/api/usuarios/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            auth: `Bearer ${token}`,
          },
        });
      }
    });
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
    <div className="bg-black ">

        <h2 className="text-white text-center">LISTA DE USUARIOS</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>USERNAME</th>
            <th>ROL</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {usuarios?.map((users) => (
              <tr key={users._id}>
              <td>{users._id}</td>
              <td>{users.username}</td>
              <td>{users.role}</td>
              <td className="text-center">
                <Button
                  variant="danger"
                  onClick={() => eliminarUsuario(users._id)}
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

export default VistaUsuariosAdmin;
