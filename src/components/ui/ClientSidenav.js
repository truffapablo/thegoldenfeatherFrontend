import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

export const ClientSidenav = () => {

    const {name, uid} = useSelector(state => state.auth);
    const navigate = useNavigate();

    const loginView = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate('/login');
    }

    const handleLinks = (e) => {
        navigate('/');
        e.target.value = e.target.getAttribute('href');
        
    }

  return (
    <>
    <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <a className="nav-link" href="#" onClick={handleLinks}>
                                <div className="sb-nav-link-icon"><i className="fa-solid fa-home"></i></div>
                                Home
                            </a> 
                            <a className="nav-link" href="#about" onClick={handleLinks}>
                                <div className="sb-nav-link-icon"><i className="fas fa-users"></i></div>
                                Acerca
                            </a>  
                            <a className="nav-link" href="#services" onClick={handleLinks}>
                                <div className="sb-nav-link-icon"><i className="fa-solid fa-briefcase"></i></div>
                                Servicios
                            </a> 
                            <a className="nav-link" href="#contact" onClick={handleLinks}>
                                <div className="sb-nav-link-icon"><i className="fa-solid fa-at"></i></div>
                                Contacto
                            </a> 
                            <a className="nav-link" href="#" onClick={loginView}>
                                <div className="sb-nav-link-icon"><i className="fas fa-user"></i></div>
                                Login
                            </a>  
                        </div>
                    </div>
                    {
                        !uid ? 
                        <div className="sb-sidenav-footer">
                        <div className="small">Sistema de reservas</div>
                        The Golden Feather
                        </div>
                        :
                        <div className="sb-sidenav-footer">
                        <div className="small">{name && `Autenticado: ${name} `}</div>
                        The Golden Feather
                        </div>
                    }
                </nav>
            </div>
    </>
  )
}
