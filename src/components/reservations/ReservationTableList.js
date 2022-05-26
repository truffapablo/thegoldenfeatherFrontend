import React from 'react'
import { useNavigate } from 'react-router-dom';

import { convertDate } from '../../helpers/convertDate';

export const ReservationTableList = ({list, customList}) => {

    const navigate = useNavigate();

    const details = (id) => {
        navigate(`/dashboard/reservations/${id}`);
    }   
    const customDetails = (id) => {
        navigate(`/dashboard/reservations/${id}/custom`);
    }
  return (
    <div className='mt-5 table-responsive'>
        <h2>Reservas</h2>
        <table className="table table-striped animate__animated animate__fadeIn">
        <thead>
            <tr>
            <th scope="col"># Confirmación</th>
            <th scope="col">Huesped</th>
            <th scope="col">Habitación</th>
            <th scope="col">Evento</th>
            <th scope="col">Fecha</th>
            <th scope="col">Horario</th>
            <th scope="col">Estado</th>
            </tr>
        </thead>
        <tbody> 
         {
            list.map((reservation, index) => {
                return (
                    <tr key={index}>
                        <th scope="row"><a className='cpointer' onClick={()=>{details(reservation.id)}}>{reservation.confirmation}</a></th>
                        <td>{reservation.firstName} {reservation.lastName}</td>
                        <td>#{reservation.roomNumber}</td>
                        <td>{reservation.event.title}</td>
                        <td>{convertDate(reservation.date)}</td>
                        <td>{reservation.event.start}hs</td>
                        <td>{reservation.status}</td>
                    </tr>
                )
            })
         }
         {
            customList.map((reservation, index) => {
                return (
                    <tr key={index}>
                        <th scope="row"><a className='cpointer' onClick={()=>{customDetails(reservation.id)}}>{reservation.confirmation}</a></th>
                        <td>{reservation.firstName} {reservation.lastName}</td>
                        <td>#{reservation.roomNumber}</td>
                        <td>{reservation.event}</td>
                        <td>{convertDate(reservation.date)}</td>
                        <td>{reservation.time}hs</td>
                        <td>{reservation.status}</td>   
                    </tr>
                )
            })
         }
         
            
         
        </tbody>
        </table>
    </div>
  )
}
