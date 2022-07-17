import React, { useEffect } from 'react'
import { useState } from 'react'
import { convertDate } from '../../helpers/convertDate'
import { fnSortByConfirmation, fnSortByDate, fnSortByEvent, fnSortByGuestName, fnSortByRoomNumber, fnSortByStatus, fnSortByTime } from '../../helpers/sortReservations';
import { reservationStatus } from './reservationStatus';

export const ReservationTableList = ({allReservations, setAllReservations, currentPage, limit, details, customDetails, transferDetails}) => {
  
  
  const [allRe, setAllRe] = useState(allReservations);
  const [filters, setFilters] = useState({
    confirmation  :false,
    roomNumber    :true,
    guest         :false,
    time          :false,
    status        :false,
    event         :false,
    date          :false,
  });

  const sortByRoomNumber = () => {

    const sortedByRoomNumber = fnSortByRoomNumber(allReservations, filters.roomNumber);
    setAllRe(sortedByRoomNumber);
    setFilters({
      roomNumber:!filters.roomNumber,
    });
  }

  const sortByConfirmation = () => {
    const sortedByConfirmation = fnSortByConfirmation(allReservations, filters.confirmation);
    setAllRe(sortedByConfirmation);
    setFilters({
      confirmation:!filters.confirmation,
    });
  }

  const sortByGuestName = () =>{
    const sortedByGuestName = fnSortByGuestName(allReservations, filters.guest);
    setAllRe(sortedByGuestName);
    setFilters({
      guest:!filters.guest,
    });
  }
  
  const sortByTime = () => {
    const sortedByTime = fnSortByTime(allReservations, filters.time); 
    setAllRe(sortedByTime);
    setFilters({
      time:!filters.time,
    });
    
  }

  const sortByEvent = () => {
    const sortedByEvent = fnSortByEvent(allReservations, filters.event);
    setAllRe(sortedByEvent);
    setFilters({
      event:!filters.event,
    });
  }

  const sortByStatus = () => {
    const sortedByStatus = fnSortByStatus(allReservations, filters.status);
    setAllRe(sortedByStatus);
    setFilters({
      status:!filters.status,
    });
  }

  const sortByDate = () =>{
    const sortedByDate = fnSortByDate(allReservations, filters.date);
    setAllRe(sortedByDate);
    setFilters({
      date:!filters.date
    });
  }

  

  const uiStatus = (status) => {
    switch (status) {
      case reservationStatus.reservationConfirmed: return <span className="badge bg-primary">{reservationStatus.reservationConfirmed}</span>
      case reservationStatus.reservationCompleted: return <span className="badge bg-success">{reservationStatus.reservationCompleted}</span>
      case reservationStatus.reservationCancelled: return <span className="badge bg-danger">{reservationStatus.reservationCancelled}</span>
      case reservationStatus.reservationPending:   return <span className="badge bg-warning text-dark">{reservationStatus.reservationPending}</span>
      default:
        break;
    }
  }
  

  useEffect(()=>{
    
    setAllRe(allReservations);
    filters.roomNumber    && sortByRoomNumber();
    filters.confirmation  && sortByConfirmation();
    filters.guest         && sortByGuestName();
    filters.time          && sortByTime();
    filters.event         && sortByEvent();
    filters.status        && sortByStatus();
    filters.date          && sortByDate();

  },[])

  return (
    <>
    <table className="table animate__animated animate__fadeIn" >
            <thead>
            <tr>
            <th scope="col"><a className='gf-re-list' href='#' onClick={sortByConfirmation}># Confirmación</a></th>
            <th scope="col"><a className='gf-re-list' href='#' onClick={sortByGuestName}>Huésped</a></th>
            <th scope="col"><a className='gf-re-list' href='#' onClick={sortByRoomNumber}>Habitación</a></th>
            <th scope="col"><a className='gf-re-list' href='#' onClick={sortByEvent}>Evento</a></th>
            <th scope="col"><a className='gf-re-list' href='#' onClick={sortByDate}>Fecha</a></th>
            <th scope="col"><a className='gf-re-list' href='#' onClick={sortByTime}>Horario</a></th>
            <th scope="col"><a className='gf-re-list' href='#' onClick={sortByStatus}>Estado</a></th>
            </tr>
            </thead>
            <tbody>
              {
                allRe.slice((currentPage -1) * limit, currentPage * limit).map((reservation, index) => {
                  return (
                  <tr key={index}>
                        {
                          reservation.pattern === 'EVENT_RESERVATION' &&
                          <th scope="row"><a className='cpointer gold' onClick={()=>{details(reservation.id)}}>{reservation.confirmation}</a></th>
                        }
                        {
                          reservation.pattern === 'CUSTOM_RESERVATION' &&
                          <th scope="row"><a className='cpointer gold' onClick={()=>{customDetails(reservation.id)}}>{reservation.confirmation}</a></th>
                        }
                        {
                          reservation.pattern === 'TRANSFER_RESERVATION' &&
                          <th scope="row"><a className='cpointer gold' onClick={()=>{transferDetails(reservation.id)}}>{reservation.confirmation}</a></th>
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
                        <td>{uiStatus(reservation.status)}</td>

                    </tr>
                  )
                })
              }
            </tbody>
            </table>
    </>
  )
}
