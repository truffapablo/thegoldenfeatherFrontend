import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getLogsByReservationId } from '../../actions/logs';
import { cancelReservation } from '../../actions/reservation';
import { convertDate } from '../../helpers/convertDate';


export const ReservationById = () => {

  const { list, customList } = useSelector(state => state.reservations);
  const {id} = useParams();
  const [reservationType, setReservationType] = useState('');
  
  const reservation = list.find(reservation => reservation.id === id);
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
          dispatch(cancelReservation({id}));
          navigate('/dashboard/reservations');
        }
      })
    }
  
    const edit = () => {
      navigate(`/dashboard/reservations/${id}/edit`);
    }
    

  return (
    
    <div className='container mt-5 animate__animated animate__fadeIn'>
       <h2>Reserva # {reservation.confirmation}</h2>
       <div className='row'>
          <div className='col-md-10'>
          <ul>
            <li>Evento: {reservation.event.title}</li>
            <li>Fecha: {convertDate(reservation.date)}</li>
            <li>Horario: {reservation.time}hs</li>
            <li>Precio: {reservation.event.price} {reservation.event.currency}</li>
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
              <button className="btn btn-reserve btn-block" onClick={edit}>Editar</button>
              <button className="btn btn-reserve btn-block" onClick={cancel}>Cancelar</button>
            </div>
          </div>
       </div>
    </div>
  )
}
