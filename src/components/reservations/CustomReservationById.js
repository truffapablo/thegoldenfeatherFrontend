import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { cancelCustomReservation, completeCustomReservation, confirmCustomReservation } from '../../actions/customReservation';
import { getLogsByReservationId } from '../../actions/logs';
import { reservationStatus} from './reservationStatus';
import { convertDate } from '../../helpers/convertDate';


export const CustomReservationById = () => {

  const { customList } = useSelector(state => state.reservations);
  const {id} = useParams();
  
  const reservation = customList.find(reservation => reservation.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  
  const loadLogs = async (e) => {
      e.preventDefault();
      const data = await dispatch(getLogsByReservationId(id));

      if (data.length > 0) {
        
        Swal.fire({
          title: 'Logs',
          
          html: `
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Usuario</th>
                <th scope="col">Acción</th>
                <th scope="col">Fecha</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((log, index) => {
                return `
                <tr>
                  <td>${log.user.name}</td>
                  <td>${log.action}</td>
                  <td>${log.date}hs</td>
                </tr>
                `
              }).join('')}
            </tbody>
          </table>
          `,
          showCloseButton: true,
          confirmButtonColor: '#C59B5F',
          width: '70%',
        })
        
      }
      
    }

    const cancel = () => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#263032',
        cancelButtonColor: '#C59B5F',
        confirmButtonText: 'Sí, cancelar!',
        cancelButtonText: 'Abortar!',
      }).then((result) => {
        if (result.value) {

          dispatch(cancelCustomReservation({id})).then(data => {
            if (data) {
              Swal.fire({
                title: 'Reserva cancelada',
                text: 'La reserva ha sido cancelada',
                icon: 'success',
                confirmButtonColor: '#263032',
              })
              navigate('/dashboard/reservations');
             
            }
          })
          navigate('/dashboard/reservations');
        }
      })
    }
  
    const edit = () => {
      navigate(`/dashboard/reservations/${id}/custom-edit`);
    }

    const confirm = () => {
      Swal.fire({
        title: '¿Queres confirmar esta reserva?',
        text: "Confirmar una reserva sirve para garantizar la misma.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#263032',
        cancelButtonColor: '#C59B5F',
        confirmButtonText: 'Sí, confirmar!',
        cancelButtonText: 'Cancelar!',
      }).then((result) => {
        if (result.value) {
        
          dispatch(confirmCustomReservation({id})).then(data => {
            if (data) {
              Swal.fire({
                title: 'Reserva confirmada',
                text: 'La reserva ha sido confirmada',
                icon: 'success',
                confirmButtonColor: '#263032',
              })
              navigate('/dashboard/reservations');
            }
          });

        }
      })

    }
    
    const complete = () => {
      Swal.fire({
        title: '¿Queres completar la reserva?',
        text: "No podrás revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#263032',
        cancelButtonColor: '#C59B5F',
        confirmButtonText: 'Sí, completar!',
        cancelButtonText: 'Abortar!',
      }).then((result) => {
        if (result.value) {
          dispatch(completeCustomReservation({id})).then(data => {
            if (data) {
              Swal.fire({
                title: 'Reserva completada',
                text: 'La reserva ha sido completada',
                icon: 'success',
                confirmButtonColor: '#263032',
              })
              navigate('/dashboard/reservations');
            }
          });
        }
      })
    }
    

  return (
    
    <div className='container mt-5 animate__animated animate__fadeIn'>
       <h2>Reserva # {reservation.confirmation}</h2>
       <div className='row'>
          <div className='col-md-10'>
          <ul>
            <li>Evento: {reservation.event}</li>
            <li>Fecha: {convertDate(reservation.date)}</li>
            <li>Horario: {reservation.time}hs</li>
            {reservation.price ? <li>Precio: {reservation.price}</li> : <li>Precio: No se fijó un precio.</li>}

            <li>Comisión: {reservation.commission}</li>
            <hr/>
            <li>Huesped: {reservation.firstName} {reservation.lastName}</li>
            <li>Habitación: #{reservation.roomNumber}</li>
            <li>Cantidad de personas: {reservation.peopleQuantity}</li>
            <br/>
            {reservation.email ? <li>Email: {reservation.email}</li> : <li>Email: sin registro</li>}
            {reservation.phone ? <li>Teléfono: {reservation.phone}</li> : <li>Teléfono: sin registro</li>}
            <hr/>
            <li>Estado de la reserva: <strong>{reservation.status}</strong></li>
            <li>Reserva realizada por: {reservation.user.name}</li>
            <li className='mt-3'><a href='#' onClick={loadLogs}>Ver log de la reserva</a></li>
          </ul>
          </div>
          <div className='col-md-2'>
            <div className='d-grid gap-2'>
                {
                  reservation.status !== reservationStatus.reservationConfirmed &&
                  reservation.status !== reservationStatus.reservationCompleted &&
                  reservation.status !== reservationStatus.reservationCancelled &&
                  <button className="btn btn-reserve btn-block" onClick={confirm}>Confirmar</button>
                }
                {
                  reservation.status !== reservationStatus.reservationConfirmed &&
                  reservation.status !== reservationStatus.reservationCompleted &&
                  reservation.status !== reservationStatus.reservationCancelled &&
                  <button className="btn btn-reserve btn-block" onClick={edit}>Editar</button>
                  
                }
                {
                  reservation.status == reservationStatus.reservationConfirmed &&
                  <button className="btn btn-reserve btn-block" onClick={complete}>Completar</button>
                }
                {
                  reservation.status !== reservationStatus.reservationCompleted &&
                  reservation.status !== reservationStatus.reservationCancelled &&
                  <button className="btn btn-reserve btn-block" onClick={cancel}>Cancelar</button>
                }
            </div>
          </div>
       </div>
    </div>
  )
}