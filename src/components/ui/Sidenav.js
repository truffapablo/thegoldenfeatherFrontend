import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const Sidenav = () => {

  const {name, uid} = useSelector(state => state.auth);
  return (
    <>
    <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <a className="nav-link" href="#">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </a>
                            <div className="sb-sidenav-menu-heading">Interface</div>
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#reservationCollapse" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                Reservas
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="reservationCollapse" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <NavLink className="nav-link" to="dashboard/reservations/list">Lista</NavLink>
                                    <NavLink className="nav-link" to="dashboard/reservations/new">Reservar Evento</NavLink>
                                    <NavLink className="nav-link" to="dashboard/reservations/custom">Reserva Personalizada</NavLink>
                                </nav>
                            </div>
                           
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Autenticado: {name}</div>
                        The Golden Feather
                    </div>
                </nav>
            </div>
    </>
  )
}
