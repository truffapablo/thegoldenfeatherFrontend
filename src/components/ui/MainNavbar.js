
import React, { useRef, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { logout } from '../../actions/auth';
import { advanceSearch, navSearch, searchByConfirmationNumber } from '../../actions/search';
import { types } from '../../types/types';
import logo from './logo.png'
export const MainNavbar= () => {
    
    const [searchValue, setSerchValue] = React.useState('');
    const buscador = useRef(null);

    const handleInputSearch = (e) => {
        setSerchValue(e.target.value);
    }

    const {uid} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searching, setSearching] = useState(false);

    const handleLogOut = () => {
        dispatch(logout()).then(resp => {
            navigate('/');
            window.location.reload();
        });

    }

    const placeholder = '# Confirmación';

    const handleMenu = (e) => {
        e.preventDefault();
        
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      }

    const search = (e) => {
        e.preventDefault();
        if(!searchValue) return false;
        setSearching(true)
        dispatch(advanceSearch({
            confirmation: searchValue,
            date: null,
            event: null,
            lastName: null,
        })).then(rta => {
            
            setSearching(false);
            dispatch({type:types.reservationFinishAdvanceSearch});
            if(rta.ok){
                dispatch({
                    type:types.reservationCleanSearch
                  });
                dispatch({
                    type:types.reservationSetAdvanceSearch,
                    payload:rta
                });

                switch (rta.data[0].pattern) {
                    case 'EVENT_RESERVATION':
                        navigate(`/dashboard/reservations/${rta.data[0].id}`);
                        break;
                    case 'TRANSFER_RESERVATION':
                        navigate(`/dashboard/reservations/${rta.data[0].id}/transfer`);
                        break;
                    case 'CUSTOM_RESERVATION':
                        navigate(`/dashboard/reservations/${rta.data[0].id}/custom`);
                        break;
                
                    default:
                        break;
                }

            }
        });
        
    }

  return (
    <>
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            
            
            <NavLink className="navbar-brand ps-3" to="/">The Golden Feather <img src={logo} className='nav-logo'/></NavLink>
            
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!" onClick={handleMenu}><i className="fas fa-bars"></i></button>
            {
                uid &&
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0" onSubmit={search}>
                <div ref={buscador} className="input-group" title={placeholder}>
                    <input className="form-control me-1 inputSearch" type="text" name="searchValue" value={searchValue} onChange={handleInputSearch} placeholder={placeholder} aria-label="Buscar por..." aria-describedby="btnNavbarSearch" />
                    <button 
                    disabled={searching}
                    className="btn gold-bg white" id="btnNavbarSearch" type="submit">
                        {
                            !searching && <i className="fas fa-search"></i>
                        }
                        {
                            searching && <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />
                        }
                        
                    </button>
                </div>
            </form>
            }
            {
                uid &&
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw gold"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        {/* <li><a className="dropdown-item" href="#!">Settings</a></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr className="dropdown-divider" /></li> */}
                        <li><a className="dropdown-item" href="#!" id="btn-logout" onClick={handleLogOut}>Cerrar sesión</a></li>
                    </ul>
                </li>
            </ul>
            }
        </nav>
    </>
  )
}
