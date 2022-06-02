import React from 'react'
import { useNavigate } from 'react-router-dom'
import { convertDate } from '../../helpers/convertDate';

export const SearchCard = ({reservation}) => {
  const navigate = useNavigate();

  const details = ({pattern, id}) => {
    if (pattern === 'EVENT_RESERVATION') {
      navigate(`/dashboard/reservations/${id}`);
    } else if (pattern === 'CUSTOM_RESERVATION'){
      navigate(`/dashboard/reservations/${id}/custom`);
    } else if (pattern === 'TRANSFER_RESERVATION'){
      navigate(`/dashboard/reservations/${id}/transfer`);
    }
  }

  const h3 = () => {
   if(reservation.event){
     if(reservation.event.title){
       return reservation.event.title
     } else {
       return reservation.event
     }
   }
   return 'Reserva de Transfer'
  }

  const schedule = () => {
    if(reservation.event){
      if(reservation.event.start){
        return reservation.event.start + 'hs'
      }
    }
    
    if(reservation.time){
      return reservation.time + 'hs'
    }
  }

  return (
    <> 
      <li key={reservation.id} onClick={()=>{
        details(reservation)
      }}>
        <div className='gf-search-card animate__animated animate__fadeIn'>
            <div className='gf-search-card-header'>
            <h3>{h3()}</h3>
            <p>Confirmación: #{reservation.confirmation}</p>
            </div>
            <div className='gf-search-card-body'>
            <h4>{reservation.firstName} {reservation.lastName}</h4>
            <p>Fecha: {convertDate(reservation.date)}</p>
            <p>Horario: {schedule()}</p>
            <p>Estado: {reservation.status}</p>
            </div>
        </div>
    </li>
    </>
  )
}
