import React from 'react'

export const ReservationByStatus = ({status}) => {
  return (
    <div className='mt-3 mb-3'>
        <h5>Estado de las reservas</h5>
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Pendientes de Confirmación
                <span className="badge bg-primary rounded-pill">{status.pending}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Confirmadas
                <span className="badge bg-primary rounded-pill">{status.confirmed}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Completadas
                <span className="badge bg-primary rounded-pill">{status.completed}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Canceladas
                <span className="badge bg-primary rounded-pill">{status.cancelled}</span>
            </li>
        </ul>      
    </div>
  )
}
