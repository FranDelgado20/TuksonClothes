import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const CardComp = ({ arrayProd }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const idUser = JSON.parse(localStorage.getItem("idUser"));

  return (
    <>
      {arrayProd?.map((prod) => (
       
          // <div className="card">
          //   <div className="cover">
          //     <img src={prod.imagen} alt="" />
          //     <div className="img_back">

          //     </div>
          //     <div className="descripcion">
          //       <h2>
          //         {prod.nombre}
          //       </h2>
          //       <p>{prod.precio}</p>
          //       <button className="boton_card">Ver mas</button>
          //     </div>
          //   </div>
          // </div>
       
        <Card
          key={prod._id}
          className=" mx-3 my-2 letra"
          style={{ width: "18rem" }}
        >
          <Card.Img className="card" src={prod.imagen} />

          <Card.Body>
            <Card.Title>{prod.nombre}</Card.Title>
            <Card.Text> <i className="bi  bi-currency-dollar"> </i>{prod.precio}</Card.Text>

            {token && idUser ? (
              <Link
                to={`/user/oneProd/${prod._id}`}
                className="text-decoration-none navbarLink button_slide slide_right bg-black"
              >
                Ver mas
              </Link>
            ) : (
              <Link
                to={`/oneProd/${prod._id}`}
                className="text-decoration-none navbarLink button_slide slide_right bg-black"
              >
                Ver mas
              </Link>
            )}
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default CardComp;
