import React from 'react'
import { Row } from 'react-bootstrap'


const FooterComp = () => {
  return (
    
    <>
    <div className='footer  bg-black letra text-white'>
        <div className="row  text-center ">
            <div className="col-lg-4 col-md-6 col-sm-12">
                <img src="/Img/Tukson.png" className='img-fluid w-50'  alt="" />
            </div>
            <div className="col-lg-4  col-md-6 col-sm-12 justify-content-around  align-items-center text-white d-flex">
            <i className="bi bi-twitter ms-3   fs-1" ></i>
            <i className="bi bi-facebook ms-3 fs-1" ></i>
            <i className="bi bi-instagram ms-3 fs-1" ></i>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 d-flex  justify-content-center align-items-center ">
              <aside className='text-start'>
            <h2>Contacto</h2>
            <hr />

            <h6>
              Direccion: 
              
            </h6>
            <h6>
              Horario de atencion: 

            </h6>
            <h6>
              Mail:

            </h6>
              </aside>
            </div>
        </div>
    </div>
    </>
     
  )
}

export default FooterComp