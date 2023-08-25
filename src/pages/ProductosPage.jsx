import React, { useEffect, useState } from "react";
import CardComp from "../components/CardComp";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [array, setArray] = useState([]);
  const getProductos = async () => {
    const res = await fetch("http://localhost:8080/api/productos");
    const data = await res.json();
    setProductos(data.obtenerProductos);
    setArray(data.obtenerProductos);
    console.log(array);
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
    <div className="d-flex justify-content-center">

      <InputGroup className="mb-3 w-50 ">
        <Form.Control
          placeholder="Buscador..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={handleChange}
          type="search"
          
          />
        <InputGroup.Text id="basic-addon2"><i className="bi bi-search"></i></InputGroup.Text>
      </InputGroup>
          </div>
      <div className="container-fluid bg-black">
        <div className="row">
          <CardComp arrayProd={productos} />
        </div>
      </div>
    </>
  );
};

export default ProductosPage;
