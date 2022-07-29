import React from 'react'

export const ReservationsRevenue = ({revenue ,title, total=false}) => {
  return (
    <div className='mt-3 mb-3'>
        <h5>{title} {total && '$' + (revenue.event + revenue.custom + revenue.transfer)}</h5>
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Evento
                <span className="badge bg-primary rounded-pill">{revenue.event}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Personalizadas
                <span className="badge bg-primary rounded-pill">{revenue.custom}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Transfer
                <span className="badge bg-primary rounded-pill">{revenue.transfer}</span>
            </li>
        </ul>      
    </div>
  )
}
