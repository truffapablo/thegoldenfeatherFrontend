import React from 'react'

export const ReservationByType = ({quantity}) => {
  return (
    <div className='mt-3 mb-3'>
        <h5>Cantidad de reservas</h5>
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Evento
                <span className="badge bg-primary rounded-pill">{quantity.event}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Personalizadas
                <span className="badge bg-primary rounded-pill">{quantity.custom}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Transfer
                <span className="badge bg-primary rounded-pill">{quantity.transfer}</span>
            </li>
        </ul>      
    </div>
  )
}
