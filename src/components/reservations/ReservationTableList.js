import React from 'react'
import { convertDate } from '../../helpers/convertDate'
import { today } from '../../helpers/today'

export const ReservationTableList = ({allReservations, currentPage, limit, details, customDetails, transferDetails}) => {
  return (
    <>
    <table className="table table-striped animate__animated animate__fadeIn" >
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
                allReservations.slice((currentPage -1) * limit, currentPage * limit).map((reservation, index) => {
                  return (
                  <tr key={index}>
                        {
                          reservation.pattern === 'EVENT_RESERVATION' &&
                          <th scope="row"><a className='cpointer' onClick={()=>{details(reservation.id)}}>{reservation.confirmation}</a></th>
                        }
                        {
                          reservation.pattern === 'CUSTOM_RESERVATION' &&
                          <th scope="row"><a className='cpointer' onClick={()=>{customDetails(reservation.id)}}>{reservation.confirmation}</a></th>
                        }
                        {
                          reservation.pattern === 'TRANSFER_RESERVATION' &&
                          <th scope="row"><a className='cpointer' onClick={()=>{transferDetails(reservation.id)}}>{reservation.confirmation}</a></th>
                        }
                        <td>{reservation.firstName} {reservation.lastName}</td>
                        <td>#{reservation.roomNumber}</td>
                        {
                          reservation.event ?
                          reservation.event.title ?
                          <td>{reservation.event.title}</td>
                          :
                          <td>{reservation.event}</td>
                          :
                          <td>Transfer</td>
                        }
                        <td>{convertDate(reservation.date)}</td>
                        {
                          reservation.event ?
                          reservation.event.start ?
                          <td>{reservation.event.start}</td>
                          :
                          <td>{reservation.time}</td>
                          :
                          <td>{reservation.time}</td>
                        }
                        <td>{reservation.status}</td>

                    </tr>
                  )
                })
              }
            </tbody>
            </table>
    </>
  )
}
