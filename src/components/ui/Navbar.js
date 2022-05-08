import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../../actions/auth';
import logo from '../../assets/logo.png'
export const Navbar = () => {

    const dispatch = useDispatch();
    const {name, uid} = useSelector(state => state.auth);
    const handleLogOut = () => {
        dispatch(logout());
    }

    return (
        <div className="container-fluid nav-cf gf-border-b">
        <div className="container nav-c">
        <nav className="navbar navbar-expand-sm gf-blue">
        
        <NavLink  to="/" className="navbar-brand"><img src={logo}/></NavLink>
        <div className="navbar-collapse">
            <div className="navbar-nav">

                <NavLink 
                    className={ ({isActive}) => 'nav-item nav-link ' + (isActive ? 'active gf-active':'')  } 
                    to="dashboard/reservations" 
                >
                    Reservas
                </NavLink>

                <NavLink 
                    className={ ({isActive}) => 'nav-item nav-link ' + (isActive ? 'active gf-active':'')  } 
                    to="dashboard/events"  
                >
                    Eventos
                </NavLink>

                <NavLink 
                    className={ ({isActive}) => 'nav-item nav-link ' + (isActive ? 'active gf-active':'')  } 
                    to="dashboard/reports"  
                >
                    
                    Reportes
                </NavLink>
            </div>
        </div>

        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
            <ul className="navbar-nav ml-auto">
                
                {
                    uid && 
                    <span
                    id='profile-name'
                    className='nav-item nav-link text-info'
                    >{name}</span>
                }
                
                {
                    uid && 
                    <button
                        onClick={handleLogOut} 
                        className="nav-item nav-link btn" 
                    >
                        Cerrar sesión
                    </button>
                }
                {
                    !uid && 
                    <NavLink 
                    className="nav-item nav-link"
                    to='login'>Iniciar sesión</NavLink>
                        
                }

            </ul>
        </div>
    </nav>
        </div>      
    </div> 
        
    )
}