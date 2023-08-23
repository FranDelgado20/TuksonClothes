import React, { useEffect, useState } from 'react'
import CardComp from '../components/CardComp'

const UserPage = () => {
    const [productos, setProductos ] = useState([])
    const getProductos = async () => {
        const res = await fetch ('http://localhost:8080/api/productos')
        const data = await res.json()
        setProductos(data.obtenerProductos)
        console.log(data)
    } 

    useEffect(() => {
        getProductos()
    }, [])
  return (
    <>
    <div className="container">
        <div className="row">
            <CardComp arrayProd={productos}/>
        </div>
    </div>
    </>
  )
}

export default UserPage