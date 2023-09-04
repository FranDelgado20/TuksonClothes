import React, { useEffect, useState } from "react";
import CardComp from "../components/CardComp";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import clienteAxios from "../utils/axios";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [array, setArray] = useState([]);
  const getProductos = async () => {
    const res = await clienteAxios.get("/productos");
    setProductos(res.data.obtenerProductos);
    setArray(res.data.obtenerProductos);
  };
  const handleChange = (ev) => {
    const busqueda = ev?.target?.value.toLowerCase();
    const filtro = productos.filter((prod) => {
      const name = prod.nombre.toLowerCase();
      const codigo = prod.codigo;
      return name.includes(busqueda) || codigo.includes(busqueda);
    });
    if (busqueda?.length > 0) {
      setProductos(filtro);
    } else {
      setProductos(array);
    }
  };
  useEffect(() => {
    getProductos();
  }, []);

  return (
    <>
      <div className="containter letra d-flex justify-content-between">
        <div className="w-25 mt-3 filtro">
          <h2 className="ms-4  text-white ">Filtro</h2>
          <hr />
          <p>Filtrar por categoria:</p>
          
        </div>
        <div className="w-100">
          <div className=" justify-content-center d-flex ">
            <InputGroup className="my-3 w-75 ">
              <Form.Control
                placeholder="Buscador..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={handleChange}
                type="search"
              />
              <InputGroup.Text id="basic-addon2">
                <i className="bi bi-search"></i>
              </InputGroup.Text>
            </InputGroup>
          </div>
          
            <div className="row justify-content-center">
              <CardComp arrayProd={productos} />
            </div>
         
        </div>
      </div>
    </>
  );
};

export default ProductosPage;
