import React from 'react'
import NavComp from '../components/NavComp'
import { Routes,Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import FooterComp from '../components/FooterComp'
import SobreNosotrosPage from '../pages/SobreNosotrosPage'
import ProductosPage from '../pages/ProductosPage'
import CadaProdPage from '../pages/CadaProdPage'
import LoginPage from '../pages/LoginPage'
import UserPage from '../pages/UserPage'
import RegisterPage from '../pages/RegisterPage'
import CarritoPage from '../pages/CarritoPage'
import AdminPage from '../pages/AdminPage'
import VistaUsuariosAdmin from '../pages/VistaUsuariosAdmin'

const RoutesViews = () => {
  return (
  
    <>
    {/* <NavComp/> */}
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/nosotros' element={<SobreNosotrosPage/>}/>
        <Route path='/productos' element={<ProductosPage/>}/>
        <Route path='/oneProd/:id' element={<CadaProdPage/>}/>
       
        <Route path='/user' element={<HomePage/>}/>
        <Route path='/user/productos' element={<ProductosPage/>}/>
        <Route path='/user/oneProd/:id' element={<CadaProdPage/>}/>
        <Route path='/user/nosotros' element={<SobreNosotrosPage/>}/>
        <Route path='/user/carrito' element={<CarritoPage/>}/>
        {/* <Route path='/user' element={<UserPage/>}/> */}

        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/listaUsuarios' element={<VistaUsuariosAdmin/>}/>


       
        
    </Routes>
    {/* <FooterComp/> */}
    </>
  )
}

export default RoutesViews