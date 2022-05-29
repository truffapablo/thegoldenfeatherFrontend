import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export const TransferView = () => {
  return (
    <div className='container-fluid mt-5'>
      <div className='row'>
          <div className='col-md-12'>
          <ul className="nav nav-tabs">
            <li className="nav-item">
           
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active':'')  }  to='list'>Lista</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active':'')  }  to='new'>Nuevo Transfer</NavLink> 
            </li>
          </ul>
              <Outlet />
          </div>
            
      </div>
    </div>
  )
}
