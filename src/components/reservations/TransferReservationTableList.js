import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { convertDate } from '../../helpers/convertDate';

export const TransferReservationTableList = () => {

    const navigate = useNavigate();

    const {transferList} = useSelector(state => state.reservations);

    const details = (id) => {
        navigate(`/dashboard/reservations/${id}/transfer`);
    }   

  

  return (
    <div className='mt-5 table-responsive'>
        <h2>Transfers</h2>
        <table className="table table-striped animate__animated animate__fadeIn">
        <thead>
            <tr>
            <th scope="col"># Confirmación</th>
            <th scope="col">Huesped</th>
            <th scope="col">Origen</th>
            <th scope="col">Destino</th>
            <th scope="col">Fecha</th>
            <th scope="col">Horario</th>
            <th scope="col">Estado</th>
            </tr>
        </thead>
        <tbody> 
         {
            transferList.map((reservation, index) => {
                return (
                    <tr key={index}>
                        <th scope="row"><a className='cpointer' onClick={()=>{details(reservation.id)}}>{reservation.confirmation}</a></th>
                        <td>{reservation.firstName} {reservation.lastName}</td>
                        <td>{reservation.origin}</td>
                        <td>{reservation.destination}</td>
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
