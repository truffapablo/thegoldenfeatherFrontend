import React, { useEffect } from 'react'
import { useState } from 'react'
import { convertDate } from '../../helpers/convertDate'
import { fnSortByConfirmation, fnSortByDate, fnSortByEvent, fnSortByGuestName, fnSortByRoomNumber, fnSortByStatus, fnSortByTime } from '../../helpers/sortReservations';

export const ReservationTableList = ({allReservations, setAllReservations, currentPage, limit, details, customDetails, transferDetails}) => {
  
  
  const [allRe, setAllRe] = useState(allReservations);
  const [filters, setFilters] = useState({
    confirmation:false,
    roomNumber:false,
    guest:false,
    time:false,
    status:false,
    event:false,
  });

  const sortByRoomNumber = () => {

    const sortedByRoomNumber = fnSortByRoomNumber(allReservations, false);
    setAllRe(sortedByRoomNumber);
    setFilters({
      confirmation:false,
      roomNumber:true,
      guest:false,
      time:false,
      status:false,
      event:false,
    });
  }

  const sortByConfirmation = () => {
    const sortedByConfirmation = fnSortByConfirmation(allReservations, false);
    setAllRe(sortedByConfirmation);
    setFilters({
      confirmation:true,
    });
  }

  const sortByGuestName = () =>{
    const sortedByGuestName = fnSortByGuestName(allReservations, true);
    setAllRe(sortedByGuestName);
    setFilters({
      guest:true,
    });
  }
  
  const sortByTime = () => {
    const sortedByTime = fnSortByTime(allReservations, false); 
    setAllRe(sortedByTime);
    setFilters({
      time:true,
    });
    
  }

  const sortByEvent = () => {
    const sortedByEvent = fnSortByEvent(allReservations, true);
    setAllRe(sortedByEvent);
    setFilters({
      event:true,
    });
  }

  const sortByStatus = () => {
    const sortedByStatus = fnSortByStatus(allReservations, false);
    setAllRe(sortedByStatus);
    setFilters({
      status:true,
    });
  }

  const sortByDate = () =>{
    const sortedByDate = fnSortByDate(allReservations, true);
    setAllRe(sortedByDate);
    setFilters({
      date:true
    });
  }

  

  useEffect(()=>{

    setAllRe(allReservations);
    filters.roomNumber && sortByRoomNumber();
    filters.confirmation && sortByConfirmation();
    filters.guest && sortByGuestName();
    filters.time && sortByTime();
    filters.event && sortByEvent();
    filters.status && sortByStatus();
    filters.date && sortByDate();

  },[allReservations])

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
