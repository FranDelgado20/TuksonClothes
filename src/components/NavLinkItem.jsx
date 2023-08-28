import React from 'react'
import { NavLink } from "react-router-dom";
const NavLinkItem = ({to, name}) => {
  return (
    <NavLink className="text-white mx-4 navbarLink button_slide slide_down" to={to}>
    {name}
  </NavLink>
  )
}

export default NavLinkItem