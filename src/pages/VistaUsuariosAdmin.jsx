import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
const VistaUsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const getUsers = async () => {
    const res = await clienteAxios.get("/usuarios", config);
    setUsuarios(res.data.usuarios);
  };
  const eliminarUsuario = (id) => {
    try {
      Swal.fire({
        title: "¿Estas seguro de eliminar al usuario?",

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!",
        cancelButtonText: "Cancelar!",
      }).then((result) => {
        if (result.isConfirmed) {
          const res = clienteAxios.delete(`/usuarios/${id}`, config);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario eliminado",
            showConfirmButton: false,
            timer: 1500,
          });
          getUsers()
        }

      });
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
    getUsers();
  }, []);
  return (
    <>
      <div className="bg-black ">
        <h2 className="text-white text-center">LISTA DE USUARIOS</h2>
        <div className="container">

        <Table striped bordered hover variant="dark">
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
                    <i className="bi bi-trash"></i>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
            </div>
      </div>
    </>
  );
};

export default VistaUsuariosAdmin;
