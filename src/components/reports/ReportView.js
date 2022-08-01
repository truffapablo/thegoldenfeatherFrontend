import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { roles } from '../../types/role';


export const ReportView = () => {
  return (
    
    <div className='container-fluid px-4 custom-view'>
      <div className='row mt-5'>
          <div className='col-md-12'>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active reservation-tab-active':'reservation-tab-inactive')  }  to='daily'>Reporte diario</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active reservation-tab-active':'reservation-tab-inactive')  }  to='month'>Reporte mensual</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active reservation-tab-active':'reservation-tab-inactive')  }  to='custom'>Reporte por fecha</NavLink> 
            </li>
          </ul> 
              <Outlet />   
          </div>
            
      </div>
    </div>
  )
}
