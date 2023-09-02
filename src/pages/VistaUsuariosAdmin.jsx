import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import clienteAxios from "../utils/axios";
import { config } from "../utils/axios";
const VistaUsuariosAdmin = () => {
  const [usuarioss, setUsuarios] = useState([]);
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
      <div className="bg-black letra">
        <h2 className="text-white text-center">LISTA DE USUARIOS</h2>
        <div className="container">

        <table className="datatable text-white w-100" >
          <thead className="thead_table">
            <tr>
              <th className="separador">ID</th>
              <th className="separador">USERNAME</th>
              <th className="separador">ROL</th>
              <th className="separador">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {usuarioss?.map((users) => (
              <tr key={users._id}>
                <td className="separador">{users._id}</td>
                <td className="separador">{users.username}</td>
                <td className="separador">{users.role}</td>
                <td className="text-center separador">
                <button
                    className=" slide_down_eliminar boton_eliminar "
                    onClick={() => eliminarUsuario(users._id)}
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
      </div>
    </>
  );
};

export default VistaUsuariosAdmin;
