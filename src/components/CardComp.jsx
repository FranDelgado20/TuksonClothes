import React from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const CardComp = ({arrayProd}) => {
    const token = JSON.parse(localStorage.getItem('token'))
    const idUser = JSON.parse(localStorage.getItem('idUser'))
    const handleClick = (id) => {

    }
   
  return (
    <>  
    
    {
       arrayProd?.map((prod) => 
        
        <Card key={prod._id} className='text-white mx-3 my-2 bg-success' style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{prod.nombre}</Card.Title>
        <Card.Text>
          ${prod.precio}
        </Card.Text>
        {/* <Link to={`/oneProd/${prod._id}`} variant="primary">Ver mas</Link> */}
        
        {
            token && idUser ? 
            <Link to={`/user/oneProd/${prod._id}`} variant="primary">Ver mas</Link> 
            :
            <Link to={`/oneProd/${prod._id}`} variant="primary">Ver mas</Link>
        }
      </Card.Body>
    </Card>
       )     
    }
    </>
  )
}

export default CardComp