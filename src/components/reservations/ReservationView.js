import React from 'react'

import { NavLink, Outlet} from 'react-router-dom';


export const ReservationView = () => {

  return (
    <div className='container-fluid px-4 custom-view'>
      <div className='row mt-5'>
          <div className='col-md-12'>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active':'')  }  to='list'>Lista</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active':'')  }  to='new'>Reservar evento</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active':'')  }  to='custom'>Reserva personalizada</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active':'')  }  to='transfer'>Reserva de Transfer</NavLink> 
            </li>
          </ul> 
              <Outlet />   
          </div>
            
      </div>
    </div>
  )
}
