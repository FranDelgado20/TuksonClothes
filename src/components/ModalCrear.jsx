import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
const ModalCrear = () => {
    const [show, setShow] = useState(false);
    const [producto, setProducto] = useState({
        nombre:'',
        precio:'',
        codigo:'',
        cantidad:''
    })     
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (ev) => {
    setProducto({...producto, [ev.target.name] : ev.target.value})

  }
  const crearProd = async () => {
    const  res = await fetch('http://localhost:8080/api/productos',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          nombre: producto.nombre,
          precio: producto.precio,
          codigo: producto.codigo,
          cantidad: producto.cantidad
        })
    })
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto creado correctamente!',
        showConfirmButton: false,
        timer: 1500
      })

  }
  return (
   <>
    <Button variant="success" onClick={handleShow}>
        Crear un producto
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creá un producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" name='nombre' onChange={handleChange} placeholder="Ej:Remera" />
      </Form.Group>
      <Form.Group className="mb-3" > 
        <Form.Label>Precio</Form.Label>
        <Form.Control type="number" name='precio' onChange={handleChange} placeholder="$$$" />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Codigo</Form.Label>
        <Form.Control type="number" name='codigo' onChange={handleChange} placeholder="***" />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Cantidad</Form.Label>
        <Form.Control type="number" name='cantidad' onChange={handleChange} placeholder="###" />
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={crearProd} >
            Guardar los cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
   
  )
}

export default ModalCrear