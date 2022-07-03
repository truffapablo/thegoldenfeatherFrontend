import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { cancelTransferReservation, completeTransferReservation, confirmTransferReservation } from "../../actions/transferReservation";
import { convertDate } from "../../helpers/convertDate";
import { EmailNotificationButton } from "./EmailNotificationButton";
import { reservationStatus} from './reservationStatus';
export const TransferReservationById = () => {

    const {id} = useParams();
    const {transferList} = useSelector(state => state.reservations);
    const {advanceSearch} = useSelector(state => state.search);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //const transfer = transferList.find(transfer => transfer.id === id);
    //const transfer = transferList.find(transfer => transfer.id === id) || advanceSearch.data.find(transfer => transfer.id === id);
    const [transfer, setTransfer] = useState(false)
    useEffect(()=>{
    
      if(advanceSearch.data){
        setTransfer(transferList.find(reservation => reservation.id === id) || advanceSearch.data.find(reservation => reservation.id === id));
      }else{
        setTransfer(transferList.find(reservation => reservation.id === id));
      }
    },[]);


    if(!transfer){
      <Navigate to='/'/>
      return null
    }
    const complete = (e) => {
        
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
            dispatch(completeTransferReservation(id)).then(data => {
              if (data) {
                Swal.fire({
                  title: 'Reserva completada',
                  text: 'El transfer ha sido completado',
                  icon: 'success',
                  confirmButtonColor: '#263032',
                })
                navigate('/dashboard/reservations');
               
              }
            });
          }
        })
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
            dispatch(cancelTransferReservation(id)).then(data => {
              if (data) {
                Swal.fire({
                  title: 'Reserva cancelada',
                  text: 'El transfer ha sido cancelado',
                  icon: 'success',
                  confirmButtonColor: '#263032',
                })
                navigate('/dashboard/reservations');
               
              }
            });
          }
        })
      }
    const confirm = (e) => {
      Swal.fire({
        title: '¿Queres confirmar esta reserva?',
        text: "Confirmar una reserva sirve para garantizar la misma.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#263032',
        cancelButtonColor: '#C59B5F',
        confirmButtonText: 'Sí, confirmar!',
        cancelButtonText: 'Abortar!',
      }).then((result) => {
        if (result.value) {
          dispatch(confirmTransferReservation(id)).then(data => {
            if (data) {
              Swal.fire({
                title: 'Reserva confirmada',
                text: 'El transfer ha sido confirmado',
                icon: 'success',
                confirmButtonColor: '#263032',
              })
              navigate('/dashboard/reservations');
             
            }
          });
        }
      })
    }
    const edit = (e) => {
      navigate(`/dashboard/reservations/${id}/transfer-edit`);
    }



    return (
        <div className='container mt-5 animate__animated animate__fadeIn'>
            <h2>Transfer #{transfer.confirmation}</h2>
            <div className='row'>
                <div className='col-md-10'>
                <div className='reservationID'>
                    <ul>
                        <li>Fecha de la reserva: {convertDate(transfer.date)}</li>
                        <li>Horario de la reserva: {transfer.time}hs</li>
                        <li>Origen: {transfer.origin}</li>
                        <li>Destino: {transfer.destination}</li>
                        <hr/>
                        <li>Nombre del huésped: {transfer.firstName} {transfer.lastName}</li>
                        {
                          transfer.email? <li>Email del huésped: {transfer.email} <EmailNotificationButton email={transfer.email}/><button>Notificar por email</button></li> : <li>Email del huésped: sin registro</li>
                        }
                        <li>Teléfono del huesped: {transfer.phone}</li>
                        <li>Número de personas: {transfer.peopleQuantity}</li>
                        <hr/>
                        <li>Precio: ${transfer.price + transfer.commission}</li>
                        <li>Comisión: ${transfer.commission}</li>
                        <li>Estado: <strong>{transfer.status}</strong></li>
                    </ul>
                </div>
                </div>
                {
            transfer.status !== reservationStatus.reservationCancelled &&
            <div className='col-md-2'>
              <div className='d-grid gap-2'>
                {
                  transfer.status !== reservationStatus.reservationConfirmed &&
                  transfer.status !== reservationStatus.reservationCompleted &&
                  transfer.status !== reservationStatus.reservationCancelled &&
                  <button className="btn btn-reserve btn-block" onClick={confirm}>Confirmar</button>
                }
                {
                  transfer.status !== reservationStatus.reservationConfirmed &&
                  transfer.status !== reservationStatus.reservationCompleted &&
                  transfer.status !== reservationStatus.reservationCancelled &&
                  <button className="btn btn-reserve btn-block" onClick={edit}>Editar</button>
                  
                }
                {
                  transfer.status == reservationStatus.reservationConfirmed &&
                  <button className="btn btn-reserve btn-block" onClick={complete}>Completar</button>
                }
                {
                  transfer.status !== reservationStatus.reservationCompleted &&
                  transfer.status !== reservationStatus.reservationCancelled &&
                  <button className="btn btn-reserve btn-block" onClick={cancel}>Cancelar</button>
                }
                
              </div>
            </div>
          }
            </div>

        </div>
    )
};