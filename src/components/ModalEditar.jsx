import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
const ModalEditar = ({idProducto}) => {
    const [show, setShow] = useState(false);
    const [productos, setProductos] = useState([])
    const [producto, setProducto] = useState({
        nombre:'',
        precio:'',
        codigo:''
    })     
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const handleChange = (ev) => {
    setProducto({...producto, [ev.target.name] : ev.target.value})
}
const getProduct = async () => {
  const res = await fetch('http://localhost:8080/api/productos')
  const data = await res.json()
  setProductos(data.obtenerProductos)
  
}
  const editarProd =  async(idProd) => {
   
    const res = await fetch(`http://localhost:8080/api/productos/${idProd}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(producto)
    })
    Swal.fire({
            
        icon: 'success',
        title: 'El producto se edito correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      
   getProduct()
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edite un producto</Modal.Title>
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
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => editarProd(idProducto)} >
            Guardar los cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalEditar