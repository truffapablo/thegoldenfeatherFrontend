import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getLogsByReservationId } from '../../actions/logs';
import { cancelReservation, completeReservation, confirmReservation } from '../../actions/reservation';
import { convertDate } from '../../helpers/convertDate';
import { EmailNotificationButton } from './EmailNotificationButton';
import { reservationStatus} from './reservationStatus';



export const ReservationById = () => {

  const { list } = useSelector(state => state.reservations);
  const {advanceSearch} = useSelector(state => state.search);
  const {id} = useParams();

  //const reservation = list.find(reservation => reservation.id === id) || advanceSearch.data.find(reservation => reservation.id === id);
  
  const [reservation, setReservation] = useState(false);

  const [loadingAction, setLoadingAction] = useState({
    any:false,
    confirm:false,
    complete:false,
    cancel:false
  });

  
  useEffect(()=>{
    
    if(advanceSearch.data){
      //const algo = list.find(reservation => reservation.id === id) || advanceSearch.data.find(reservation => reservation.id === id);
      
      setReservation(list.find(reservation => reservation.id === id) || advanceSearch.data.find(reservation => reservation.id === id));
    }else{
      setReservation(list.find(reservation => reservation.id === id));
    }
  },[]);

    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  if(!reservation){
    <Navigate to='/'/>
    return null
  }

  



  
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
                  <td>${log.user && log.user.name || 'El usuario ya no existe.'}</td>
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
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'Abortar acción',
      }).then((result) => {
        if (result.value) {
          
          setLoadingAction({
            ...loadingAction,
            any:true,
            cancel:true,
          })
          
          dispatch(cancelReservation({id})).then(data => {

            if (data) {
              Swal.fire({
                title: 'Reserva cancelada',
                text: 'La reserva ha sido cancelada',
                icon: 'success',
                confirmButtonColor: '#263032',
              })
              setLoadingAction({
                ...loadingAction,
                any:false,
                cancel:false,
              })
              navigate('/dashboard/reservations');
             
            }
          });
        }
      })
    }
  
    const edit = () => {
      navigate(`/dashboard/reservations/${id}/edit`);
    }

    const confirm = () => {
      Swal.fire({
        title: '¿Querés confirmar esta reserva?',
        html: "<p>Confirmar una reserva sirve para garantizar la misma. <br/><strong>No se podrá modificar una vez confirmada.</strong></p>",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#263032',
        cancelButtonColor: '#C59B5F',
        confirmButtonText: 'Sí, confirmar!',
        cancelButtonText: 'Cancelar',

      }).then((result) => {
        if (result.value) {
          
          setLoadingAction({
            ...loadingAction,
            any:true,
            confirm:true,
          })
          dispatch(confirmReservation({id})).then(data => {
            
            if (data) {
              Swal.fire({
                title: 'Reserva confirmada',
                text: 'La reserva ha sido confirmada',
                icon: 'success',
                confirmButtonColor: '#263032',
              })
              setLoadingAction({
                ...loadingAction,
                any:false,
                confirm:false,
              })
              navigate('/dashboard/reservations');
            }
          });

        }
      })

    }
    
    const complete = () => {
      Swal.fire({
        title: '¿Querés completar la reserva?',
        text: "No podrás revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#263032',
        cancelButtonColor: '#C59B5F',
        confirmButtonText: 'Sí, completar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          setLoadingAction({
            ...loadingAction,
            any:true,
            complete:true,
          })
          dispatch(completeReservation({id})).then(data => {
            
            setLoadingAction({
              ...loadingAction,
              any:false,
              complete:false,
            })
            if (data.ok) {
              Swal.fire({
                title: 'Reserva completada',
                text: 'La reserva ha sido completada',
                icon: 'success',
                confirmButtonColor: '#263032',
              })
              navigate('/dashboard/reservations');
            }else{
              Swal.fire({
                title: 'Error',
                text: data.message,
                icon: 'error',
                confirmButtonColor: '#263032',
              });
            }
          });
        }
      })
    }


  return (
    
    <div className='container mt-5 animate__animated animate__fadeIn'>
       <h2>Reserva #{reservation.confirmation}</h2>
       <div className='row'>
          <div className='col-md-10'>
            <div className='reservationID'>
              <ul>
                <li>Evento: {reservation.event.title}</li>
                <li>Fecha: {convertDate(reservation.date)}</li>
                <li>Horario: {reservation.event.start}hs</li>
                <li>Precio por persona: {reservation.event.price + reservation.event.commission} {reservation.event.currency}</li>
                <li>Precio total: {(reservation.event.price + reservation.event.commission) * reservation.peopleQuantity} {reservation.event.currency}</li>
                <li>Comisión: {reservation.event.commission * reservation.peopleQuantity} </li>
                <hr/>
                <li>Huésped: {reservation.firstName} {reservation.lastName}</li>
                <li>Habitación: #{reservation.roomNumber}</li>
                <li>Cantidad de personas: {reservation.peopleQuantity}</li>
                <br/>
                {
                reservation.email ? 
                    <li>Email: {reservation.email} 
                    {
                      reservation.status !== reservationStatus.reservationPending &&
                      <EmailNotificationButton 
                      email={reservation.email} 
                      reservation={reservation} 
                      />
                    }
                    
                    </li> 
                    : 
                    <li>Email: sin registro</li>
                }
                {reservation.phone ? <li>Teléfono: {reservation.phone}</li> : <li>Teléfono: sin registro</li>}
                <hr/>
                <li>Estado de la reserva: <strong>{reservation.status}</strong></li>
                {/* {
                  reservation.user &&
                  <li>Reserva realizada por: {reservation.user.name}</li>
                } */}
                <li className='mt-3'><a href='#' onClick={loadLogs}>Ver log de la reserva</a></li>
              </ul>
            </div>
          </div>
          {
            reservation.status !== reservationStatus.reservationCancelled &&
            <div className='col-md-2'>
              <div className='d-grid gap-2'>
                {
                  reservation.status !== reservationStatus.reservationConfirmed &&
                  reservation.status !== reservationStatus.reservationCompleted &&
                  reservation.status !== reservationStatus.reservationCancelled &&
                  
                  <button disabled={loadingAction.any} className="btn btn-reserve btn-block" onClick={confirm}>
                    
                    {
                      loadingAction.confirm ?
                      <>
                      <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      />{' '} Confirmando
                      </>
                       
                      :
                      'Confirmar'
                    }

                    </button>
                    
                }
                {
                  reservation.status !== reservationStatus.reservationConfirmed &&
                  reservation.status !== reservationStatus.reservationCompleted &&
                  reservation.status !== reservationStatus.reservationCancelled &&
                  <button disabled={loadingAction.any} className="btn btn-reserve btn-block" onClick={edit}>Editar</button>
                  
                }
                {
                  reservation.status == reservationStatus.reservationConfirmed &&
                  <button disabled={loadingAction.any} className="btn btn-reserve btn-block" onClick={complete}>
                    {
                      loadingAction.complete ?
                      <>
                      <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      />{' '} Completando
                      </>
                       
                      :
                      'Completar'
                    }
                  </button>
                }
                {
                  reservation.status !== reservationStatus.reservationCompleted &&
                  reservation.status !== reservationStatus.reservationCancelled &&
                  <button disabled={loadingAction.any} className="btn btn-reserve btn-block" onClick={cancel}>
                    {
                      loadingAction.cancel ?
                      <>
                      <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      />{' '} Cancelando
                      </>
                       
                      :
                      'Cancelar'
                    }
                  </button>
                }
                
              </div>
            </div>
          }
       </div>
    </div>
  )
}
