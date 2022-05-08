import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import { NavLink, Outlet} from 'react-router-dom';
import { Error } from '../error/Error';

export const ReservationView = () => {

  return (
    <div className='container mt-5'>
      <div className='row'>
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
          </ul> 
                <ErrorBoundary FallbackComponent={Error}>
                  <Outlet />   
                </ErrorBoundary>
          </div>
            
      </div>
    </div>
  )
}
