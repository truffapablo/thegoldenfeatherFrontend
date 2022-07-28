import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';


export const ReportView = () => {

  return (
    
    <div className='container-fluid px-4 custom-view'>
      <div className='row mt-5'>
          <div className='col-md-12'>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active reservation-tab-active':'reservation-tab-inactive')  }  to='daily'>Diario</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active reservation-tab-active':'reservation-tab-inactive')  }  to='month'>Mensual</NavLink> 
            </li>
          </ul> 
              <Outlet />   
          </div>
            
      </div>
    </div>
  )
}
