import React from "react";
import Carousel from "react-bootstrap/Carousel";


const HomePage = () => {
  return (
    <>
    <section>

      <Carousel className="carousel" >
        <Carousel.Item >
          <img src="/Img/HomePageIMG/4b257c61-22d2-4148-8adb-6aeb11b93da8___2497145ecffa115f93be527ae20af464.png" className=" d-block w-100" alt="" />
          
        </Carousel.Item>
        <Carousel.Item>
        <img src="Img/HomePageIMG/32c25bba-48aa-4df7-927d-b94323953aa5___0e53d068e0b0ac90248b67ddb627d8d7.png" className="d-block w-100" alt="" />
         
        </Carousel.Item>
        <Carousel.Item>
        <img src="/Img/HomePageIMG/c656cdd8-bf28-466d-8b92-a3e6b278b1f8___3f5e23324b97af196f23f1f187989151.png" className="d-block w-100" alt="" />
          
        </Carousel.Item>
        <Carousel.Item>
        <img src="/Img/HomePageIMG/d4e062ae-c5a7-4794-b8d4-01f8c8fce048___57b8c282bdfd2b18ea4fd4491c9d6668.png" className="d-block w-100" alt="" />
          
        </Carousel.Item>
      </Carousel>
    </section>
    <div className="container">
      <div className="col">
        <div className="row">
          
        </div>
      </div>
    </div>

      
    </>
  );
};

export default HomePage;
