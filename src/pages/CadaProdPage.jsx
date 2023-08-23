import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

const CadaProdPage = () => {
    const [producto, setProducto] = useState({})
    const [carrito, setCarrito] = useState([])
    const token = JSON.parse(localStorage.getItem('token'))
    const idCart = JSON.parse (localStorage.getItem('idCart'))
    const params = useParams();
    const getCart =  async() => {
      const res = await fetch (`http://localhost:8080/api/carrito/${idCart}`)
      const data = await res.json()
      setCarrito(data.cart.products)
      
    }
    const getProduct = async () => {
      const res = await fetch(`http://localhost:8080/api/productos/${params.id}`)
      const data = await res.json()
      setProducto(data.oneProduct)
      console.log(data)
    }
    const agregarProd = async (id) => {
      
      const prodExistente = carrito.find((prod) => prod._id === id)
      if (prodExistente){
        Swal.fire({
            
          icon: 'error',
          title: 'El producto ya existe en el carrito',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      const res = await fetch (`http://localhost:8080/api/carrito/${idCart}/${id}` ,{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
        auth: `Bearer ${token}`
        }
      } )
      Swal.fire({
            
        icon: 'success',
        title: 'Producto agregado',
        showConfirmButton: false,
        timer: 1500
      })
    }
    useEffect(() => {
        getProduct(), getCart()
    },[])

  return (
    <>
    <Card key={producto._id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{producto.nombre}</Card.Title>
        <Card.Text>
          {producto.precio}
        </Card.Text>
        <Button variant="primary" onClick={() => agregarProd(producto._id)}>Agregar al carrito</Button>
      </Card.Body>
    </Card>
    </>
  )
}

export default CadaProdPage