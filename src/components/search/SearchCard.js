import React from 'react'
import { useNavigate } from 'react-router-dom'
import { convertDate } from '../../helpers/convertDate';

export const SearchCard = ({reservation}) => {
  const navigate = useNavigate();

  const details = ({pattern, id}) => {
    if (pattern === 'EVENT_RESERVATION') {
      navigate(`/dashboard/reservations/${id}`);
    } else {
      navigate(`/dashboard/reservations/${id}/custom`);
    }
  }

  return (
    <> 
      <li key={reservation.id} onClick={()=>{
        details(reservation)
      }}>
        <div className='gf-search-card animate__animated animate__fadeIn'>
            <div className='gf-search-card-header'>
            <h3>{reservation.event.title || reservation.event}</h3>
            <p>Confirmación: #{reservation.confirmation}</p>
            </div>
            <div className='gf-search-card-body'>
            <h4>{reservation.firstName} {reservation.lastName}</h4>
            <p>Fecha: {convertDate(reservation.date)}</p>
            <p>Horario: {reservation.event.start || reservation.time}hs</p>
            <p>Estado: {reservation.status}</p>
            </div>
        </div>
    </li>
    </>
  )
}
