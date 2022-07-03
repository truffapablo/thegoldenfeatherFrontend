import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom'
import { roles } from '../../types/role';

export const EventView = () => {
  const {role} = useSelector(state => state.auth);
  return (
    <div className='container-fluid mt-5'>
      <div className='row'>
          <div className='col-md-12'>
          <ul className="nav nav-tabs">
            <li className="nav-item">
           
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active reservation-tab-active':'reservation-tab-inactive')  }  to='list'>Lista</NavLink>
            </li>
            {
              role === roles.admin &&
              <li className="nav-item">
                <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active reservation-tab-active':'reservation-tab-inactive')  }  to='new'>Nuevo evento</NavLink> 
              </li>
            }
          </ul>
              <Outlet />   
          </div>
            
      </div>
    </div>
  )
}
