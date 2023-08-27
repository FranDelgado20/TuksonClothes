import React from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const CardComp = ({arrayProd}) => {
    const token = JSON.parse(localStorage.getItem('token'))
    const idUser = JSON.parse(localStorage.getItem('idUser'))
    
   
  return (
    <>  
    
    {
       arrayProd?.map((prod) => 
      
        <Card key={prod._id} className=' mx-3 my-2 bg-light' style={{ width: '18rem' }}>
    <article className='article'>
      <Card.Img  className='foto1'clas src={prod.imagen} />
      {/* <Card.Img   className='foto2'clas src={prod.imagen} /> */}
      
      {/* <img src={prod.imagen} alt="" className='foto1'/>
      <img src={prod.imagen} alt="" className='foto2' /> */}
    </article>
      <Card.Body>
        <Card.Title>{prod.nombre}</Card.Title>
        <Card.Text>
          ${prod.precio}
        </Card.Text>
       
        
        {
            token && idUser ? 
            <Link to={`/user/oneProd/${prod._id}`}  className='text-decoration-none navbarLink button_slide slide_right bg-black'>Ver mas</Link> 
            :
            <Link to={`/oneProd/${prod._id}`}  className='text-decoration-none navbarLink button_slide slide_right bg-black'>Ver mas</Link>
        }
      </Card.Body>
    </Card>
       )     
    }
    </>
  )
}

export default CardComp