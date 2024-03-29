import React, { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
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
    const {advanceSearch, listSearch} = useSelector(state => state.search);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loadingAction, setLoadingAction] = useState({
      any:false,
      confirm:false,
      complete:false,
      cancel:false
    });

    const [transfer, setTransfer] = useState(false)
    useEffect(()=>{
      
      if(advanceSearch.data || listSearch.length > 0){
        setTransfer(transferList.find(reservation => reservation.id === id) || advanceSearch.data.find(reservation => reservation.id === id) || listSearch.find(reservation => reservation.id === id));
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
              complete:true
            })
            dispatch(completeTransferReservation(id)).then(data => {
              setLoadingAction({
                ...loadingAction,
                any:false,
                complete:false
              })

              if (data.ok) {
                Swal.fire({
                  title: 'Reserva completada',
                  text: 'El transfer ha sido completado',
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
                })
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
          confirmButtonText: 'Sí, cancelar',
          cancelButtonText: 'Abortar acción',
        }).then((result) => {
          
          
          if (result.value) {
            setLoadingAction({
              ...loadingAction,
              any:true,
              cancel:true
            })
            dispatch(cancelTransferReservation(id)).then(data => {

              setLoadingAction({
                ...loadingAction,
                any:false,
                cancel:false
              })

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
        title: '¿Querés confirmar esta reserva?',
        text: "Confirmar una reserva sirve para garantizar la misma.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#263032',
        cancelButtonColor: '#C59B5F',
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {

        
        if (result.value) {
          setLoadingAction({
            ...loadingAction,
            any:true,
            confirm:true
          })
          dispatch(confirmTransferReservation(id)).then(data => {

            setLoadingAction({
              ...loadingAction,
              any:false,
              confirm:false
            })

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
                          transfer.email? 
                          <li>Email del huésped: {transfer.email} 
                          {
                              transfer.status !== reservationStatus.reservationPending &&
                              <EmailNotificationButton 
                              email={transfer.email} 
                              reservation={transfer} 
                              />
                          }
                          </li>
                          :<li>Email del huésped: sin registro</li>
                          
                        }
                        <li>Teléfono del huesped: {transfer.phone}</li>
                        <li>Número de personas: {transfer.peopleQuantity}</li>
                        {
                          transfer.information &&
                          <>
                          <hr/>
                          <li>Información: {transfer.information}</li>
                          </>
                        }
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
                  transfer.status !== reservationStatus.reservationConfirmed &&
                  transfer.status !== reservationStatus.reservationCompleted &&
                  transfer.status !== reservationStatus.reservationCancelled &&
                  <button disabled={loadingAction.any} className="btn btn-reserve btn-block" onClick={edit}>Editar</button>
                  
                }
                {
                  transfer.status == reservationStatus.reservationConfirmed &&
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
                  transfer.status !== reservationStatus.reservationCompleted &&
                  transfer.status !== reservationStatus.reservationCancelled &&
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
};