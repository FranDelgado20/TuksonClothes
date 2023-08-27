import React from 'react'
import { Container } from 'react-bootstrap'

const FooterComp = () => {
  return (
    
    <>
    <div className='footer bg-black '>
        <div className="row text-center ">
            <div className="col-lg-4">
                <img src="/Img/Tukson.png" className='img-fluid w-50'  alt="" />
            </div>
            <div className="col-lg-4 justify-content-around  align-items-center text-white d-flex">
            <i className="bi bi-twitter ms-3   fs-1" ></i>
            <i className="bi bi-facebook ms-3 fs-1" ></i>
            <i className="bi bi-instagram ms-3 fs-1" ></i>
            </div>
            <div className="col-lg-4 d-flex justify-content-center align-items-center ">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14515282.981453769!2d-84.04765685000002!3d-27.3516501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9423cf905195379d%3A0xef2b83d7b37fb4e2!2sEl%20garage%20showroom!5e0!3m2!1ses-419!2sar!4v1690063786958!5m2!1ses-419!2sar" width="300" height="300" style={{border:'1px' , borderRadius:'3%'}}  allowFullScreen="" className='' loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </div>
    </>
     
  )
}

export default FooterComp