import React from 'react';
import { reservationStatus } from '../reservations/reservationStatus';

export const ReservationsDataCard = ({list, title, icon = 'book'}) => {

  const confirmed = list.filter(reservation => reservation.status === reservationStatus.reservationConfirmed);
  const pending = list.filter(reservation => reservation.status === reservationStatus.reservationPending); 
  const canceled = list.filter(reservation => reservation.status === reservationStatus.reservationCancelled);
  const completed = list.filter(reservation => reservation.status === reservationStatus.reservationCompleted);
  
  return (
    <div className="card info-card sales-card mt-2 panel-card">
    <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <hr className='gold'/>
        <div className="d-flex align-items-center">
        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className={`fas fa-${icon} fa-3x gold`}></i>
        </div>
        <div className="ps-3">
            <h6>Cantidad: {list.length}</h6>
            <ul>
              <li><span className="small pt-1 fw-bold">Confirmadas</span> <span className="small pt-2 ps-1">{confirmed.length}</span></li>
              <li><span className="small pt-1 fw-bold">Pendientes</span> <span className="small pt-2 ps-1">{pending.length}</span></li>
              <li><span className="small pt-1 fw-bold">Canceladas</span> <span className="small pt-2 ps-1">{canceled.length}</span></li>
              <li><span className="small pt-1 fw-bold">Completadas</span> <span className="small pt-2 ps-1">{completed.length}</span></li>
            </ul>
            
            

        </div>
        </div>
    </div>
    </div>
  )
}
