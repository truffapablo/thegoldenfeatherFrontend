
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { logout } from '../../actions/auth';
import { navSearch } from '../../actions/search';
import logo from './logo.png'
export const MainNavbar= () => {
    
    const [searchValue, setSerchValue] = React.useState('');
    const buscador = useRef(null);

    const handleInputSearch = (e) => {
        setSerchValue(e.target.value);
    }

    const {list, customList, transferList} = useSelector(state => state.reservations);
    

    const {uid} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(logout());
        navigate('/');

    }

    const placeholder = 'confirmación, evento, huesped...';

    const handleMenu = (e) => {
        e.preventDefault();
        
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      }

    const searchByConfirmation = (searchValue) => {
        return list.find(reservation => reservation.confirmation == searchValue) || customList.find(reservation => reservation.confirmation == searchValue);
    }

    const search = (e) => {
        e.preventDefault();
        if(!searchValue.length > 0){
            return;
        }
        dispatch(navSearch(searchValue,[list, customList, transferList])).then(res => {
            if(res){
                navigate(`/dashboard/search`);
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: `No se encontró nada con el término "<b>${searchValue}</b>"`,
                    })
            }
        }).catch(err => {
            console.log(err);
        })
    }

  return (
    <>
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            
            
            <NavLink className="navbar-brand ps-3" to="/">The Golden Feather</NavLink>
            
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!" onClick={handleMenu}><i className="fas fa-bars"></i></button>
            {
                uid &&
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0" onSubmit={search}>
                <div ref={buscador} className="input-group" title={placeholder}>
                    <input className="form-control me-1 inputSearch" type="text" name="searchValue" value={searchValue} onChange={handleInputSearch} placeholder={placeholder} aria-label="Buscar por..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="submit"><i className="fas fa-search"></i></button>
                </div>
            </form>
            }
            {
                uid &&
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#!">Settings</a></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#!" onClick={handleLogOut}>Logout</a></li>
                    </ul>
                </li>
            </ul>
            }
        </nav>
    </>
  )
}
