import axios from "axios";
const token = JSON.parse(localStorage.getItem("token"));
const clienteAxios = axios.create({
  baseURL: "http://localhost:8080/api",
});
export const config = {
  headers: {
    "Content-Type": "application/json",
    auth: `Bearer ${token}`,
  },
};
export default clienteAxios;
